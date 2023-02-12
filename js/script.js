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
    td.classList.add('pokemon-name');
    let nameFormatted = capitalizeString(pokemon.name);
    td.innerHTML = nameFormatted;
    dataRow.appendChild(td);
    
    insertTypes(pokemon.types);
    dataRow.appendChild(td);

    let totalStats = pokemon.stats[0].base_stat + pokemon.stats[1].base_stat + 
        pokemon.stats[2].base_stat + pokemon.stats[3].base_stat +
        pokemon.stats[4].base_stat + pokemon.stats[5].base_stat

    pokemonStats = [totalStats, pokemon.stats[0].base_stat, pokemon.stats[1].base_stat, pokemon.stats[2].base_stat, pokemon.stats[3].base_stat,
        pokemon.stats[4].base_stat,pokemon.stats[5].base_stat];

    pokemonStats.forEach(baseStat => {
        let td = document.createElement("td");
        td.innerHTML = baseStat;
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

function insertTypes(types) {

    td = document.createElement("td");
    let first = 1;
    types.forEach(type => {
        let span = document.createElement("span");
        span.classList.add('type-icon');
        span.classList.add('type-' + type.type.name);
        span.innerHTML = type.type.name;
        td.appendChild(span);
    })

}

function search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    tr = document.getElementsByClassName("dataRow");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByClassName("pokemon-name")[0];
        console
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    

    console.log(td);
  
    // td = tr[2].getElementsByTagName("td")[0];
    // console.log(td)
    // if (td) {
    //     txtValue = td.textContent || td.innerText;
    //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
    //       tr[i].style.display = "";
    //     } else {
    //       tr[i].style.display = "none";
    //     }
    //   }
}
  

window.onload = function() {
    getData();
}
   