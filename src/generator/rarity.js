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
  let metadata = allNFTs.map((nft) => JSON.parse(nft.metadata).attributes);

  let tally = {"TraitCount":{}};

  for (let i = 0; i < metadata.length; i++) {
    nftTraits = metadata[i].map((nft) => nft.trait_type);
    nftValues = metadata[i].map((nft) => nft.value);

    let numOfTraits = nftTraits.length; // an NFT can have varying # traits

    if (tally.TraitCount[numOfTraits]) {
      tally.TraitCount[numOfTraits]++;
    } else {
      tally.TraitCount[numOfTraits] = 1;
    }

    // iterate through the NFTs to count the traits and values
    for (let j = 0; j < nftTraits.length; j++) {
      // create new keys in the 'tally' object for trait_type 
      // count each time that trait occurs
      let currentTrait = nftTraits[j];
      if (tally[currentTrait]) {
        tally[currentTrait].occurences += 1;
      } else {
        tally[currentTrait] = { occurences: 1 };
      }

      // create new keys in the 'tally' object for value 
      // count each time that trait value occurs
      let currentValue = nftValues[j];
      if (tally[currentTrait][currentValue]) {
        tally[currentTrait][currentValue] += 1;
      } else {
        tally[currentTrait][currentValue] = 1;
      }
    }
  }
  // console.log(metadata[0][0].trait_type)
  console.log()
  

  // iterate through the metadata, and calculate a rarity score for each trait value
  // an NFT would have rarityScore X if it contains trait value Y
  for (let i = 0; i < metadata.length; i++) {
    let current = metadata[i];    // the metadata of nft i
    let totalRarity = 0;
    
    // iterating through the trait types (e.g. body, shirt, face ,tier, hat)
    for (let j = 0; j < current.length; j++) { 
  
      // key into the tally to find the number of times a specific trait occurs in the collection
      let numTraitOccurences = tally[current[j].trait_type][current[j].value]
      let rarityScore = 1 / (numTraitOccurences / totalNum);  // rarity score = 1 / trait rarity
      current[j].rarityScore = rarityScore;
    }

    // calculate the rarity score from having certain # of traits
    // pushes on to the metadata the rarity score for having X number of traits
    let rarityScoreNumTraits = 1 / (tally.TraitCount[Object.keys(current).length] / totalNum);
    current.push({
      trait_type: "TraitCount",
      value: Object.keys(current).length,
      rarityScore: rarityScoreNumTraits,
    });
  }
  console.log(metadata[0])
  
};

generateRarity();