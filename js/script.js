/**
 * Get data from *PokeAPI*.
 * @param {string} url Call to the api.
 */
function getData(url) {
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
    createMainTable();
    data.results.sort((a, b) => a.id < b.id ? -1 : a.id === b.id ? 0 : 1);
    data.results.forEach(singleObject => {
      getPokemonData(singleObject)
    });
    sortTable(0, 2);
  })
  .catch(err => {
    console.error("Request Failed", err);
  })
}

/**
 * Get all data of a single element and insert
 * it to the main table.
 * @param {Object} pokemon Pokemon that will be inserted.
 */
function getPokemonData(pokemon) {

  fetch(pokemon.url)
  .then(response => response.json())
  .then(data => {
    addElement(data);
  })
}

/**
 * Creates main table of the document, _th_ elements are created.
 */
function createMainTable() {

  const mainContent = document.querySelector(".main-content");

  /* 
    Serch if a current table exists, 
    if that is the case remove it form the document 
  */
  let searchContent = document.querySelector(".main-content__table-content");
  if (searchContent) {
    while (searchContent.firstChild) searchContent.removeChild(searchContent.firstChild);
    searchContent.remove();
  }
  
  // New section to create main table
  let content = document.createElement("section");
  content.classList.add("main-content__table-content");
  mainContent.appendChild(content);
  
  let mainTable = document.createElement("table");
  mainTable.classList.add("table-content__main-table", "w-100", "table");
  content.appendChild(mainTable);

  let headerTr = document.createElement("tr");
  headerTr.classList.add("main-table__header");
  mainTable.appendChild(headerTr);
  
  // Array containing headers of the table
  tableHeaders = ["#", "Sprite", "Name", "Type", "Total", 
    "HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];

  // Create table headers and assign correct classes
  let i = 0;
  tableHeaders.forEach(header => {
    let th = document.createElement("th");
    th.innerHTML = header;
    if (header == "Total" || i > 0) {
      th.classList.add("header__stat-" + i);
      i++;
    } else if (header == "Type") th.classList.add("header__pokemon-type");
    else if (header == "Name") th.classList.add("header__pokemon-name");
    else if (header == "Sprite") th.classList.add("header__pokemon-sprite");
    else if (header == "#") {
      th.classList.add("header__pokemon-id");
      let btn = document.createElement("button");
      btn.classList.add("button-id");
      headerTr.appendChild(btn);
    }
    headerTr.appendChild(th);
  });
}

/**
 * Creates new _tr_ with the data provided.
 * @param {Object} pokemon Pokemon that will be inserted in
 * the main table
 */
function addElement(pokemon) {

  let tableBody = document.querySelector(".table-content__main-table");

  let tableRow = document.createElement("tr");
  tableRow.classList.add("main-table__data");
  tableBody.appendChild(tableRow);

  // Pokemon Id data
  td = document.createElement("td");
  let idFormatted = formatNumber(pokemon.id, 4);
  td.classList.add('data__pokemon-id');
  td.innerHTML = idFormatted;
  tableRow.appendChild(td);
  
  // Pokemon Sprite data
  td = document.createElement("td");
  td.classList.add('data__pokemon-sprite');
  // Create image inside td to display the sprite of the pokemon
  td.appendChild(
    document.createElement('img')).src = pokemon.sprites.versions['generation-vii']['icons'].front_default;
  tableRow.appendChild(td);
  
  // Pokemon Name data
  td = document.createElement("td");
  td.classList.add('data__pokemon-name');
  let nameFormatted = capitalizeString(pokemon.name);
  td.innerHTML = nameFormatted;
  tableRow.appendChild(td);
  
  // Pokemon Type data
  insertTypes(pokemon.types);
  tableRow.appendChild(td);

  // Calculate total stat of the pokemon.
  let totalStats = pokemon.stats[0].base_stat + pokemon.stats[1].base_stat + 
    pokemon.stats[2].base_stat + pokemon.stats[3].base_stat +
    pokemon.stats[4].base_stat + pokemon.stats[5].base_stat

  // Pokemon Stats data
  pokemonStats = [totalStats, pokemon.stats[0].base_stat, pokemon.stats[1].base_stat, 
    pokemon.stats[2].base_stat, pokemon.stats[3].base_stat,
    pokemon.stats[4].base_stat,pokemon.stats[5].base_stat];

  let i = 0;
  pokemonStats.forEach(baseStat => {
    let td = document.createElement("td");
    td.innerHTML = baseStat;
    td.classList.add("data__stat-" + i); // Attatch classes to stats
    tableRow.appendChild(td);
    i++;
  })
}

/**
 * Function that formats the number provided: Ex: 1 -> 0001
 * @param {number} Num Number that will be formatted.
 * @param {number} Size Size of the formatted data.
 */
function formatNumber(num, size) {

  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

/**
 * Capitalize string provided.
 * @param {string} string String.
 * @returns Capitalized String.
 */
function capitalizeString(string) {

  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Inserts all types of a pokemon
 * @param {array} types Types of the pokemon.
 */
function insertTypes(types) {

  td = document.createElement("td");
  td.classList.add('data__pokemon-type');
  let first = 1;
  types.forEach(type => {
    let span = document.createElement("span");
    span.classList.add('type-icon');
    span.classList.add('type-' + type.type.name);
    span.innerHTML = type.type.name;
    td.appendChild(span);
  })
}

/**
 * Search on the main table by name
 */
function search() {
  var input, filter, tr, td, i, txtValue;
  input = document.getElementById("search-bar");
  filter = input.value.toUpperCase();
  tr = document.getElementsByClassName("main-table__data");

  for (i = 0, count = 0; i < tr.length; i++) {
    td = tr[i].getElementsByClassName("data__pokemon-name")[0];
    console
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        if (count++ % 2 == 0) {
          tr[i].style.background = "#ffffff";
        } else {
          tr[i].style.background = "#d3d3d3";
        }
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

/**
 * Order table by column.
 * 
 * @param {number} index Determines wich column to order
 * @param {bool} mode Mode == 1 -> Order alphabetically, Mode == 2 -> Order numerically
 */
function sortTable(index, mode) {
  console.log("soarting table...")
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementsByClassName("table-content__main-table")[0];
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("td")[index];
      y = rows[i + 1].getElementsByTagName("td")[index];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (mode == 1) {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }    
        }
      } else if (dir == "desc") {
        if (mode == 1) {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }    
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

window.onload = function() {
  getData("https://pokeapi.co/api/v2/pokemon?limit=807&offset=0");
}