const tiles = document.querySelectorAll('.tile');
const min_bombs = 7;
const max_bombs = 14;
const bomb_amount = Math.floor(Math.random() * max_bombs) + min_bombs;
let bomb_Map = [];
let checked_fields = 0;
const winner_Number = tiles.length - bomb_amount
const btn_restart = document.getElementById("btn_restart");
const lbl_mines_amount = document.getElementById("lbl_mines_amount");
const lbl_shield = document.getElementById("lbl_shield");
let many_mines = false;
let shield = false;


window.onload = () => {
    lbl_mines_amount.innerHTML = `${bomb_amount} Minen`
    add_Bombs(bomb_amount);
    random_tile_color();
    first_hints();
    helper_colorize_Bombs()
}

// Discover 4 fields, that are minefree
function first_hints() {
    if (bomb_amount >= 15) {
        many_mines = true;
        const amount_of_helpers = 4
        let counter = 0;
        place_shield();
        for (let i = 5; i < tiles.length; i++) {
            if (counter < amount_of_helpers) {
                if (document.getElementById(`tile_${i}`).getAttribute("data-field") !== 'bomb') {
                    document.getElementById(`tile_${i}`).innerHTML = '⛳️';
                    i += 15
                    counter++;
                }
            } else {
                break
            }
        }
    }
}

function place_shield() {
    let shieldIsSet = false;
    while (shieldIsSet === false) {
        const randomNumb = parseInt(Math.random() * tiles.length + 1);
        if (document.getElementById(`tile_${randomNumb}`).getAttribute("data-field") !== 'bomb') {
            document.getElementById(`tile_${randomNumb}`).setAttribute("data-field", "shield")
            shieldIsSet = true;
        }
    }
}

function add_Bombs(bomb_amount) {
    for (let i = 1; i <= bomb_amount; i++) {
        const randomNumb = parseInt(Math.random() * tiles.length + 1);
        const tileId = `tile_${randomNumb}`;
        if (bomb_Map.includes(tileId)) {
            i = i -= 1;
        } else {
            bomb_Map.push(tileId);
            document.getElementById(tileId).setAttribute("data-field", "bomb")
        }
    }
}

function random_tile_color() {
    tiles.forEach((tile) => {
        if (parseInt(Math.random() * 2) === 1) {
            document.getElementById(tile.id).classList.add("tile1-2")
        }
    })
}


function helper_colorize_Bombs() {
    for (let i = 0; i < bomb_Map.length; i++) {
        const tileId = `${bomb_Map[i]}`;
        document.getElementById(tileId).style.color = 'red'
    }

    for (let i = 1; i < tiles.length; i++) {
        if (document.getElementById(`tile_${i}`).getAttribute('data-field') === 'shield') {
            document.getElementById(`tile_${i}`).style.color = 'blue'
        }
    }

    for (let i = 1; i <= tiles.length; i++) {
        const tileId = `${`tile_${i}`}`;
        document.getElementById(tileId).innerHTML = i
    }
}

