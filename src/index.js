// const Moralis = require("moralis");
import insertSpacesAndCapitalize from "./helper/insert-spaces.js";
import throttleFunction from "./helper/throttle.js";

function startServer() {
  const serverUrl = "https://zp5obq00poae.usemoralis.com:2053/server";
  const appId = "Vsfufr7b58Pbk14V5ZdAe412PCZp30ZktiHlPQdI";
  Moralis.start({ serverUrl, appId });
}

async function getCollectionData(collection, sortedBy, currentAmtCards) {
  // console.log(collection)
  const query = new Moralis.Query(collection);
  query.ascending(sortedBy);
  const topNFTs = query.skip(currentAmtCards).limit(25);
  const results = await topNFTs.find();
  // console.log(results);

  let collectionData = [];
  for (let i = 0; i < Object.keys(results).length; i++) {
    let key = Object.keys(results)[i];
    collectionData.push(results[key]);
  }
  // console.log(collectionData);
  // console.log("getCollection() complete");
  return collectionData;
}

async function fetchAndRenderCollection(collection, sortedBy, currentAmtCards) {
  document.getElementById("gallery").className = collection;
    let titleText = document.querySelector("#collection-name");
    titleText.innerText = insertSpacesAndCapitalize(collection);
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

    
    document.getElementById("gallery").appendChild(card);
    card.appendChild(cardCover);
    cardCover.appendChild(imageWrapper);
    card.appendChild(cardBody);
    cardBody.appendChild(cardBodyRank);
    cardBody.appendChild(cardBodyDetail);
    img.src = data[i].attributes.image;
    imageWrapper.appendChild(img);

    cardBodyRank.innerText = "RANK " + data[i].attributes.rank;
    cardBodyDetail.innerText = "#" + data[i].attributes.tokenId;

    card.addEventListener("click", function () {
      fetchAndRenderTokenDetails(collection, cardBodyDetail.id);
    });
  }

}

// displays as modal
async function fetchAndRenderTokenDetails(collection, selectedTokenId) {
  const query = new Moralis.Query(collection);
  query.equalTo("tokenId", selectedTokenId);
  let selectedToken = await query.first();
  // console.log(selectedToken);

  let modal = document.querySelector(".modal");
  modal.style.display = "flex";

  let modalWindow = document.querySelector(".modal-body");

  let modalBodyLeft = document.createElement("div");
  modalBodyLeft.classList.add("modal-body-left");
  modalWindow.appendChild(modalBodyLeft);

  let rank = document.createElement("div");
  rank.classList.add("rank");
  modalBodyLeft.appendChild(rank);
  rank.innerText = `RANK ${selectedToken.attributes.rank}`;

  let img = document.createElement("img");
  img.src = selectedToken.attributes.image;
  modalBodyLeft.appendChild(img);

  let collAndId = document.createElement("div");
  collAndId.classList.add("collection-and-id");
  modalBodyLeft.appendChild(collAndId);
  collAndId.innerText = `${insertSpacesAndCapitalize(
    collection
  )} #${selectedTokenId}`;

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

    // console.log(currentTrait);
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

async function skipAndRenderTokens(collection, tokenId) {
  const query = new Moralis.Query(collection);
  query.lessThan("tokenIdInt", tokenId);
  const count = await query.count();
  let countInt = parseInt(count);
  // console.log(`${count} amount of tokens before ${tokenId}`);
  fetchAndRenderCollection(collection, "tokenIdInt", countInt);
}

function loadMore() {
  let collection = document.getElementById("gallery").className;
  let amountCardsLoaded = document.querySelectorAll(".card").length;
  let sortOrder = document.getElementById("sort-by").value;
  // console.log(amountCardsLoaded + "cards loaded. Now loading more");
  fetchAndRenderCollection(collection, sortOrder, amountCardsLoaded);
}

function changeCollection(collection) {
  window.scrollTo(0,0);
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  fetchAndRenderCollection(collection, "rank", 0);
}

function showInstructions(target) {
  let othermodal = document.querySelector(".modal");
  othermodal.style.display="none";
  document.querySelector(".modal-body").innerHTML = "";

  let modal = document.querySelector(".instructions-modal");
  modal.style.display = "flex";


  let ibutton = document.getElementById("info-button");
  ibutton.addEventListener("click", function (event) {
    if (event.target === this) {
      modal.style.display = "none";
      ibutton.addEventListener("click", ()=> showInstructions())
    }
  });

  modal.addEventListener("click", function (event) {
    if (event.target === this) {
      this.style.display = "none";
    }
  });
}

let currentAmtCards = 0;
document.addEventListener("DOMContentLoaded", (event) => {
  // console.log("DOM fully loaded");

  startServer();
  let currentAmtCards = 0;

  fetchAndRenderCollection("CoolCats", "rank", 0);

  document.getElementById("dropdown").addEventListener("change", function () {
    changeCollection(this.value);
  });

  document.getElementById("jump-button").addEventListener("click", function () {
    let num = document.getElementById("jump-to");
    num = parseInt(num.value);
    let currentCollection = document.getElementById("gallery").className;

    let currentSortBy = document.getElementById("sort-by").value;
    // console.log(currentSortBy);
    // console.log(num);
    document.querySelectorAll(".card").forEach((e) => e.remove());
    if (currentSortBy === "tokenIdInt") {
      skipAndRenderTokens(currentCollection, num);
    } else {
      fetchAndRenderCollection(currentCollection, "rank", num - 1);
    }
  });

  document.getElementById("sort-by").addEventListener("change", function () {
    let currentCollection = document.getElementById("gallery").className;
    document.querySelectorAll(".card").forEach((e) => e.remove());
    if (this.value === "rank") {
      document.getElementById("jump-to").placeholder = `Jump To Rank`;
      document.querySelector("#jump-to").value = "";
    } else if (this.value === "tokenIdInt") {
      document.getElementById("jump-to").placeholder = `Jump To Token ID`;
      document.querySelector("#jump-to").value = "";
    }
    fetchAndRenderCollection(currentCollection, this.value, 0);
  });

  document
    .getElementById("info-button")
    .addEventListener("click", () => showInstructions());

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
      let modifier = documentHeight * 0.5;
      if (currentScroll + modifier > documentHeight) loadMore();
    }, 1000)
  );
});
