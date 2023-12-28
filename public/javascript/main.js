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

eval("const tiles = document.querySelectorAll('.tile');\nlet min_bombs = 7;\nlet max_bombs = 40;\nlet bomb_amount = Math.floor(Math.random() * max_bombs) + min_bombs;\nlet bomb_Map = [];\nlet checked_fields = 0;\nconst winner_Number = tiles.length - bomb_amount;\nconst btn_restart = document.getElementById('btn_restart');\nconst lbl_mines_amount = document.getElementById('lbl_mines_amount');\nconst lbl_shield = document.getElementById('lbl_shield');\nconst inp_difficult = document.getElementById('inp_difficult');\nconst lbl_difficult = document.getElementById('lbl_difficult');\nlet many_mines = false;\nlet many_many_mines = false;\nlet shield = false;\nlet difficulty = 0;\n\nlet save_Object = {\n    difficulty: 0\n}\n\nconst difficult_struct = [\"leicht\", \"mittel\", \"schwer\"];\n\nwindow.onload = () => {\n    load_from_localStorage();\n    lbl_mines_amount.innerHTML = `${bomb_amount} Minen`;\n    add_Bombs(bomb_amount);\n    random_tile_color();\n    first_hints();\n    //helper_colorize_Bombs();\n};\n\nfunction load_from_localStorage() {\n    if (localStorage.getItem('stored_Minsweeper_Saveobj') !== '') {\n        try {\n            save_Object = JSON.parse(localStorage.getItem('stored_Minsweeper_Saveobj'));\n            difficulty = save_Object.difficulty;\n            lbl_difficult.innerHTML = difficult_struct[difficulty];\n            inp_difficult.value = difficulty;\n            set_game_difficulty();\n        } catch (error) {\n            //console.log(error);\n            save_Object = {\n                difficulty: 0\n            }\n            difficulty = 0;\n            lbl_difficult.innerHTML = difficult_struct[difficulty];\n            inp_difficult.value = difficulty;\n            save_into_storage();\n            set_game_difficulty();\n        }\n    }\n}\n\nfunction set_game_difficulty() {\n    if(difficulty === '0') {\n        min_bombs = 3;\n        max_bombs = 15;\n        bomb_amount = Math.floor(Math.random() * max_bombs) + min_bombs;\n    }\n\n    if(difficulty === '1') {\n        min_bombs = 15;\n        max_bombs = 20;\n        bomb_amount = Math.floor(Math.random() * max_bombs) + min_bombs;\n    }\n\n    if(difficulty === '2') {\n        min_bombs = 20;\n        max_bombs = 45;\n        bomb_amount = Math.floor(Math.random() * max_bombs) + min_bombs;\n    }\n}\n\nfunction save_into_storage() {\n    localStorage.setItem('stored_Minsweeper_Saveobj', JSON.stringify(save_Object));\n}\n\n// Discover 4 fields, that are minefree\nfunction first_hints() {\n    if (bomb_amount >= 15 && bomb_amount < 30) {\n        many_mines = true;\n        const amount_of_helpers = 4;\n        let counter = 0;\n        place_shield();\n        for (let i = 5; i < tiles.length; i++) {\n            if (counter < amount_of_helpers) {\n                if (\n                    document\n                        .getElementById(`tile_${i}`)\n                        .getAttribute('data-field') !== 'bomb'\n                ) {\n                    document.getElementById(`tile_${i}`).innerHTML = '⛳️';\n                    i += 15;\n                    counter++;\n                }\n            } else {\n                break;\n            }\n        }\n    }\n    if (bomb_amount >= 30) {\n        many_many_mines = true;\n        const amount_of_helpers = 6;\n        let counter = 0;\n        place_shield();\n        for (let i = 5; i < tiles.length; i++) {\n            if (counter < amount_of_helpers) {\n                if (\n                    document\n                        .getElementById(`tile_${i}`)\n                        .getAttribute('data-field') !== 'bomb'\n                ) {\n                    document.getElementById(`tile_${i}`).innerHTML = '⛳️';\n                    i += 15;\n                    counter++;\n                }\n            } else {\n                break;\n            }\n        }\n    }\n}\n\nfunction place_shield() {\n    let shieldIsSet = false;\n    while (shieldIsSet === false) {\n        const randomNumb = parseInt(Math.random() * tiles.length + 1);\n        if (\n            document\n                .getElementById(`tile_${randomNumb}`)\n                .getAttribute('data-field') !== 'bomb'\n        ) {\n            document\n                .getElementById(`tile_${randomNumb}`)\n                .setAttribute('data-field', 'shield');\n            shieldIsSet = true;\n        }\n    }\n}\n\nfunction add_Bombs(bomb_amount) {\n    for (let i = 1; i <= bomb_amount; i++) {\n        const randomNumb = parseInt(Math.random() * tiles.length + 1);\n        const tileId = `tile_${randomNumb}`;\n        if (bomb_Map.includes(tileId)) {\n            i = i -= 1;\n        } else {\n            bomb_Map.push(tileId);\n            document.getElementById(tileId).setAttribute('data-field', 'bomb');\n        }\n    }\n}\n\nfunction random_tile_color() {\n    tiles.forEach((tile) => {\n        if (parseInt(Math.random() * 2) === 1) {\n            document.getElementById(tile.id).classList.add('tile1-2');\n        }\n    });\n}\n\nfunction helper_colorize_Bombs() {\n    for (let i = 0; i < bomb_Map.length; i++) {\n        const tileId = `${bomb_Map[i]}`;\n        document.getElementById(tileId).style.color = 'red';\n    }\n\n    for (let i = 1; i < tiles.length; i++) {\n        if (\n            document.getElementById(`tile_${i}`).getAttribute('data-field') ===\n            'shield'\n        ) {\n            document.getElementById(`tile_${i}`).style.color = 'blue';\n        }\n    }\n\n    for (let i = 1; i <= tiles.length; i++) {\n        const tileId = `${`tile_${i}`}`;\n        document.getElementById(tileId).innerHTML = i;\n    }\n}\n\n// Event Listener for Tiles click\ntiles.forEach((tile) => {\n    tile.addEventListener('click', () => {\n        const directions = [\n            'up',\n            'up_right',\n            'right',\n            'down_right',\n            'down',\n            'down_left',\n            'left',\n            'up_left',\n        ];\n        const tileId = tile.id;\n        if (\n            document.getElementById(tileId).getAttribute('data-status') !==\n            'checked'\n        ) {\n            document\n                .getElementById(tileId)\n                .setAttribute('data-status', 'checked');\n            checked_fields++;\n            document.getElementById(tileId).classList.add('scanning');\n            let bombCounter = 0;\n            setTimeout(() => {\n                for (let i = 0; i < directions.length; i++) {\n                    const direction = directions[i];\n                    const adjacentAttribute = getAdjacentTileAttribute(\n                        tileId,\n                        direction,\n                    );\n                    if (adjacentAttribute === 'bomb') {\n                        bombCounter++;\n                    } else if (\n                        adjacentAttribute !== false &&\n                        adjacentAttribute !== 'checked'\n                    ) {\n                        // Adds random secure marker\n                        if (\n                            document\n                                .getElementById(adjacentAttribute)\n                                .getAttribute('data-status') !== 'checked'\n                        ) {\n                            if (many_mines) {\n                                if (parseInt(Math.random() * 7) <= 2) {\n                                    document.getElementById(\n                                        adjacentAttribute,\n                                    ).innerHTML = '⛳️';\n                                }\n                            } else if (many_many_mines) {\n                                if (parseInt(Math.random() * 7) <= 3) {\n                                    document.getElementById(\n                                        adjacentAttribute,\n                                    ).innerHTML = '⛳️';\n                                }\n                            } else {\n                                if (parseInt(Math.random() * 7) === 1) {\n                                    document.getElementById(\n                                        adjacentAttribute,\n                                    ).innerHTML = '⛳️';\n                                }\n                            }\n                        }\n                    }\n\n                    if (\n                        document\n                            .getElementById(tileId)\n                            .getAttribute('data-field') === 'shield'\n                    ) {\n                        shield = true;\n                        lbl_shield.innerHTML = 'Schutzschild 🛡';\n                        lbl_shield.classList.add('active');\n                    }\n\n                    // if Bomb\n                    if (\n                        document\n                            .getElementById(tileId)\n                            .getAttribute('data-field') === 'bomb'\n                    ) {\n                        if (shield === true) {\n                            setTimeout(() => {\n                                document.getElementById(tileId).innerHTML = '🛡';\n                                document\n                                    .getElementById(tileId)\n                                    .classList.add('activate-shield');\n                            }, 1000);\n                            document.getElementById(tileId).innerHTML = '💥';\n                            lbl_shield.innerHTML = '';\n                            checked_fields--;\n                            lbl_mines_amount.innerHTML = `${checked_fields} / ${winner_Number} (${bomb_amount} Minen)`;\n                            shield = false;\n                            play_sound('explosion');\n                            break;\n                        } else {\n                            for (let i = 0; i < bomb_Map.length; i++) {\n                                const tileId = `${bomb_Map[i]}`;\n                                document.getElementById(tileId).innerHTML =\n                                    '💥';\n                                setTimeout(() => {\n                                    document\n                                        .getElementById(tileId)\n                                        .classList.add('boom');\n                                    play_sound('explosion');\n                                }, 600);\n                            }\n                            document\n                                .getElementById(tileId)\n                                .classList.add('boom');\n                            disable_Tiles();\n                            setTimeout(() => {\n                                document.getElementById(\n                                    'output_result',\n                                ).innerHTML = `Verloren 🥵`;\n                                document\n                                    .getElementById('result_window')\n                                    .classList.add('active');\n                            }, 3200);\n                            break;\n                        }\n                    }\n\n                    document.getElementById(tileId).innerHTML = bombCounter;\n                    document.getElementById(tileId).classList.add('digged');\n\n                    if (bombCounter === 0) {\n                        document.getElementById(tileId).style.color = 'white';\n                        play_sound('clear');\n                    } else if (bombCounter === 1) {\n                        document.getElementById(tileId).style.color = 'yellow';\n                        document.getElementById(tileId).style.textShadow =\n                            '0px 0px 5px black';\n                        play_sound('clear');\n                    } else {\n                        document.getElementById(tileId).style.color = 'yellow';\n                        document.getElementById(tileId).style.textShadow =\n                            '0px 0px 5px black';\n                            play_sound('clear')\n                    }\n\n                    // Gewonnen\n                    if (checked_fields === winner_Number) {\n                        document.getElementById(tileId).innerHTML = '0';\n                        for (let i = 0; i < bomb_Map.length; i++) {\n                            const tileId = `${bomb_Map[i]}`;\n                            document.getElementById(tileId).innerHTML = '💣';\n                        }\n                        disable_Tiles();\n                        setTimeout(() => {\n                            document.getElementById(\n                                'output_result',\n                            ).innerHTML = `Gewonnen 😀`;\n                            document\n                                .getElementById('result_window')\n                                .classList.add('active');\n                        }, 2200);\n                        break;\n                    }\n                }\n                document.getElementById(tileId).classList.remove('scanning');\n                lbl_mines_amount.innerHTML = `${checked_fields} / ${winner_Number} (${bomb_amount} Minen)`;\n            }, 1300);\n        }\n    });\n});\n\nfunction play_sound(event) {\n    if (event === 'explosion') {\n        document.getElementById('explosion').play(); // Abspielen\n        setTimeout(() => {\n            document.getElementById('explosion').pause(); // Pause\n        }, 300);\n    } else {\n        document.getElementById('clear').play(); // Abspielen\n        setTimeout(() => {\n            document.getElementById('clear').pause(); // Pause\n        }, 300);\n    }\n}\n\nfunction getAdjacentTileAttribute(tileId, direction) {\n    const row = Math.floor((parseInt(tileId.split('_')[1]) - 1) / 9) + 1;\n    const column = ((parseInt(tileId.split('_')[1]) - 1) % 9) + 1;\n\n    let adjacentRow = row;\n    let adjacentColumn = column;\n\n    if (direction === 'up') {\n        adjacentRow = row - 1;\n    } else if (direction === 'down') {\n        adjacentRow = row + 1;\n    } else if (direction === 'left') {\n        adjacentColumn = column - 1;\n    } else if (direction === 'right') {\n        adjacentColumn = column + 1;\n    } else if (direction === 'up_left') {\n        adjacentColumn = column - 1;\n        adjacentRow = row - 1;\n    } else if (direction === 'down_left') {\n        adjacentColumn = column - 1;\n        adjacentRow = row + 1;\n    } else if (direction === 'up_right') {\n        adjacentRow = row - 1;\n        adjacentColumn = column + 1;\n    } else if (direction === 'down_right') {\n        adjacentRow = row + 1;\n        adjacentColumn = column + 1;\n    }\n\n    if (\n        adjacentRow >= 1 &&\n        adjacentRow <= 10 &&\n        adjacentColumn >= 1 &&\n        adjacentColumn <= 9\n    ) {\n        const adjacentTileId =\n            'tile_' + ((adjacentRow - 1) * 9 + adjacentColumn);\n        const adjacentTile = document.getElementById(adjacentTileId);\n        if (adjacentTile.getAttribute('data-field') === 'bomb') {\n            return adjacentTile.getAttribute('data-field');\n        } else {\n            return adjacentTileId;\n        }\n    } else {\n        return false;\n    }\n}\n\nfunction disable_Tiles() {\n    tiles.forEach((tile) => {\n        document.getElementById(tile.id).setAttribute('data-status', 'checked');\n    });\n}\n\nbtn_restart.addEventListener('click', () => {\n    window.location.reload();\n});\n\n\n//* Change difficulty\ninp_difficult.addEventListener('input', ()=> {\n    difficulty = inp_difficult.value;\n    lbl_difficult.innerHTML = difficult_struct[difficulty];\n    // Save\n    save_Object.difficulty = difficulty;\n    save_into_storage();\n    window.location.reload();\n})\n\n//# sourceURL=webpack://project-template/./src/js/script.js?");

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