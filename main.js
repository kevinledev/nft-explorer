// require('dotenv').config({ path: '/.env'});
const serverUrl = "REDACTED";
const appId = "REDACTED";
Moralis.start({ serverUrl, appId });
let currentAmtCards = 0;

// add spaces to the collection name taken from the database
// from "StringWithSpaces" to "String With Spaces"
function insertSpaces(string) {
  string = string.replace(/([a-z])([A-Z])/g, "$1 $2");
  string = string.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
  if (string.includes("By")) string = string.replace("By", "by");
  return string;
}

const throttleFunction = (func, delay) => {
  // Previously called time of the function
  let prev = 0;
  return (...args) => {
    // Current called time of the function
    let now = new Date().getTime();

    // Logging the difference between previously
    // called and current called timings

    // If difference is greater than delay call
    // the function again.
    if (now - prev > delay) {
      prev = now;

      // "..." is the spread operator here
      // returning the function with the
      // array of arguments
      return func(...args);
    }
  };
};

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
  console.log("getCollection() complete");
  return collectionData;
}

async function fetchAndRenderCollection(collection, currentAmtCards) {
  let data = await getCollectionData(collection, currentAmtCards);
  console.log(currentAmtCards);
  // console.log(data);

  for (let i = 0; i < data.length; i++) {
    let card = document.createElement("div");
    let cardCover = document.createElement("div");
    let imageWrapper = document.createElement("div");
    let img = document.createElement("img");
    let cardBody = document.createElement("div");
    let cardBodyRank = document.createElement("div");
    let cardBodyDetail = document.createElement("div");

    card.classList.add(`card`);
    card.id = i + currentAmtCards;
    cardCover.classList.add("card-cover");
    cardBody.classList.add("card-body");
    cardBodyRank.classList.add("card-body-rank");
    cardBodyDetail.classList.add("card-body-detail");
    cardBodyDetail.id = data[i].attributes.tokenId;
    imageWrapper.classList.add("image-wrapper");

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

    card.addEventListener("click", function(){
      fetchAndRenderTokenDetails(collection, cardBodyDetail.id);
    })

  }
  let titleText = document.querySelector("#collection-name");

  // add event listeners for new the cards rendered
  titleText.innerText = insertSpaces(collection);

}

// displays as modal
async function fetchAndRenderTokenDetails(collection, selectedTokenId) {
  // const query = new Moralis.Query(collection);
  // query.equalTo("tokenId", selectedTokenId);
  // let selectedToken = await query.first();
  // console.log(selectedToken);
  console.log([collection, selectedTokenId]);
  //render it
}

function loadMore() {
  // const lastCard = document.querySelector(".card:last-of-type");
  // let amountCardsLoaded = JSON.parse(lastCard.id) + 1;
  // console.log(amountCardsLoaded + "cards loaded. Now loading more");
  let collection = document.getElementById("gallery").className;
  let amountCardsLoaded = document.querySelectorAll(".card").length;
  console.log(amountCardsLoaded + "cards loaded. Now loading more");
  fetchAndRenderCollection(collection, amountCardsLoaded);
}

function changeCollection(collection) {
  fetchAndRenderCollection(collection, 0);
}

window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded");
  fetchAndRenderCollection("Doodles", 0);

  document.getElementById("dropdown").addEventListener("change", function () {
    document.querySelectorAll(".card").forEach((e) => e.remove());
    changeCollection(this.value);
    console.log(this.id);
  });

  document.addEventListener(
    "scroll",
    throttleFunction(() => {
      let documentHeight = document.body.scrollHeight;
      let currentScroll = window.scrollY + window.innerHeight;
      // When the user is [modifier]px from the bottom, fire the event.
      let modifier = documentHeight * .7;
      if (currentScroll + modifier > documentHeight) loadMore();
    }, 2000)
  );
});
