const getPokemons = () => fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => {return response.json();})
    .then(data => {
        const arr = Object.values(data.results);

        console.log(arr);
        
        arr.foreach(row =>
            console.log(row.url)
        );
    });

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

getPokemons();