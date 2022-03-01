// const handleChangeCollection = async (col) => {
//   const dbNFTs = Moralis.Object.extend(col);
//   const query = new Moralis.Query(dbNFTs);
//   query.ascending('rank');
//   const topNFTs = query.limit(24);
//   const results = await topNFTs.find();
//   setNFTBalances(results);
// };

// const handleSelectToken = async (num, col) => {
//   if (num && col) {
//     const dbNFTs = Moralis.Object.extend(col);
//     const query = new Moralis.Query(dbNFTs);
//     console.log(num);
//     query.equalTo('tokenId', num);
//     let selectedNFT = await query.first();
//     selectedNFT = selectedNFT.attributes;
//     console.log(selectedNFT);
//     setNft(selectedNFT);
//     setVisibility(true);
//   }
// };

// const collectionChanged = async (col) => {
//   setCollection(col);
//   handleSelectToken(token, col);
//   handleChangeCollection(col);
//   let collection = 'ewrwasdf';
// };

// const addToNFTs = async (col) => {
//   const dbNFTs = Moralis.Object.extend(col);
//   const query = new Moralis.Query(dbNFTs);
//   query.ascending('rank');
//   query.limit(24);
//   const topNFTs = query.skip(NFTBalances.length);
//   const results = await topNFTs.find();
//   setNFTBalances(NFTBalances.concat(results));
// };

