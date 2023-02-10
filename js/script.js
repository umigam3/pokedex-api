let dataArray = [];

const getData = () => fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(data => {
        createMainTable();
        data.results.forEach(singleObject => {
            getPokemonData(singleObject)
        });
    })
    .catch(err => {
        console.error("Request Failed", err);
    })

function getPokemonData(pokemon) {
    let url = pokemon.url;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        //dataArray.push(data);
        addElement(data);
    })
}

function createMainTable() {

    let content = document.querySelector(".content");
    
    let mainTable = document.createElement("table");
    mainTable.classList.add("mainTable");
    content.appendChild(mainTable);

    let headerTr = document.createElement("tr");
    headerTr.classList.add("headerTr");
    mainTable.appendChild(headerTr);
    
    tableHeaders = ["Sprite","#", "Name", "Type", "HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];

    tableHeaders.forEach(header => {
        let th = document.createElement("th");
        th.innerHTML = header;
        headerTr.appendChild(th);
    });

}

function addElement(pokemon) {
    let tableBody = document.querySelector(".mainTable");

    let dataRow = document.createElement("tr");
    dataRow.classList.add("dataRow");
    tableBody.appendChild(dataRow);

    // Data Structure
    pokemonData = [pokemon.id, pokemon.name, pokemon.types[0].type.name, pokemon.stats[0].base_stat, pokemon.stats[1].base_stat, pokemon.stats[2].base_stat, pokemon.stats[3].base_stat,
        pokemon.stats[4].base_stat,pokemon.stats[5].base_stat];

    let td = document.createElement("td");
    td.appendChild(document.createElement('img')).src = pokemon.sprites.versions['generation-vii']['icons'].front_default;
    dataRow.appendChild(td);

    pokemonData.forEach(attribute => {
        let td = document.createElement("td");
        td.innerHTML = attribute;
        dataRow.appendChild(td);
    })
}

window.onload = function() {
    getData();
}
   