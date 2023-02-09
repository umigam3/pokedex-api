
const getPokemons = () => {
    
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);

        createPokemonTable();
    });
}

const pokemonDiv = document.querySelector("div.pokemon-table");

const createPokemonTable = () => {

    let pokemonTable = document.createElement('table');
    pokemonTable.className = 'pokemonTable';

    let pokemonTableHead = document.createElement('thead');
    pokemonTableHead.className = 'pokemonTableHead';
}

getPokemons();