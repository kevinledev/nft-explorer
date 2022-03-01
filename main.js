// require('dotenv').config({ path: '/.env'});
const serverUrl = "REDACTED";
const appId = "REDACTED";
Moralis.start({ serverUrl, appId });
let currentAmtCards = 0;


// add spaces to the collection name taken from the database
// from "StringWithSpaces" to "String With Spaces"
function insertSpaces(string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    return string;
}

async function getCollectionData(collection, currentAmtCards) {
  const query = new Moralis.Query(collection);
  query.ascending("rank");
  const topNFTs = query.skip(currentAmtCards).limit(48);
  const results = await topNFTs.find();
  console.log(results);

  let collectionData = [];
  for (let i = 0; i < Object.keys(results).length; i++) {
    let key = Object.keys(results)[i];
    collectionData.push(results[key]);
  }
  console.log(collectionData);
  console.log("getCollection() complete")
  return collectionData
}

async function fetchAndRenderCollection (collection, currentAmtCards) {
  let data = await getCollectionData(collection, currentAmtCards);
  console.log(currentAmtCards)
  // console.log(data);

  for (let i = 0; i < data.length; i++) {
    let card = document.createElement('div');
      let cardCover = document.createElement('div');
        let imageWrapper = document.createElement('div')
          let img = document.createElement('img');
      let cardBody = document.createElement('div');
        let cardBodyRank = document.createElement('div');
        let cardBodyDetail = document.createElement('div');

    card.classList.add(`card`)
    card.id = i + currentAmtCards;
    cardCover.classList.add('card-cover')
    cardBody.classList.add('card-body')
    cardBodyRank.classList.add('card-body-rank')
    cardBodyDetail.classList.add('card-body-detail')
    imageWrapper.classList.add('image-wrapper')

    document.getElementById("gallery").className = collection;
    document.getElementById("gallery").appendChild(card);
    card.appendChild(cardCover);
    cardCover.appendChild(imageWrapper);
    card.appendChild(cardBody);
    cardBody.appendChild(cardBodyRank);
    cardBody.appendChild(cardBodyDetail);
    img.src = data[i].attributes.image;
    imageWrapper.appendChild(img);


    cardBodyRank.innerText = "Rank #" + data[i].attributes.rank;
    cardBodyDetail.innerText = "#" + data[i].attributes.tokenId;
  }
  let titleText = document.getElementById("collection-name")
  titleText.innerText = insertSpaces(collection);
  // Render load button after the cards
  // document.getElementById('load-button').style.display='block'

}


function loadMore(currentCollection) {
  // document.getElementById("load-button").display='none';
  const lastCard = document.querySelector(".card:last-of-type");
  console.log(lastCard);
  let amountCardsLoaded = JSON.parse(lastCard.id) + 1;
  console.log(amountCardsLoaded+ 'cards loaded');
  fetchAndRenderCollection(currentCollection, amountCardsLoaded);
}

function changeCollection(collection){
  fetchAndRenderCollection(collection, 0);
}


window.addEventListener('DOMContentLoaded', (event) => {

  console.log('DOM fully loaded');
  fetchAndRenderCollection("Doodles", 0);

  document.getElementById('dropdown').addEventListener('change', function() {
    document.querySelectorAll(".card").forEach(e => e.remove())
    changeCollection(this.value);
  });

  // const loadButton = document.getElementById('load-button');
  // loadButton.addEventListener('click', loadMore);


  window.addEventListener('scroll',()=>{
    console.log(window.scrollY) //scrolled from top
    console.log(window.innerHeight) //visible part of screen
    if(window.scrollY + window.innerHeight>= 
    document.documentElement.scrollHeight){
    let collection = document.getElementById("gallery").className;
    loadMore(collection);
    }
  })
});














