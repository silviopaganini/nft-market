// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract LVR is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event Bought(address indexed owner,address indexed from, uint256 tokenid);
    event Sold(address indexed owner, address indexed to, uint256 tokenid);

    // event Sent(address indexed payee, uint256 amount, uint256 balance);
    // event Received(address indexed payer, uint tokenId, uint256 amount, uint256 balance);

    mapping (uint256 => uint256) private _tokenPrices;
    mapping (uint256 => bool) private _tokenOnSale;

    struct TokenProps {
        uint256 id;
        uint256 price;
        string uri;
    }

    constructor() ERC721("LVR", "LVR") {
        _tokenIds.increment();

        // Create unicorn token
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, "unicorn");
        _tokenOnSale[newItemId] = false;
    }

    function getAllOnSale () public view virtual returns( TokenProps[] memory ) {
        TokenProps[] memory tokensOnSale = new TokenProps[](_tokenIds.current());
        uint256 counter = 0;

        for(uint i = 1; i < _tokenIds.current() + 1; i++) {
            if(_tokenOnSale[i] == true) {
                TokenProps memory token = TokenProps(i, _tokenPrices[i], tokenURI(i));
                tokensOnSale[counter] = token;
                counter++;
            }
        }
        return tokensOnSale;
    }

    /**
     * @dev sets maps token to its price
     * @param _tokenId uint256 token ID (token number)
     * @param _sale bool token on sale
     * @param _price unit256 token price
     * 
     * Requirements: 
     * `tokenId` must exist
     */
    function setTokenSale(uint256 _tokenId, bool _sale, uint256 _price) public {
        require(_exists(_tokenId), "ERC721Metadata: Sale set of nonexistent token");
        require(_price > 0);

        _tokenOnSale[_tokenId] = _sale;
        setTokenPrice(_tokenId, _price);
    }

    /**
     * @dev sets maps token to its price
     * @param tokenId uint256 token ID (token number)
     * @param _price uint256 token price
     * 
     * Requirements: 
     * `tokenId` must exist
     */
    function setTokenPrice(uint256 tokenId, uint256 _price) public {
        require(_exists(tokenId), "ERC721Metadata: Price set of nonexistent token");
        _tokenPrices[tokenId] = _price;
    }

    function tokenPrice(uint256 tokenId) public view virtual returns (uint256) {
        require(_exists(tokenId), "ERC721Metadata: Price query for nonexistent token");
        return _tokenPrices[tokenId];
    }

    /**
     * @dev purchase _tokenId
     * @param _tokenId uint256 token ID (painting number)
     */
    function purchaseToken(uint256 _tokenId) public payable {
        require(msg.sender != address(0) && msg.sender != ownerOf(_tokenId));
        require(msg.value >= _tokenPrices[_tokenId]);
        address tokenSeller = ownerOf(_tokenId);

        payable(tokenSeller).transfer(msg.value);

        setApprovalForAll(tokenSeller, true);
        _transfer(tokenSeller, msg.sender, _tokenId);
        _tokenOnSale[_tokenId] = false;

        emit Bought(msg.sender, tokenSeller, _tokenId);
        emit Sold(tokenSeller, msg.sender, _tokenId);
    }

    function mintCollectable(address _owner, string memory _tokenURI, uint256 _price, bool _sale)
        public
        returns (uint256)
    {
        require(_price > 0);

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(_owner, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        setTokenPrice(newItemId, _price);
        _tokenOnSale[newItemId] = _sale;

        return newItemId;
    }
}