// Event Listener for Tiles click
tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
        const directions = ['up', 'up_right', 'right', 'down_right', 'down', 'down_left', 'left', 'up_left']
        const tileId = tile.id;
        if (document.getElementById(tileId).getAttribute("data-status") !== 'checked') {
            document.getElementById(tileId).setAttribute("data-status", "checked");
            checked_fields++;
            console.log(`${checked_fields}/${winner_Number}`);
            document.getElementById(tileId).classList.add("scanning")
            let bombCounter = 0;
            setTimeout(() => {
                for (let i = 0; i < directions.length; i++) {
                    const direction = directions[i];
                    const adjacentAttribute = getAdjacentTileAttribute(tileId, direction);
                    if (adjacentAttribute === 'bomb') {
                        bombCounter++;
                    } else if (adjacentAttribute !== false && adjacentAttribute !== 'checked') {

                        // Adds random secure marker 
                        if (document.getElementById(adjacentAttribute).getAttribute("data-status") !== 'checked') {
                            if (many_mines) {
                                if (parseInt(Math.random() * 7) <= 2) {
                                    document.getElementById(adjacentAttribute).innerHTML = '⛳️'
                                }
                            } else {
                                if (parseInt(Math.random() * 7) === 1) {
                                    document.getElementById(adjacentAttribute).innerHTML = '⛳️'
                                }
                            }
                        }
                    }

                    if (document.getElementById(tileId).getAttribute("data-field") === 'shield') {
                        shield = true;
                        lbl_shield.innerHTML = '🛡';
                        lbl_shield.classList.add('active')
                    }

                    // if Bomb
                    if (document.getElementById(tileId).getAttribute("data-field") === 'bomb') {
                        if (shield === true) {
                            setTimeout(() => {
                                document.getElementById(tileId).innerHTML = '🛡';
                                document.getElementById(tileId).classList.add("activate-shield")
                            }, 1000);
                            document.getElementById(tileId).innerHTML = '💥';
                            lbl_shield.innerHTML = '';
                            checked_fields--;
                            shield = false;
                            break
                        } else {
                            for (let i = 0; i < bomb_Map.length; i++) {
                                const tileId = `${bomb_Map[i]}`;
                                document.getElementById(tileId).innerHTML = '💥';
                                setTimeout(() => {
                                    document.getElementById(tileId).classList.add("boom");
                                }, 600);

                            }
                            document.getElementById(tileId).classList.add("boom");
                            disable_Tiles()
                            setTimeout(() => {
                                document.getElementById("output_result").innerHTML = `Verloren 🥵 </br> </br> ${bomb_amount} Minen sind explodiert`;
                                document.getElementById("result_window").classList.add("active");
                            }, 3200);
                            break
                        }
                    }

                    document.getElementById(tileId).innerHTML = bombCounter;
                    document.getElementById(tileId).classList.add("digged")

                    if (bombCounter === 0) {
                        document.getElementById(tileId).style.color = 'white'
                    } else if (bombCounter === 1) {
                        document.getElementById(tileId).style.color = 'yellow'
                        document.getElementById(tileId).style.textShadow = '0px 0px 5px black'
                    } else {
                        document.getElementById(tileId).style.color = 'yellow'
                        document.getElementById(tileId).style.textShadow = '0px 0px 5px black'
                    }

                    // Gewonnen
                    if (checked_fields === winner_Number) {
                        document.getElementById(tileId).innerHTML = '0'
                        for (let i = 0; i < bomb_Map.length; i++) {
                            const tileId = `${bomb_Map[i]}`;
                            document.getElementById(tileId).innerHTML = '💣'
                        }
                        disable_Tiles()
                        setTimeout(() => {
                            document.getElementById("output_result").innerHTML = `Gewonnen 😀 </br> </br> Du hast alle ${bomb_amount} Minen gesichert`;
                            document.getElementById("result_window").classList.add("active");
                        }, 2200);
                        break
                    }
                }
                document.getElementById(tileId).classList.remove("scanning")
            }, 1300);
        }
    })
})

function getAdjacentTileAttribute(tileId, direction) {
    const row = Math.floor((parseInt(tileId.split("_")[1]) - 1) / 9) + 1;
    const column = (parseInt(tileId.split("_")[1]) - 1) % 9 + 1;

    let adjacentRow = row;
    let adjacentColumn = column;

    if (direction === "up") {
        adjacentRow = row - 1;
    } else if (direction === "down") {
        adjacentRow = row + 1;
    } else if (direction === "left") {
        adjacentColumn = column - 1;
    } else if (direction === "right") {
        adjacentColumn = column + 1;
    } else if (direction === "up_left") {
        adjacentColumn = column - 1;
        adjacentRow = row - 1;
    } else if (direction === "down_left") {
        adjacentColumn = column - 1;
        adjacentRow = row + 1;
    } else if (direction === "up_right") {
        adjacentRow = row - 1;
        adjacentColumn = column + 1;
    } else if (direction === "down_right") {
        adjacentRow = row + 1;
        adjacentColumn = column + 1;
    }

    if (
        adjacentRow >= 1 && adjacentRow <= 10 &&
        adjacentColumn >= 1 && adjacentColumn <= 9
    ) {
        const adjacentTileId = "tile_" + ((adjacentRow - 1) * 9 + adjacentColumn);
        const adjacentTile = document.getElementById(adjacentTileId);
        if (adjacentTile.getAttribute("data-field") === "bomb") {
            return adjacentTile.getAttribute("data-field")
        } else {
            return adjacentTileId
        }
    } else {
        return false;
    }
}




function disable_Tiles() {
    tiles.forEach((tile) => {
        document.getElementById(tile.id).setAttribute("data-status", "checked");
    })
}


btn_restart.addEventListener("click", () => {
    window.location.reload();
})