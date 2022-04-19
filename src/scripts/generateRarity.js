const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const Moralis = require("moralis/node");
// import Moralis from 'moralis/node.js';
// import 'dotenv/config'

// const serverUrl = process.env.SERVER_URL;
// const appId = process.env.APPLICATION_ID;
// Moralis.start({ serverUrl, appId });

const serverUrl = "https://zp5obq00poae.usemoralis.com:2053/server";
const appId = "Vsfufr7b58Pbk14V5ZdAe412PCZp30ZktiHlPQdI";
Moralis.start({ serverUrl, appId });

// Done pulling data from these projects:
// const contractAddress = "0x1A92f7381B9F03921564a437210bB9396471050C"
// const collectionName = "CoolCats"
// const contractAddress = "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e"
// const collectionName = "Doodles"
// const contractAddress = "0x099689220846644F87D1137665CDED7BF3422747"
// const collectionName = "Robotos"
// const contractAddress = "0xba30E5F9Bb24caa003E9f2f0497Ad287FDF95623"
// const collectionName = "BoredApeKennelClub"
// const contractAddress = "0x3Acce66cD37518A6d77d9ea3039E00B3A2955460";
// const collectionName = "WonderPals"
// const contractAddress = "0xa5C0Bd78D1667c13BFB403E2a3336871396713c5";
// const collectionName = "CoolmansUniverse";
// const contractAddress = "0x22d4c35A4f2B229A928b1b569b2f60225976426A";
// const collectionName = "FroyoKittens";
// const contractAddress = "0x23581767a106ae21c074b2276D25e5C3e136a68b";
// const collectionName = "MoonBirds";
// const contractAddress = "0x06aF447c72E18891FB65450f41134C00Cf7Ac28c";
// const collectionName = "SushiVerse";
// const contractAddress = "0x0D1fE1EbaB085bd039B4D1FBF96dBe8decF769a1";
// const collectionName = "Zukibirds";
const contractAddress = "0x3bf2922f4520a8BA0c2eFC3D2a1539678DaD5e9D";
const collectionName = "ONIForce";


// const contractAddress = "0x3a5051566b2241285BE871f650C445A88A970edd";
// const collectionName = "TheHumanoids";
// const contractAddress = "0x79FCDEF22feeD20eDDacbB2587640e45491b757f";
// const collectionName = "mfers";

// const contractAddress = "0xe437fed69Ec8eC6243d767cbaeA15A105f51875A";
// const collectionName = "THEPOPULARS";

// function used to change the image link to gateway.ipfs
const modifyImgLink = (url) => {
  if (!url || !url.includes("ipfs://")) return url;
  return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
};

// turn "https://gateway.pinata.cloud/ipfs/Qmen2mzFwV63VEpPD9jvgmqFio7q4wpqqeP2qhR61LCgRr"
// into "https://robotos.mypinata.cloud/ipfs/Qmen2mzFwV63VEpPD9jvgmqFio7q4wpqqeP2qhR61LCgRr"
// const modifyImgLink = (url) => {
//   if (!url) return url;
//   return url.replace("gateway.pinata", "robotos.mypinata");
// };

