/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://project-template/./src/scss/style.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_script_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/script.js */ \"./src/js/script.js\");\n/* harmony import */ var _js_script_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_script_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/style.scss */ \"./src/scss/style.scss\");\n\n\n\n\n//# sourceURL=webpack://project-template/./src/index.js?");

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/***/ (() => {

eval("const tiles = document.querySelectorAll('.tile');\nconst min_bombs = 7;\nconst max_bombs = 14;\nconst bomb_amount = Math.floor(Math.random() * max_bombs) + min_bombs;\nlet bomb_Map = [];\nlet checked_fields = 0;\nconst winner_Number = tiles.length - bomb_amount\nconst btn_restart = document.getElementById(\"btn_restart\");\nconst lbl_mines_amount = document.getElementById(\"lbl_mines_amount\");\nlet many_mines = false;\n\n\nwindow.onload = () => {\n    lbl_mines_amount.innerHTML = `${bomb_amount} Minen`\n    add_Bombs(bomb_amount);\n    random_tile_color();\n    first_hints();\n    //helper_colorize_Bombs()\n}\n\n// Discover 4 fields, that are minefree\nfunction first_hints() {\n    if (bomb_amount >= 15) {\n        many_mines = true;\n        const amount_of_helpers = 4\n        let counter = 0;\n\n        for (let i = 5; i < tiles.length; i++) {\n            if (counter < amount_of_helpers) {\n                if (document.getElementById(`tile_${i}`).getAttribute(\"data-field\") !== 'bomb') {\n                    document.getElementById(`tile_${i}`).innerHTML = '⛳️';\n                    i += 15\n                    counter++;\n                }\n            }else {\n                break\n            }\n        }\n    }\n}\n\nfunction add_Bombs(bomb_amount) {\n    for (let i = 1; i <= bomb_amount; i++) {\n        const randomNumb = parseInt(Math.random() * tiles.length + 1);\n        const tileId = `tile_${randomNumb}`\n        if (bomb_Map.includes(tileId)) {\n            i = i -= 1;\n        } else {\n            bomb_Map.push(tileId);\n            document.getElementById(tileId).setAttribute(\"data-field\", \"bomb\")\n        }\n    }\n}\n\nfunction random_tile_color() {\n    tiles.forEach((tile) => {\n        if (parseInt(Math.random() * 2) === 1) {\n            document.getElementById(tile.id).style.backgroundColor = 'rgba(101, 76, 53, 0.929)'\n        } else {\n            document.getElementById(tile.id).style.backgroundColor = 'rgba(138, 108, 82, 0.929)'\n        }\n    })\n}\n\n\nfunction helper_colorize_Bombs() {\n    for (let i = 0; i < bomb_Map.length; i++) {\n        const tileId = `${bomb_Map[i]}`;\n        document.getElementById(tileId).style.backgroundColor = 'red'\n    }\n\n    for (let i = 1; i <= tiles.length; i++) {\n        const tileId = `${`tile_${i}`}`;\n        document.getElementById(tileId).innerHTML = i\n    }\n}\n\n// Event Listener for Tiles click\ntiles.forEach((tile) => {\n    tile.addEventListener(\"click\", () => {\n        const directions = ['up', 'up_right', 'right', 'down_right', 'down', 'down_left', 'left', 'up_left']\n        const tileId = tile.id;\n        if (document.getElementById(tileId).getAttribute(\"data-status\") !== 'checked') {\n            document.getElementById(tileId).setAttribute(\"data-status\", \"checked\");\n            checked_fields++;\n            document.getElementById(tileId).classList.add(\"scanning\")\n            let bombCounter = 0;\n            setTimeout(() => {\n                for (let i = 0; i < directions.length; i++) {\n                    const direction = directions[i];\n                    const adjacentAttribute = getAdjacentTileAttribute(tileId, direction);\n                    if (adjacentAttribute === 'bomb') {\n                        bombCounter++;\n                    } else if (adjacentAttribute !== false && adjacentAttribute !== 'checked') {\n\n                        // Adds random secure marker \n                        if (document.getElementById(adjacentAttribute).getAttribute(\"data-status\") !== 'checked') {\n                            if(many_mines) {\n                                if (parseInt(Math.random() * 7) <= 2) {\n                                    document.getElementById(adjacentAttribute).innerHTML = '⛳️'\n                                }\n                            }else {\n                                if (parseInt(Math.random() * 7) === 1) {\n                                    document.getElementById(adjacentAttribute).innerHTML = '⛳️'\n                                }\n                            }\n                        }\n                    }\n\n                    // if Game Over\n                    if (document.getElementById(tileId).getAttribute(\"data-field\") === 'bomb') {\n                        for (let i = 0; i < bomb_Map.length; i++) {\n                            const tileId = `${bomb_Map[i]}`;\n                            document.getElementById(tileId).innerHTML = '💥';\n                            setTimeout(() => {\n                                document.getElementById(tileId).classList.add(\"boom\");\n                            }, 600);\n\n                        }\n                        document.getElementById(tileId).classList.add(\"boom\");\n                        disable_Tiles()\n                        setTimeout(() => {\n                            document.getElementById(\"output_result\").innerHTML = `Verloren 🥵 </br> </br> ${bomb_amount} Minen sind explodiert`;\n                            document.getElementById(\"result_window\").classList.add(\"active\");\n                        }, 3200);\n                        break\n                    }\n\n                    document.getElementById(tileId).innerHTML = bombCounter;\n                    document.getElementById(tileId).style.backgroundColor = '#4a2b16'\n\n                    if (bombCounter === 0) {\n                        document.getElementById(tileId).style.color = 'grey'\n                        if (parseInt(Math.random() * 2) === 1) {\n                            document.getElementById(tileId).style.backgroundColor = 'rgb(73 45 21 / 93%)'\n                        } else {\n                            document.getElementById(tileId).style.backgroundColor = 'rgba(62, 38, 17, 0.93)'\n                        }\n                    } else if (bombCounter === 1) {\n                        document.getElementById(tileId).style.color = 'yellow'\n                        document.getElementById(tileId).style.backgroundColor = 'rgb(105 67 41)'\n                    } else {\n                        document.getElementById(tileId).style.color = 'orange'\n                    }\n\n                    // Gewonnen\n                    if (checked_fields === winner_Number) {\n                        document.getElementById(tileId).innerHTML = '0'\n                        for (let i = 0; i < bomb_Map.length; i++) {\n                            const tileId = `${bomb_Map[i]}`;\n                            document.getElementById(tileId).innerHTML = '💣'\n                        }\n                        disable_Tiles()\n                        setTimeout(() => {\n                            document.getElementById(\"output_result\").innerHTML = `Gewonnen 😀 </br> </br> Du hast alle ${bomb_amount} Minen gesichert`;\n                            document.getElementById(\"result_window\").classList.add(\"active\");\n                        }, 2200);\n                        break\n                    }\n                }\n                document.getElementById(tileId).classList.remove(\"scanning\")\n            }, 1300);\n        }\n    })\n})\n\nfunction getAdjacentTileAttribute(tileId, direction) {\n    const row = Math.floor((parseInt(tileId.split(\"_\")[1]) - 1) / 9) + 1;\n    const column = (parseInt(tileId.split(\"_\")[1]) - 1) % 9 + 1;\n\n    let adjacentRow = row;\n    let adjacentColumn = column;\n\n    if (direction === \"up\") {\n        adjacentRow = row - 1;\n    } else if (direction === \"down\") {\n        adjacentRow = row + 1;\n    } else if (direction === \"left\") {\n        adjacentColumn = column - 1;\n    } else if (direction === \"right\") {\n        adjacentColumn = column + 1;\n    } else if (direction === \"up_left\") {\n        adjacentColumn = column - 1;\n        adjacentRow = row - 1;\n    } else if (direction === \"down_left\") {\n        adjacentColumn = column - 1;\n        adjacentRow = row + 1;\n    } else if (direction === \"up_right\") {\n        adjacentRow = row - 1;\n        adjacentColumn = column + 1;\n    } else if (direction === \"down_right\") {\n        adjacentRow = row + 1;\n        adjacentColumn = column + 1;\n    }\n\n    if (\n        adjacentRow >= 1 && adjacentRow <= 10 &&\n        adjacentColumn >= 1 && adjacentColumn <= 9\n    ) {\n        const adjacentTileId = \"tile_\" + ((adjacentRow - 1) * 9 + adjacentColumn);\n        const adjacentTile = document.getElementById(adjacentTileId);\n        if (adjacentTile.getAttribute(\"data-field\") === \"bomb\") {\n            return adjacentTile.getAttribute(\"data-field\")\n        } else {\n            return adjacentTileId\n        }\n    } else {\n        return false;\n    }\n}\n\n\n\n\nfunction disable_Tiles() {\n    tiles.forEach((tile) => {\n        document.getElementById(tile.id).setAttribute(\"data-status\", \"checked\");\n    })\n}\n\n\nbtn_restart.addEventListener(\"click\", () => {\n    window.location.reload();\n})\n\n//# sourceURL=webpack://project-template/./src/js/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;