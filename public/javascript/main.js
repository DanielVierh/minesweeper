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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_script_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/script.js */ \"./src/js/script.js\");\n/* harmony import */ var _js_script_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_script_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/style.scss */ \"./src/scss/style.scss\");\n\r\n\r\n\n\n//# sourceURL=webpack://project-template/./src/index.js?");

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/***/ (() => {

eval("const tiles = document.querySelectorAll('.tile');\r\nconst min_bombs = 7;\r\nconst max_bombs = 40;\r\nconst bomb_amount = Math.floor(Math.random() * max_bombs) + min_bombs;\r\nlet bomb_Map = [];\r\nlet checked_fields = 0;\r\nconst winner_Number = tiles.length - bomb_amount;\r\nconst btn_restart = document.getElementById('btn_restart');\r\nconst lbl_mines_amount = document.getElementById('lbl_mines_amount');\r\nconst lbl_shield = document.getElementById('lbl_shield');\r\nlet many_mines = false;\r\nlet many_many_mines = false;\r\nlet shield = false;\r\n\r\nwindow.onload = () => {\r\n    lbl_mines_amount.innerHTML = `${bomb_amount} Minen`;\r\n    add_Bombs(bomb_amount);\r\n    random_tile_color();\r\n    first_hints();\r\n    //helper_colorize_Bombs()\r\n};\r\n\r\n// Discover 4 fields, that are minefree\r\nfunction first_hints() {\r\n    if (bomb_amount >= 15 && bomb_amount < 30) {\r\n        many_mines = true;\r\n        const amount_of_helpers = 4;\r\n        let counter = 0;\r\n        place_shield();\r\n        for (let i = 5; i < tiles.length; i++) {\r\n            if (counter < amount_of_helpers) {\r\n                if (\r\n                    document\r\n                        .getElementById(`tile_${i}`)\r\n                        .getAttribute('data-field') !== 'bomb'\r\n                ) {\r\n                    document.getElementById(`tile_${i}`).innerHTML = '⛳️';\r\n                    i += 15;\r\n                    counter++;\r\n                }\r\n            } else {\r\n                break;\r\n            }\r\n        }\r\n    }\r\n    if (bomb_amount >= 30) {\r\n        many_many_mines = true;\r\n        const amount_of_helpers = 6;\r\n        let counter = 0;\r\n        place_shield();\r\n        for (let i = 5; i < tiles.length; i++) {\r\n            if (counter < amount_of_helpers) {\r\n                if (\r\n                    document\r\n                        .getElementById(`tile_${i}`)\r\n                        .getAttribute('data-field') !== 'bomb'\r\n                ) {\r\n                    document.getElementById(`tile_${i}`).innerHTML = '⛳️';\r\n                    i += 15;\r\n                    counter++;\r\n                }\r\n            } else {\r\n                break;\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\nfunction place_shield() {\r\n    let shieldIsSet = false;\r\n    while (shieldIsSet === false) {\r\n        const randomNumb = parseInt(Math.random() * tiles.length + 1);\r\n        if (\r\n            document\r\n                .getElementById(`tile_${randomNumb}`)\r\n                .getAttribute('data-field') !== 'bomb'\r\n        ) {\r\n            document\r\n                .getElementById(`tile_${randomNumb}`)\r\n                .setAttribute('data-field', 'shield');\r\n            shieldIsSet = true;\r\n        }\r\n    }\r\n}\r\n\r\nfunction add_Bombs(bomb_amount) {\r\n    for (let i = 1; i <= bomb_amount; i++) {\r\n        const randomNumb = parseInt(Math.random() * tiles.length + 1);\r\n        const tileId = `tile_${randomNumb}`;\r\n        if (bomb_Map.includes(tileId)) {\r\n            i = i -= 1;\r\n        } else {\r\n            bomb_Map.push(tileId);\r\n            document.getElementById(tileId).setAttribute('data-field', 'bomb');\r\n        }\r\n    }\r\n}\r\n\r\nfunction random_tile_color() {\r\n    tiles.forEach((tile) => {\r\n        if (parseInt(Math.random() * 2) === 1) {\r\n            document.getElementById(tile.id).classList.add('tile1-2');\r\n        }\r\n    });\r\n}\r\n\r\nfunction helper_colorize_Bombs() {\r\n    for (let i = 0; i < bomb_Map.length; i++) {\r\n        const tileId = `${bomb_Map[i]}`;\r\n        document.getElementById(tileId).style.color = 'red';\r\n    }\r\n\r\n    for (let i = 1; i < tiles.length; i++) {\r\n        if (\r\n            document.getElementById(`tile_${i}`).getAttribute('data-field') ===\r\n            'shield'\r\n        ) {\r\n            document.getElementById(`tile_${i}`).style.color = 'blue';\r\n        }\r\n    }\r\n\r\n    for (let i = 1; i <= tiles.length; i++) {\r\n        const tileId = `${`tile_${i}`}`;\r\n        document.getElementById(tileId).innerHTML = i;\r\n    }\r\n}\r\n\r\n// Event Listener for Tiles click\r\ntiles.forEach((tile) => {\r\n    tile.addEventListener('click', () => {\r\n        const directions = [\r\n            'up',\r\n            'up_right',\r\n            'right',\r\n            'down_right',\r\n            'down',\r\n            'down_left',\r\n            'left',\r\n            'up_left',\r\n        ];\r\n        const tileId = tile.id;\r\n        if (\r\n            document.getElementById(tileId).getAttribute('data-status') !==\r\n            'checked'\r\n        ) {\r\n            document\r\n                .getElementById(tileId)\r\n                .setAttribute('data-status', 'checked');\r\n            checked_fields++;\r\n            document.getElementById(tileId).classList.add('scanning');\r\n            let bombCounter = 0;\r\n            setTimeout(() => {\r\n                for (let i = 0; i < directions.length; i++) {\r\n                    const direction = directions[i];\r\n                    const adjacentAttribute = getAdjacentTileAttribute(\r\n                        tileId,\r\n                        direction,\r\n                    );\r\n                    if (adjacentAttribute === 'bomb') {\r\n                        bombCounter++;\r\n                    } else if (\r\n                        adjacentAttribute !== false &&\r\n                        adjacentAttribute !== 'checked'\r\n                    ) {\r\n                        // Adds random secure marker\r\n                        if (\r\n                            document\r\n                                .getElementById(adjacentAttribute)\r\n                                .getAttribute('data-status') !== 'checked'\r\n                        ) {\r\n                            if (many_mines) {\r\n                                if (parseInt(Math.random() * 7) <= 2) {\r\n                                    document.getElementById(\r\n                                        adjacentAttribute,\r\n                                    ).innerHTML = '⛳️';\r\n                                }\r\n                            } else if (many_many_mines) {\r\n                                if (parseInt(Math.random() * 7) <= 3) {\r\n                                    document.getElementById(\r\n                                        adjacentAttribute,\r\n                                    ).innerHTML = '⛳️';\r\n                                }\r\n                            } else {\r\n                                if (parseInt(Math.random() * 7) === 1) {\r\n                                    document.getElementById(\r\n                                        adjacentAttribute,\r\n                                    ).innerHTML = '⛳️';\r\n                                }\r\n                            }\r\n                        }\r\n                    }\r\n\r\n                    if (\r\n                        document\r\n                            .getElementById(tileId)\r\n                            .getAttribute('data-field') === 'shield'\r\n                    ) {\r\n                        shield = true;\r\n                        lbl_shield.innerHTML = 'Schutzschild 🛡';\r\n                        lbl_shield.classList.add('active');\r\n                    }\r\n\r\n                    // if Bomb\r\n                    if (\r\n                        document\r\n                            .getElementById(tileId)\r\n                            .getAttribute('data-field') === 'bomb'\r\n                    ) {\r\n                        if (shield === true) {\r\n                            setTimeout(() => {\r\n                                document.getElementById(tileId).innerHTML = '🛡';\r\n                                document\r\n                                    .getElementById(tileId)\r\n                                    .classList.add('activate-shield');\r\n                            }, 1000);\r\n                            document.getElementById(tileId).innerHTML = '💥';\r\n                            lbl_shield.innerHTML = '';\r\n                            checked_fields--;\r\n                            lbl_mines_amount.innerHTML = `${checked_fields} / ${winner_Number} (${bomb_amount} Minen)`;\r\n                            shield = false;\r\n                            play_sound('explosion');\r\n                            break;\r\n                        } else {\r\n                            for (let i = 0; i < bomb_Map.length; i++) {\r\n                                const tileId = `${bomb_Map[i]}`;\r\n                                document.getElementById(tileId).innerHTML =\r\n                                    '💥';\r\n                                setTimeout(() => {\r\n                                    document\r\n                                        .getElementById(tileId)\r\n                                        .classList.add('boom');\r\n                                    play_sound('explosion');\r\n                                }, 600);\r\n                            }\r\n                            document\r\n                                .getElementById(tileId)\r\n                                .classList.add('boom');\r\n                            disable_Tiles();\r\n                            setTimeout(() => {\r\n                                document.getElementById(\r\n                                    'output_result',\r\n                                ).innerHTML = `Verloren 🥵`;\r\n                                document\r\n                                    .getElementById('result_window')\r\n                                    .classList.add('active');\r\n                            }, 3200);\r\n                            break;\r\n                        }\r\n                    }\r\n\r\n                    document.getElementById(tileId).innerHTML = bombCounter;\r\n                    document.getElementById(tileId).classList.add('digged');\r\n\r\n                    if (bombCounter === 0) {\r\n                        document.getElementById(tileId).style.color = 'white';\r\n                        play_sound('clear');\r\n                    } else if (bombCounter === 1) {\r\n                        document.getElementById(tileId).style.color = 'yellow';\r\n                        document.getElementById(tileId).style.textShadow =\r\n                            '0px 0px 5px black';\r\n                        play_sound('clear');\r\n                    } else {\r\n                        document.getElementById(tileId).style.color = 'yellow';\r\n                        document.getElementById(tileId).style.textShadow =\r\n                            '0px 0px 5px black';\r\n                            play_sound('clear')\r\n                    }\r\n\r\n                    // Gewonnen\r\n                    if (checked_fields === winner_Number) {\r\n                        document.getElementById(tileId).innerHTML = '0';\r\n                        for (let i = 0; i < bomb_Map.length; i++) {\r\n                            const tileId = `${bomb_Map[i]}`;\r\n                            document.getElementById(tileId).innerHTML = '💣';\r\n                        }\r\n                        disable_Tiles();\r\n                        setTimeout(() => {\r\n                            document.getElementById(\r\n                                'output_result',\r\n                            ).innerHTML = `Gewonnen 😀`;\r\n                            document\r\n                                .getElementById('result_window')\r\n                                .classList.add('active');\r\n                        }, 2200);\r\n                        break;\r\n                    }\r\n                }\r\n                document.getElementById(tileId).classList.remove('scanning');\r\n                lbl_mines_amount.innerHTML = `${checked_fields} / ${winner_Number} (${bomb_amount} Minen)`;\r\n            }, 1300);\r\n        }\r\n    });\r\n});\r\n\r\nfunction play_sound(event) {\r\n    if (event === 'explosion') {\r\n        document.getElementById('explosion').play(); // Abspielen\r\n        setTimeout(() => {\r\n            document.getElementById('explosion').pause(); // Pause\r\n        }, 300);\r\n    } else {\r\n        document.getElementById('clear').play(); // Abspielen\r\n        setTimeout(() => {\r\n            document.getElementById('clear').pause(); // Pause\r\n        }, 300);\r\n    }\r\n}\r\n\r\nfunction getAdjacentTileAttribute(tileId, direction) {\r\n    const row = Math.floor((parseInt(tileId.split('_')[1]) - 1) / 9) + 1;\r\n    const column = ((parseInt(tileId.split('_')[1]) - 1) % 9) + 1;\r\n\r\n    let adjacentRow = row;\r\n    let adjacentColumn = column;\r\n\r\n    if (direction === 'up') {\r\n        adjacentRow = row - 1;\r\n    } else if (direction === 'down') {\r\n        adjacentRow = row + 1;\r\n    } else if (direction === 'left') {\r\n        adjacentColumn = column - 1;\r\n    } else if (direction === 'right') {\r\n        adjacentColumn = column + 1;\r\n    } else if (direction === 'up_left') {\r\n        adjacentColumn = column - 1;\r\n        adjacentRow = row - 1;\r\n    } else if (direction === 'down_left') {\r\n        adjacentColumn = column - 1;\r\n        adjacentRow = row + 1;\r\n    } else if (direction === 'up_right') {\r\n        adjacentRow = row - 1;\r\n        adjacentColumn = column + 1;\r\n    } else if (direction === 'down_right') {\r\n        adjacentRow = row + 1;\r\n        adjacentColumn = column + 1;\r\n    }\r\n\r\n    if (\r\n        adjacentRow >= 1 &&\r\n        adjacentRow <= 10 &&\r\n        adjacentColumn >= 1 &&\r\n        adjacentColumn <= 9\r\n    ) {\r\n        const adjacentTileId =\r\n            'tile_' + ((adjacentRow - 1) * 9 + adjacentColumn);\r\n        const adjacentTile = document.getElementById(adjacentTileId);\r\n        if (adjacentTile.getAttribute('data-field') === 'bomb') {\r\n            return adjacentTile.getAttribute('data-field');\r\n        } else {\r\n            return adjacentTileId;\r\n        }\r\n    } else {\r\n        return false;\r\n    }\r\n}\r\n\r\nfunction disable_Tiles() {\r\n    tiles.forEach((tile) => {\r\n        document.getElementById(tile.id).setAttribute('data-status', 'checked');\r\n    });\r\n}\r\n\r\nbtn_restart.addEventListener('click', () => {\r\n    window.location.reload();\r\n});\r\n\n\n//# sourceURL=webpack://project-template/./src/js/script.js?");

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