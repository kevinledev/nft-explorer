/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function() {

eval("// const handleChangeCollection = async (col) => {\n//   const dbNFTs = Moralis.Object.extend(col);\n//   const query = new Moralis.Query(dbNFTs);\n//   query.ascending('rank');\n//   const topNFTs = query.limit(24);\n//   const results = await topNFTs.find();\n//   setNFTBalances(results);\n// };\n// const handleSelectToken = async (num, col) => {\n//   if (num && col) {\n//     const dbNFTs = Moralis.Object.extend(col);\n//     const query = new Moralis.Query(dbNFTs);\n//     console.log(num);\n//     query.equalTo('tokenId', num);\n//     let selectedNFT = await query.first();\n//     selectedNFT = selectedNFT.attributes;\n//     console.log(selectedNFT);\n//     setNft(selectedNFT);\n//     setVisibility(true);\n//   }\n// };\n// const collectionChanged = async (col) => {\n//   setCollection(col);\n//   handleSelectToken(token, col);\n//   handleChangeCollection(col);\n//   let collection = 'ewrwasdf';\n// };\n// const addToNFTs = async (col) => {\n//   const dbNFTs = Moralis.Object.extend(col);\n//   const query = new Moralis.Query(dbNFTs);\n//   query.ascending('rank');\n//   query.limit(24);\n//   const topNFTs = query.skip(NFTBalances.length);\n//   const results = await topNFTs.find();\n//   setNFTBalances(NFTBalances.concat(results));\n// };//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZnQtZXhwbG9yZXIvLi9zcmMvaW5kZXguanM/YjYzNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjb25zdCBoYW5kbGVDaGFuZ2VDb2xsZWN0aW9uID0gYXN5bmMgKGNvbCkgPT4ge1xuLy8gICBjb25zdCBkYk5GVHMgPSBNb3JhbGlzLk9iamVjdC5leHRlbmQoY29sKTtcbi8vICAgY29uc3QgcXVlcnkgPSBuZXcgTW9yYWxpcy5RdWVyeShkYk5GVHMpO1xuLy8gICBxdWVyeS5hc2NlbmRpbmcoJ3JhbmsnKTtcbi8vICAgY29uc3QgdG9wTkZUcyA9IHF1ZXJ5LmxpbWl0KDI0KTtcbi8vICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHRvcE5GVHMuZmluZCgpO1xuLy8gICBzZXRORlRCYWxhbmNlcyhyZXN1bHRzKTtcbi8vIH07XG5cbi8vIGNvbnN0IGhhbmRsZVNlbGVjdFRva2VuID0gYXN5bmMgKG51bSwgY29sKSA9PiB7XG4vLyAgIGlmIChudW0gJiYgY29sKSB7XG4vLyAgICAgY29uc3QgZGJORlRzID0gTW9yYWxpcy5PYmplY3QuZXh0ZW5kKGNvbCk7XG4vLyAgICAgY29uc3QgcXVlcnkgPSBuZXcgTW9yYWxpcy5RdWVyeShkYk5GVHMpO1xuLy8gICAgIGNvbnNvbGUubG9nKG51bSk7XG4vLyAgICAgcXVlcnkuZXF1YWxUbygndG9rZW5JZCcsIG51bSk7XG4vLyAgICAgbGV0IHNlbGVjdGVkTkZUID0gYXdhaXQgcXVlcnkuZmlyc3QoKTtcbi8vICAgICBzZWxlY3RlZE5GVCA9IHNlbGVjdGVkTkZULmF0dHJpYnV0ZXM7XG4vLyAgICAgY29uc29sZS5sb2coc2VsZWN0ZWRORlQpO1xuLy8gICAgIHNldE5mdChzZWxlY3RlZE5GVCk7XG4vLyAgICAgc2V0VmlzaWJpbGl0eSh0cnVlKTtcbi8vICAgfVxuLy8gfTtcblxuLy8gY29uc3QgY29sbGVjdGlvbkNoYW5nZWQgPSBhc3luYyAoY29sKSA9PiB7XG4vLyAgIHNldENvbGxlY3Rpb24oY29sKTtcbi8vICAgaGFuZGxlU2VsZWN0VG9rZW4odG9rZW4sIGNvbCk7XG4vLyAgIGhhbmRsZUNoYW5nZUNvbGxlY3Rpb24oY29sKTtcbi8vICAgbGV0IGNvbGxlY3Rpb24gPSAnZXdyd2FzZGYnO1xuLy8gfTtcblxuLy8gY29uc3QgYWRkVG9ORlRzID0gYXN5bmMgKGNvbCkgPT4ge1xuLy8gICBjb25zdCBkYk5GVHMgPSBNb3JhbGlzLk9iamVjdC5leHRlbmQoY29sKTtcbi8vICAgY29uc3QgcXVlcnkgPSBuZXcgTW9yYWxpcy5RdWVyeShkYk5GVHMpO1xuLy8gICBxdWVyeS5hc2NlbmRpbmcoJ3JhbmsnKTtcbi8vICAgcXVlcnkubGltaXQoMjQpO1xuLy8gICBjb25zdCB0b3BORlRzID0gcXVlcnkuc2tpcChORlRCYWxhbmNlcy5sZW5ndGgpO1xuLy8gICBjb25zdCByZXN1bHRzID0gYXdhaXQgdG9wTkZUcy5maW5kKCk7XG4vLyAgIHNldE5GVEJhbGFuY2VzKE5GVEJhbGFuY2VzLmNvbmNhdChyZXN1bHRzKSk7XG4vLyB9O1xuXG4iXSwiZmlsZSI6Ii4vc3JjL2luZGV4LmpzLmpzIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2Nzcy5qcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZnQtZXhwbG9yZXIvLi9zcmMvaW5kZXguc2Nzcz85NzQ1Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_modules__["./src/index.js"](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.scss"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;