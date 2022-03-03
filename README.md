<h1 align="center">NFT Explorer</h1>

<h2>[Live Site](https://kevinledev.github.io/nft-explorer/)</h2>

NFT Explorer is an app that collects data for certain NFT projects, and ranks the NFTs by their rarity. This app helps provide an easy to understand ranking of the rarity of the NFTs, which users can quickly tell if an NFT is rare or not. Therefore, NFT collectors can easily compare the value of NFTs with each other to make quicker and faster decisions.

NFT Explorer is powered by the Moralis API, a “Web 3” web development platform. The app is written in Javascript, HTML, and CSS.

Each NFT in a collection represents a token on the blockchain (just like Bitcoin or Ethereum). The NFT data is collected by using a query to the Moralis API to fetch all tokens from a contract address representing the NFT project. Each token contains an object of code called the “metadata”, which contains the trait information and image link for an NFT. Users can select an NFT project to view, and click on each NFT card to reveal its traits and rarity score.

My app organizes the trait information for each NFT, counts the trait occurrences, and assigns a rarity score for each NFT based on the combination of traits. This is done in the /generator/rarity.js file, and the data is stored in the NFT Explorer database on the Moralis platform. The rarity score is calculated by the combined statistical probability of the NFT traits. A detailed overview of this will be in the Rarity Score Calculation section.

One technical issue I overcame while creating this project was being able to efficiently collect, organize, and store the NFT data. Blockchain data is usually complex, disorganized, and sometimes missing. Since each NFT project is designed by a different team of people, the data can be organized differently between projects.

For example, most NFTs point to an image link stored on InterPlanetary File System (ipfs.io), and the link to the exact image should start with “https://gateway.ipfs.io/ipfs/”. However after pulling a few NFT projects, I noticed that some projects would render a blank image, because the image link in the metadata would not include “https://gateway.ipfs.io/ipfs/”; they would start with “ipfs://”. In the /generator/rarity.js file, I created a function called modifyImgLink() that would change the image link string to have each NFT point to the correct link in IPFS, and render on the page. 

Sometimes an NFT might not even have a “metadata” object stored in the code, so there would be no data to process for that NFT. This could be an oversight from the NFT creators when making the NFT collection, or an issue with the Moralis API not being able to pull information for that NFT. When this occurs in my data collection script (/generator/rarity.js), the code breaks and no data would be stored. I solved this by filtering out the NFTs that do not have metadata before I key into the NFT traits. So an NFT collection might start with 10,000 NFTs, but because some of them have missing metadata, there will only be 9,840 NFT data points stored. My algorithm adjusts the probability calculation based on the 9,840 NFTs rather than the total 10,000.

Another technical feature I am proud of is having my app render each NFT, and rendering the modal to display the NFT traits corresponding to the specific NFT that is clicked on. The NFT collection is rendered upon selecting a project in the dropdown and iterating through the queried data. During the render for each NFT card, I embedded an event listener in each NFT card to call the async fetchAndRenderTokenDetails() function that would render the modal for the respective NFT. I found it very interesting how specific data for an NFT can be displayed using this multi-layered approach.

```
async function fetchAndRenderCollection() {
    1. query from database
    2. loop through query results (each NFT) {
        i. render NFT card with image
        ii. add event listener to call fetchAndRenderTokenDetails() when clicked
    }
}
```

```
async function fetchAndRenderTokenDetails() {
    1. create the structure for the modal (window, body, left and right boxes, total rarity score)
    2. for the NFT this is being called on, loop through the NFT traits {
        i. render the trait type and rarity score for having that trait
        Ii. render the trait value and number of times this value occurs in the collection 
    }
}
```


this section below is the proposal

*NFT Explorer* is a web app that analyzes NFT collections and generates rarity scores for users to sort and view NFTs by rarity. It will do so by pulling NFT data from the blockchain, rendering the NFT images/data, and assigning a rarity score for each NFT representing how rare an NFT is. <br><br>


## What are NFTs?

NFTs (Non Fungible Tokens) are digital assets that represent real-world objects, like art, music, or videos. They are primarily stored on the Ethereum blockchain, and traded online using cryptocurrency. The most popular NFTs today are part of generative art collections, such as CryptoPunks, or Bored Ape Yacht Club. Such collections have been very successful in creating strong and vibrant communities, because owning one of these NFTs gives special access and a feeling of belonging to that exclusive community.

These generative NFT collections consist of avatars with randomly generated features (such as hair color, face style, shirt color), with certain features being more common or rarer than others. So an NFT can be significantly rarer than another if it has multiple rare traits(e.g. unique hair color or accessories), while the other only has common traits.

For an investor looking to buy into an NFT project, they will go through all NFTs in a collection to find ones that they like in terms of look and overall rarity. Rarity is most important to an investor because rarer NFTs have more potential to increase in value over time. However, it's almost impossible to tell how rare an NFT is just by looking at it.

*NFT Explorer* gives investors and collectors a compass to navigate the wild-west of NFTs by generating rarity percentages, where the most rare NFTs have a percentage of 100%. Users can use NFT Explorer to make better and faster buying decisions. <br><br>


## In NFT Explorer, users will be able to: 
<ul>
  <li> View complete NFT collections, including images and NFT traits.</li>
  <li> Click on a specific NFT to see its rarity and trait information.</li>
  <li> Input a contract address to view any NFT collection. </li>
  <li> Sort NFT collection by rarity </li>
  <li> Sort NFT collection by token id number </li>
</ul>

## Wireframe
![Screen Shot 2022-02-25 at 5 21 59 PM](https://user-images.githubusercontent.com/96442866/155823441-6b331991-d556-49ff-8e45-dd89e242124f.png)



## Technologies
<ul>
  <li> Javascript to calculate rarity and handle sorting logic </li>
  <li> Moralis API to pull blockchain data </li>
  <li> CSS for styling </li>
</ul> 

## Implementation Timeline
Note to self: complete by end of day
<ul>
  <li>Friday: Write a javascript program that uses an API to pull nft data from the blockchain. Finalize rarity score formula and server.</l1>

  <li>Sunday: Research and design the scoring algorithm for NFTs. If there is time, create a front end that can render a single set of NFTs.</l1>

  <li>Monday: Create a dropdown list for several NFT collections. I will try to implement an option to additionally sort the nfts by id #, or by random order.</l1>

  <li>Due Date: Finalize and flesh out the front end aesthetics. If there is a back-end, I will figure out how to host my project.</l1>
</ul>


# nft-explorer
