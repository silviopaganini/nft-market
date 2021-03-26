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

    string baseURI = "http://localhost:8080/api/item/{id}";

    mapping (uint256 => TokenMeta) private _tokenMeta;

    struct TokenMeta {
        uint256 id;
        uint256 price;
        string name;
        string uri;
        bool sale;
    }

    constructor() ERC721("LVR", "LVR") {}

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _newBaseURI) public virtual onlyOwner {
        baseURI = _newBaseURI;
    }

    function getAllOnSale () public view virtual returns( TokenMeta[] memory ) {
        TokenMeta[] memory tokensOnSale = new TokenMeta[](_tokenIds.current());
        uint256 counter = 0;

        for(uint i = 1; i < _tokenIds.current() + 1; i++) {
            if(_tokenMeta[i].sale == true) {
                tokensOnSale[counter] = _tokenMeta[i];
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

        _tokenMeta[_tokenId].sale = _sale;
        setTokenPrice(_tokenId, _price);
    }

    /**
     * @dev sets maps token to its price
     * @param _tokenId uint256 token ID (token number)
     * @param _price uint256 token price
     * 
     * Requirements: 
     * `tokenId` must exist
     */
    function setTokenPrice(uint256 _tokenId, uint256 _price) public {
        require(_exists(_tokenId), "ERC721Metadata: Price set of nonexistent token");
        _tokenMeta[_tokenId].price = _price;
    }

    function tokenPrice(uint256 tokenId) public view virtual returns (uint256) {
        require(_exists(tokenId), "ERC721Metadata: Price query for nonexistent token");
        return _tokenMeta[tokenId].price;
    }

    function _setTokenMeta(uint256 _tokenId, TokenMeta memory _meta) private {
        require(_exists(_tokenId));
        _tokenMeta[_tokenId] = _meta;
    }

    function tokenMeta(uint256 _tokenId) public view returns (TokenMeta memory) {
        require(_exists(_tokenId));
        return _tokenMeta[_tokenId];
    }

    /**
     * @dev purchase _tokenId
     * @param _tokenId uint256 token ID (token number)
     */
    function purchaseToken(uint256 _tokenId) public payable {
        require(msg.sender != address(0) && msg.sender != ownerOf(_tokenId));
        require(msg.value >= _tokenMeta[_tokenId].price);
        address tokenSeller = ownerOf(_tokenId);

        payable(tokenSeller).transfer(msg.value);

        setApprovalForAll(tokenSeller, true);
        _transfer(tokenSeller, msg.sender, _tokenId);
        _tokenMeta[_tokenId].sale = false;

        emit Bought(msg.sender, tokenSeller, _tokenId);
        emit Sold(tokenSeller, msg.sender, _tokenId);
    }

    function mintCollectable(
        address _owner, 
        string memory _tokenURI, 
        string memory _name, 
        uint256 _price, 
        bool _sale
    )
        public
        returns (uint256)
    {
        require(_price > 0);

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(_owner, newItemId);

        TokenMeta memory meta = TokenMeta(newItemId, _price, _name, _tokenURI, _sale);
        _setTokenMeta(newItemId, meta);

        return newItemId;
    }
}