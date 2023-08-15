const tiles = document.querySelectorAll('.tile');
let bomb_Map = [];


window.onload = ()=> {
    add_Bombs();
    helper_colorize_Bombs()
}


function add_Bombs() {
    for(let i = 1; i <= 6; i++) {
        const randomNumb = parseInt(Math.random() * tiles.length + 1);
        const tileId = `tile_${randomNumb}`
        if(bomb_Map.includes(tileId)) {
            i = i -= 1;
        }else {
            bomb_Map.push(tileId)
        }
    }

    console.log(bomb_Map);

    if(bomb_Map.includes("tile_61")) {
        console.warn("ALERT")
    }
}

function helper_colorize_Bombs() {
    for(let i = 0; i < bomb_Map.length; i++) {
        const tileId = `${bomb_Map[i]}`;
        document.getElementById(tileId).style.backgroundColor = 'red'
        console.log(tileId);
    }
}

// Event Listener for Tiles click

    tiles.forEach((tile) => {
        tile.addEventListener("click", ()=> {
            console.log(tile.id);
        })
    })



