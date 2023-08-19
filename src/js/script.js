const tiles = document.querySelectorAll('.tile');
const min_bombs = 4;
const max_bombs = 10;
const bomb_amount = Math.floor(Math.random() * max_bombs) + min_bombs;
let bomb_Map = [];
let checked_fields = 0;
const winner_Number = tiles.length - bomb_amount
const btn_restart = document.getElementById("btn_restart");

window.onload = () => {
    add_Bombs(bomb_amount);
   //helper_colorize_Bombs()
}

function add_Bombs(bomb_amount) {
    for (let i = 1; i <= bomb_amount; i++) {
        const randomNumb = parseInt(Math.random() * tiles.length + 1);
        const tileId = `tile_${randomNumb}`
        if (bomb_Map.includes(tileId)) {
            i = i -= 1;
        } else {
            bomb_Map.push(tileId);
            document.getElementById(tileId).setAttribute("data-field", "bomb")
        }
    }
}

function helper_colorize_Bombs() {
    for (let i = 0; i < bomb_Map.length; i++) {
        const tileId = `${bomb_Map[i]}`;
        document.getElementById(tileId).style.backgroundColor = 'red'
    }

    // for (let i = 1; i <= tiles.length; i++) {
    //     const tileId = `${`tile_${i}`}`;
    //     document.getElementById(tileId).innerHTML = i
    // }
}

// Event Listener for Tiles click
tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
        const directions = ['up', 'up_right', 'right', 'down_right', 'down', 'down_left', 'left', 'up_left']
        const tileId = tile.id;
        if (document.getElementById(tileId).getAttribute("data-status") !== 'checked') {
            document.getElementById(tileId).setAttribute("data-status", "checked");
            checked_fields++;
            document.getElementById(tileId).classList.add("scanning")
            let bombCounter = 0;
            setTimeout(() => {
                for (let i = 0; i < directions.length; i++) {
                    const direction = directions[i];
                    const adjacentAttribute = getAdjacentTileAttribute(tileId, direction);
                    if (adjacentAttribute === 'bomb') {
                        bombCounter++;
                    }

                    if (document.getElementById(tileId).getAttribute("data-field") === 'bomb') {
                        for (let i = 0; i < bomb_Map.length; i++) {
                            const tileId = `${bomb_Map[i]}`;
                            document.getElementById(tileId).innerHTML = '💥';
                        }
                        document.getElementById(tileId).classList.add ("boom");
                        disable_Tiles() 
                        setTimeout(() => {
                            document.getElementById("output_result").innerHTML = "Verloren 🥵";
                            document.getElementById("result_window").classList.add("active");
                        }, 2000);
                        break
                      
                    }
                    document.getElementById(tileId).innerHTML = bombCounter;
                    document.getElementById(tileId).style.backgroundColor = '#4a2b16'
                    if (bombCounter === 0) {
                        document.getElementById(tileId).style.color = 'grey'
                        if(parseInt(Math.random() * 2) === 1) {
                            document.getElementById(tileId).style.backgroundColor = 'rgb(73 45 21 / 93%)'
                        }else {
                            document.getElementById(tileId).style.backgroundColor = 'rgba(62, 38, 17, 0.93)'
                        }
                    } else if (bombCounter === 1) {
                        document.getElementById(tileId).style.color = 'yellow'
                        document.getElementById(tileId).style.backgroundColor = 'rgb(105 67 41)'
                    } else {
                        document.getElementById(tileId).style.color = 'orange'
                    }
                    

                    if (checked_fields === winner_Number) {
                        document.getElementById(tileId).innerHTML = '0'
                        for (let i = 0; i < bomb_Map.length; i++) {
                            const tileId = `${bomb_Map[i]}`;
                            document.getElementById(tileId).innerHTML = '💣'
                        }
                        disable_Tiles() 
                        setTimeout(() => {
                            document.getElementById("output_result").innerHTML = "Gewonnen 😀";
                            document.getElementById("result_window").classList.add("active");
                        }, 2000);
                        break
                    }
                }
                document.getElementById(tileId).classList.remove("scanning")
            }, 1300);
           
        }
    })
})

function getAdjacentTileAttribute(tileId, direction) {
    const row = Math.floor((parseInt(tileId.split("_")[1]) - 1) / 4) + 1;
    const column = (parseInt(tileId.split("_")[1]) - 1) % 4 + 1;

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
        adjacentRow >= 1 && adjacentRow <= 15 &&
        adjacentColumn >= 1 && adjacentColumn <= 4
    ) {
        const adjacentTileId = "tile_" + ((adjacentRow - 1) * 4 + adjacentColumn);
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


btn_restart.addEventListener("click", ()=> {
    window.location.reload();
})