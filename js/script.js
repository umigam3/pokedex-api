const getData = () => fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(data => {
        createMainTable();
        data.results.sort((a, b) => a.id < b.id ? -1 : a.id === b.id ? 0 : 1);
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
    
    tableHeaders = ["#", "Sprite", "Name", "Type", "Total", "HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];

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

    td = document.createElement("td");
    let idFormatted = formatNumber(pokemon.id, 4);
    td.innerHTML = idFormatted;
    dataRow.appendChild(td);
    
    td = document.createElement("td");
    td.appendChild(document.createElement('img')).src = pokemon.sprites.versions['generation-vii']['icons'].front_default;
    dataRow.appendChild(td);
    
    td = document.createElement("td");
    let nameFormatted = capitalizeString(pokemon.name);
    td.innerHTML = nameFormatted;
    dataRow.appendChild(td);
    
    td = document.createElement("td");
    td.innerHTML = pokemon.types[0].type.name;
    dataRow.appendChild(td);

    let totalStats = pokemon.stats[0].base_stat + pokemon.stats[1].base_stat + 
        pokemon.stats[2].base_stat + pokemon.stats[3].base_stat +
        pokemon.stats[4].base_stat + pokemon.stats[5].base_stat

    pokemonStats = [totalStats, pokemon.stats[0].base_stat, pokemon.stats[1].base_stat, pokemon.stats[2].base_stat, pokemon.stats[3].base_stat,
        pokemon.stats[4].base_stat,pokemon.stats[5].base_stat];

    pokemonStats.forEach(stat => {
        let td = document.createElement("td");
        td.innerHTML = stat;
        dataRow.appendChild(td);
    })
}

function formatNumber(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    num = "#" + num;
    return num;
}

function capitalizeString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

window.onload = function() {
    getData();
}
   