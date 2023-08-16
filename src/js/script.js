const tiles = document.querySelectorAll('.tile');
let bomb_Map = [];
const bomb_amount = 4;
let checked_fields = 0;


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
        let bombCounter = 0;
        let checked_fields = [];
        for (let i = 0; i < directions.length; i++) {
            const direction = directions[i];
            const adjacentAttribute = getAdjacentTileAttribute(tileId, direction);
            if (adjacentAttribute === 'bomb') {
                bombCounter++;
            }

            if (document.getElementById(tileId).getAttribute("data-field") === 'bomb') {
                alert("Booooom \n Game Over")
                for (let i = 0; i < bomb_Map.length; i++) {
                    const tileId = `${bomb_Map[i]}`;
                    document.getElementById(tileId).style.backgroundColor = 'red'
                }
                break
            }
            document.getElementById(tileId).innerHTML = bombCounter;
            if (bombCounter === 0) {
                document.getElementById(tileId).style.backgroundColor = 'green'
            } else if (bombCounter === 1) {
                document.getElementById(tileId).style.backgroundColor = 'yellow'
            } else {
                document.getElementById(tileId).style.backgroundColor = 'orange'
            }
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
        return adjacentTile.getAttribute("data-field");
    } else {
        return false;
    }
}