async function generateRarity() {
  // returns an object with keys: total, page, page_size, cursor, result; the NFTs are stored in the "result"
  // we are concerned with the "metadata" object in the results, which contains the "attributes"
  const NFTs = await Moralis.Web3API.token.getAllTokenIds({
    address: contractAddress,
  });
  const totalNum = NFTs.total; // total amount of NFTs in the collection
  const pageSize = NFTs.page_size; // amount of NFTs pulled from the Moralis .getAllTokenIds
  let allNFTs = NFTs.result; // all tokens(NFTs) listed in an object

  // Moralis queries only allow 500 objects at a time. Set a timer to query every 5100ms
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  console.log(`Querying Moralis for ${collectionName}.`);
  for (let i = pageSize; i < totalNum; i = i + pageSize) {
    console.log(`Pulling from Moralis: ${i} NFTs pulled`);
    const NFTs = await Moralis.Web3API.token.getAllTokenIds({
      address: contractAddress,
      offset: i,
    });
    allNFTs = allNFTs.concat(NFTs.result);
    await timer(5100);
  }

  for (let i = allNFTs.length - 1; i >= 0; i--) {
    if (!allNFTs[i].metadata || !allNFTs[i]) {
      allNFTs.splice(i, 1);
    }
  }

  // each NFT(or token) pulled from the API contains a "metadata" object, which contains the "attributes"(aka NFT traits)
  // lists each NFT's attributes(object with keys 'trait_type' and 'value') from the metadata
  let metadata = allNFTs.map((e) => JSON.parse(e.metadata).attributes);

  for (let i = allNFTs.length - 1; i >= 0; i--) {
    if (!metadata[i]) {
      allNFTs.splice(i, 1);
      metadata.splice(i, 1);
    }
  }

  let tally = { TraitCount: {} };
  for (let i = 0; i < metadata.length; i++) {
    let nftTraits = metadata[i].map((nft) => nft.trait_type);
    let nftValues = metadata[i].map((nft) => nft.value);

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

  const collectionAttributes = Object.keys(tally);
  const nftArr = [];
  for (let i = 0; i < metadata.length; i++) {
    // iterate through the metadata, and calculate a rarity score for each trait value
    // an NFT would have rarityScore X if it contains trait value Y
    let current = metadata[i]; // the metadata of nft i
    let totalRarity = 0;

    // iterating through the trait types (e.g. body, shirt, face ,tier, hat)
    for (let j = 0; j < current.length; j++) {
      // key into the tally to find the number of times a specific trait occurs in the collection
      let numTraitOccurences = tally[current[j].trait_type][current[j].value];
      let rarityScore = 1 / (numTraitOccurences / totalNum); // rarity score = 1 / trait rarity
      current[j].rarityScore = rarityScore;
      current[j].occurences = numTraitOccurences;
      totalRarity += rarityScore;
    }

    // calculate the rarity score from having certain # of traits
    // append to the metadata the rarity score for having X number of traits
    let rarityScoreNumTraits =
      1 / (tally.TraitCount[Object.keys(current).length] / totalNum);
    current.push({
      trait_type: "TraitCount",
      value: Object.keys(current).length,
      rarityScore: rarityScoreNumTraits,
      occurences: tally.TraitCount[Object.keys(current).length],
    });
    totalRarity += rarityScoreNumTraits;

    // calculate rarity for an NFT missing a trait
    if (current.length < contractAddress.length) {
      let nftAttributes = current.map((e) => e.trait_type);

      // select the traits that are not present in this nft
      let absent = collectionAttributes.filter(
        (trait) => !nftAttributes.includes(trait)
      );

      // append to the metadata the rarity score for having a missing trait
      absent.forEach((trait) => {
        let rarityScoreNull =
          1 / ((totalNum - tally[trait].occurences) / totalNum);
        current.push({
          trait_type: trait,
          value: null,
          rarityScore: rarityScoreNull,
          occurences: totalNum - tally[trait].occurences,
        });
        totalRarity += rarityScoreNull;
      });
    }

    // parse the metadata to key into the image link
    // fix image link if needed

    if (allNFTs[i].metadata) {
      allNFTs[i].metadata = JSON.parse(allNFTs[i].metadata);
      allNFTs[i].image = modifyImgLink(allNFTs[i].metadata.image);
    } else if (allNFTs[i].token_uri) {
      try {
        await fetch(allNFTs[i].token_uri)
          .then((response) => response.json())
          .then((data) => {
            allNFTs[i].image = modifyImgLink(data.image);
          });
      } catch (error) {
        console.log(error);
      }
    }

    // let imageLink = "https://nft-media.b-cdn.net/alienfrensnft/" + allNFTs[i].token_id + ".png?width=512&height=512";
    nftArr.push({
      Attributes: current,
      Rarity: totalRarity,
      token_id: allNFTs[i].token_id,
      image: allNFTs[i].image,
    });
  }

  // Sort by rarity
  nftArr.sort((a, b) => b.Rarity - a.Rarity);

  let collectionSize = nftArr.length;
  for (let i = 0; i < nftArr.length; i++) {
    nftArr[i].Rank = i + 1;

    //create a new row in db for each NFT
    const newClass = Moralis.Object.extend(collectionName);
    const newObject = new newClass();

    newObject.set("attributes", nftArr[i].Attributes);
    newObject.set("rarity", nftArr[i].Rarity);
    newObject.set("tokenId", nftArr[i].token_id);
    newObject.set("tokenIdInt", parseInt(nftArr[i].token_id));
    newObject.set("rank", nftArr[i].Rank);
    newObject.set("image", nftArr[i].image);
    newObject.set("collectionSize", collectionSize);
    await newObject.save();
    console.log(`i=${i}: ${i + 1}/${collectionSize} ${collectionName} stored.`);
  }
  return true;
}

generateRarity();
