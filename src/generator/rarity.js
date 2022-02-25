const Moralis = require('moralis/node');
require('dotenv').config({ path: '/Users/kevinle/Projects/nft-explorer/.env'});

const serverUrl = process.env.SERVER_URL;
const appId = process.env.APP_ID;
Moralis.start({ serverUrl, appId });

const collectionAddress = "0x1A92f7381B9F03921564a437210bB9396471050C"
const collectionName = "Cool Cats"

async function generateRarity(){
  // returns an object with keys: total, page, page_size, cursor, result; the NFTs are stored in the "result"
  // we are concerned with the "metadata" object in the results, which contains the "attributes"
  const NFTs = await Moralis.Web3API.token.getAllTokenIds({ address: collectionAddress })

  const totalNum = NFTs.total;         // total amount of NFTs in the collection
  const pageSize = NFTs.page_size;     // amount of NFTs pulled from the Moralis .getAllTokenIds
  let allNFTs = NFTs.result;           // all tokens(NFTs) listed in an object

  // const timer = ms => new Promise(res => setTimeout(res, ms))
  // for (let i = pageSize; i < totalNum; i += pageSize) {
  //   const NFTs = const NFTs = await Moralis.Web3API.token.getAllTokenIds({ address: collectionAddress, offset: i });
  //   allNFTs = allNFTs.concat(NFTs.result);
  //   await timer(6000);
  // }

  // each NFT(or token) pulled from the API contains a "metadata" object, which contains the "attributes"(aka NFT traits)
  // lists each NFT's attributes(object with keys 'trait_type' and 'value') from the metadata
  let attributes = allNFTs.map((nft) => JSON.parse(nft.metadata).attributes);

  let tally = {"TraitCount":{}};

  for (let j = 0; j < attributes.length; j++) {
    nftTraits = attributes[j].map((nft) => nft.trait_type);
    nftValues = attributes[j].map((nft) => nft.value);

    let numOfTraits = nftTraits.length; // an NFT can have varying # traits

    if (tally.TraitCount[numOfTraits]) {
      tally.TraitCount[numOfTraits]++;
    } else {
      tally.TraitCount[numOfTraits] = 1;
    }

    // create new keys in the 'tally' object for trait_type 
    // count each time that trait occurs
    for (let i = 0; i < nftTraits.length; i++) {
      let current = nftTraits[i];
      if (tally[current]) {
        tally[current].count++;
      } else {
        tally[current] = {count: 1}
      }
    }
  }
  
  console.log(tally)
};

generateRarity();