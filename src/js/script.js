const tiles = document.querySelectorAll('.tile');
let bomb_Map = [];


window.onload = () => {
    add_Bombs();
    //helper_colorize_Bombs()
}


function add_Bombs() {
    for (let i = 1; i <= 6; i++) {
        const randomNumb = parseInt(Math.random() * tiles.length + 1);
        const tileId = `tile_${randomNumb}`
        if (bomb_Map.includes(tileId)) {
            i = i -= 1;
        } else {
            bomb_Map.push(tileId);
            document.getElementById(tileId).setAttribute("data-field", "bomb")
        }
    }
    console.log(bomb_Map);
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
        console.log('clicked: ', tile.id);
        const directions = ['up', 'up_right','right','down_right','down','down_left','left','up_left']
        const tileId = tile.id; // Beispiel-ID
        let bombCounter = 0;
        for(let i = 0; i < directions.length; i++) {
            const direction = directions[i];
            const adjacentAttribute = getAdjacentTileAttribute(tileId, direction);
            if(adjacentAttribute === 'bomb') {
                bombCounter++;
            }
            console.log('adjacentAttribute', adjacentAttribute);
            console.log('bombCounter', bombCounter);
            if(document.getElementById(tileId).getAttribute("data-field") === 'bomb') {
                console.warn("Booommm")
                alert("Booooom \n Game Over")
                for (let i = 0; i < bomb_Map.length; i++) {
                    const tileId = `${bomb_Map[i]}`;
                    document.getElementById(tileId).style.backgroundColor = 'red'
                }
                break
            }
            document.getElementById(tileId).innerHTML = bombCounter
        }
    })
})



function getAdjacentTileAttribute(tileId, direction) {
    const row = Math.floor((parseInt(tileId.split("_")[1]) - 1) / 4) + 1;
    const column = (parseInt(tileId.split("_")[1]) - 1) % 4 + 1;

    let adjacentRow = row;
    let adjacentColumn = column;

    console.log('Bin in func', direction);

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
       // console.log('adjacentTile', adjacentTile);
        return adjacentTile.getAttribute("data-field");
    } else {
        console.log('Gibt es nicht');
        return false;
    }
}



