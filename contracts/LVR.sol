// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

import "../node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "../node_modules/@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "../node_modules/@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "../node_modules/@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract LVR is ERC721Upgradeable, OwnableUpgradeable, ReentrancyGuardUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIds;

    mapping (uint256 => TokenMeta) private _tokenMeta;

    string baseURI;

    struct TokenMeta {
        uint256 id;
        uint256 price;
        string name;
        string uri;
        bool sale;
    }

    function initialize() public initializer {
        OwnableUpgradeable.__Ownable_init();
        ReentrancyGuardUpgradeable.__ReentrancyGuard_init();
        ERC721Upgradeable.__ERC721_init("LVR", "LVR");
        setBaseURI("https://rh25q24tvf.execute-api.eu-west-2.amazonaws.com/dev/token?id=");
    }

    /**
     * @dev Base URI for computing {tokenURI}. Empty by default, can be overriden
     * in child contracts.
     */
    function _baseURI() internal view override virtual returns (string memory) {
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
     * `price` must be more than 0
     * `owner` must the msg.owner
     */
    function setTokenSale(uint256 _tokenId, bool _sale, uint256 _price) public {
        require(_exists(_tokenId), "ERC721Metadata: Sale set of nonexistent token");
        require(_price > 0);
        require(ownerOf(_tokenId) == _msgSender());

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
     * `owner` must the msg.owner
     */
    function setTokenPrice(uint256 _tokenId, uint256 _price) public {
        require(_exists(_tokenId), "ERC721Metadata: Price set of nonexistent token");
        require(ownerOf(_tokenId) == _msgSender());
        _tokenMeta[_tokenId].price = _price;
    }

    function tokenPrice(uint256 tokenId) public view virtual returns (uint256) {
        require(_exists(tokenId), "ERC721Metadata: Price query for nonexistent token");
        return _tokenMeta[tokenId].price;
    }

    /**
     * @dev sets token meta
     * @param _tokenId uint256 token ID (token number)
     * @param _meta TokenMeta 
     * 
     * Requirements: 
     * `tokenId` must exist
     * `owner` must the msg.owner
     */
    function _setTokenMeta(uint256 _tokenId, TokenMeta memory _meta) private {
        require(_exists(_tokenId));
        require(ownerOf(_tokenId) == _msgSender());
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
    function purchaseToken(uint256 _tokenId) public payable nonReentrant {
        require(msg.sender != address(0) && msg.sender != ownerOf(_tokenId));
        require(msg.value >= _tokenMeta[_tokenId].price);
        address tokenSeller = ownerOf(_tokenId);

        payable(tokenSeller).transfer(msg.value);

        setApprovalForAll(tokenSeller, true);
        _transfer(tokenSeller, msg.sender, _tokenId);
        _tokenMeta[_tokenId].sale = false;
    }

    function mintCollectable(
        address _owner, 
        string memory _tokenURI, 
        string memory _name, 
        uint256 _price, 
        bool _sale
    )
        public
        onlyOwner
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