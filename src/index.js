// const Moralis = require("moralis");

function startServer() {
  const serverUrl = "https://zp5obq00poae.usemoralis.com:2053/server";
  const appId = "Vsfufr7b58Pbk14V5ZdAe412PCZp30ZktiHlPQdI";
  Moralis.start({ serverUrl, appId });
}


// add spaces to the collection name taken from the database
// from "StringWithSpaces" to "String With Spaces"
function insertSpacesAndCapitalize(str) {
  const words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  str = words.join(" ");
  str = str.replace(/([a-z])([A-Z])/g, "$1 $2");
  str = str.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
  if (str.includes("By")) str = str.replace("By", "by");
  if (str.includes("Bear")) str = str.replace(" Bear", "Bear");
  if (str.includes(" Verse")) str = str.replace(" Verse", "Verse");
  return str;
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

async function getCollectionData(collection, sortedBy, currentAmtCards) {
  const query = new Moralis.Query(collection);
  query.ascending(sortedBy);
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

async function fetchAndRenderCollection(collection, sortedBy, currentAmtCards) {
  let data = await getCollectionData(collection, sortedBy, currentAmtCards);

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

    card.addEventListener("click", function () {
      fetchAndRenderTokenDetails(collection, cardBodyDetail.id);
    });
  }
  let titleText = document.querySelector("#collection-name");
  document.querySelector("#sort-order").classList.add(sortedBy);

  // add event listeners for new the cards rendered
  titleText.innerText = insertSpacesAndCapitalize(collection);
}

// displays as modal
async function fetchAndRenderTokenDetails(collection, selectedTokenId) {
  const query = new Moralis.Query(collection);
  query.equalTo("tokenId", selectedTokenId);
  let selectedToken = await query.first();
  console.log(selectedToken);

  let modal = document.querySelector(".modal");
  modal.style.display = "flex";

  let modalWindow = document.querySelector(".modal-body");

  let modalBodyLeft = document.createElement("div");
  modalBodyLeft.classList.add("modal-body-left");
  modalWindow.appendChild(modalBodyLeft);

  let rank = document.createElement("div");
  rank.classList.add("rank");
  modalBodyLeft.appendChild(rank);
  rank.innerText = `Rarity Rank #${selectedToken.attributes.rank}`;

  let img = document.createElement("img");
  img.src = selectedToken.attributes.image;
  modalBodyLeft.appendChild(img);

  let collAndId = document.createElement("div");
  collAndId.classList.add("collection-and-id");
  modalBodyLeft.appendChild(collAndId);
  collAndId.innerText = `${collection} #${selectedTokenId}`;

  let modalBodyRight = document.createElement("div");
  modalBodyRight.classList.add("modal-body-right");
  modalWindow.appendChild(modalBodyRight);

  let rarityScoreWrapper = document.createElement("div");
  rarityScoreWrapper.classList.add("rarity-score-wrapper");
  modalBodyRight.appendChild(rarityScoreWrapper);

  let rarityScoreLabel = document.createElement("div");
  rarityScoreLabel.classList.add("rarity-score-label");
  rarityScoreWrapper.appendChild(rarityScoreLabel);
  rarityScoreLabel.innerText = "Rarity Score";

  let rarityScore = document.createElement("div");
  rarityScore.classList.add("rarity-score");
  rarityScoreWrapper.appendChild(rarityScore);
  rarityScore.innerText = `${selectedToken.attributes.rarity.toFixed(2)}`;

  for (let i = 0; i < selectedToken.attributes.attributes.length; i++) {
    let currentTrait = selectedToken.attributes.attributes[i];

    let traitAndScore = document.createElement("div");
    traitAndScore.classList.add("trait-and-score");
    traitAndScore.id = currentTrait.trait_type;
    modalBodyRight.appendChild(traitAndScore);

    let trait = document.createElement("div");
    trait.classList.add("trait");
    traitAndScore.appendChild(trait);
    trait.innerHTML =
      currentTrait.trait_type[0].toUpperCase() +
      currentTrait.trait_type.slice(1);

    console.log(currentTrait);
    let traitScore = document.createElement("div");
    traitScore.classList.add("trait-score");
    traitAndScore.appendChild(traitScore);
    traitScore.innerHTML = "+" + currentTrait.rarityScore.toFixed(2);

    let valueAndCount = document.createElement("div");
    valueAndCount.classList.add("value-and-count");
    modalBodyRight.appendChild(valueAndCount);

    let traitValue = document.createElement("div");
    traitValue.classList.add("trait-value");
    valueAndCount.appendChild(traitValue);
    if (currentTrait.value === null) {
      traitValue.innerText = "none";
    } else {
      traitValue.innerText = currentTrait.value;
    }

    let traitCount = document.createElement("div");
    traitCount.classList.add("trait-count");
    valueAndCount.appendChild(traitCount);
    traitCount.innerText = currentTrait.occurences;
  }
}

function loadMore() {
  // const lastCard = document.querySelector(".card:last-of-type");
  // let amountCardsLoaded = JSON.parse(lastCard.id) + 1;
  // console.log(amountCardsLoaded + "cards loaded. Now loading more");
  let collection = document.getElementById("gallery").className;
  let amountCardsLoaded = document.querySelectorAll(".card").length;
  let sortOrder = document.querySelector("#sort-order").className;
  console.log(amountCardsLoaded + "cards loaded. Now loading more");
  fetchAndRenderCollection(collection, sortOrder, amountCardsLoaded);
}

function changeCollection(collection) {
  fetchAndRenderCollection(collection, "rank", 0);
}

let currentAmtCards = 0;
document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded");

  startServer();
  let currentAmtCards = 0;


  fetchAndRenderCollection("CoolCats", "rank", 0);

  document.getElementById("dropdown").addEventListener("change", function () {
    document.querySelectorAll(".card").forEach((e) => e.remove());
    changeCollection(this.value);
    console.log(this.id);
  });

  let modal = document.querySelector(".modal");
  modal.addEventListener("click", function (event) {
    if (event.target === this) {
      this.style.display = "none";
      this.querySelector(".modal-body").innerHTML = "";
    }
  });

  document.addEventListener(
    "scroll",
    throttleFunction(() => {
      let documentHeight = document.body.scrollHeight;
      let currentScroll = window.scrollY + window.innerHeight;
      // When the user is [modifier]px from the bottom, fire the event.
      let modifier = documentHeight * 0.8;
      if (currentScroll + modifier > documentHeight) loadMore();
    }, 1000)
  );
});
