const getKantoPokemon = () => fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(data => {
        data.results.forEach(pokemon => {
            getPokemonData(pokemon)
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
        console.log(data);
    })
}

const pokemonDiv = document.querySelector("div.pokemon-table");

let tableHeaders = ["Sprite", "Name", "Primary Type", "Secondary Type"]

const createPokemonTable = () => {

    let pokemonTable = document.createElement('table');
    pokemonTable.className = 'pokemonTable';

    let pokemonTableHead = document.createElement('thead');
    pokemonTableHead.className = 'pokemonTableHead';

    let pokemonTableHeadRow = document.createElement('tr');
    pokemonTableHeadRow.className = 'pokemonTableHeadRow'

    tableHeaders.forEach(header => {
        let pokemonHeader = document.createElement('th')
        pokemonHeader.innerText = header
        pokemonTableHeadRow.append(pokemonHeader)
    })

    pokemonTableHead.append(pokemonTableHeadRow);
    pokemonTable.append(pokemonTableHead);
    
    let pokemonTableBody = document.createElement('tbody')
    pokemonTableBody.className = "pokemonTableBody"
    pokemonTable.append(pokemonTableBody)
    
    pokemonDiv.append(pokemonTable)

}

getKantoPokemon();