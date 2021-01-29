// Pokemon Data from PokeAPI https://pokeapi.co/docs/v2#info
// Pokemon Image from Pokeres Bastionbot https://pokeres.bastionbot.org/

// initialize number of pokemon
const numberOfPokemon = 898;

// create color object
const typeColor = {
    fire: '#fddfdf',
	grass: '#defde0',
	electric: '#fcf7de',
	water: '#def3fd',
	ground: '#f1d484',
	rock: '#e0ca65',
	fairy: '#fceaff',
	poison: '#d2b4de',
	ghost: '#d7bde2',
	bug: '#e6f192',
	dragon: '#97b3e6',
	psychic: '#fa8faf',
	flying: '#a890f0',
	fighting: '#f5b7b1',
    normal: '#f5f5f5',
    ice: '#d1f2eb',
    dark: '#a8998b',
    steel: '#b8b8d0'
};

// loop over the numberOfPokemon
const fetchPokemons = async () => {
    for (let i = 1; i <= numberOfPokemon; i++) {
        const response = await getPokemon(i);
    }
};

// fetch pokemon api
const getPokemon = async (id) => {
    const POKEMON_URL = `https://pokeapi.co/api/v2/pokemon/${id}/`

    const response = await fetch(POKEMON_URL);
    const data = await response.json();

    // create card function
    createPokemonCard(data);
};

const createPokemonCard = (data) => {

    // HTML DOM element
    const container = document.querySelector('.container')

    // assign data to variables
    const id = data.id;
    const name = data.name;
    const types = getTypes(data);
    const stats = getStats(data);
    const abilities = getAbilities(data);
    const color = getColor(data.types[0].type.name);
    
    // create pokemon card
    // fetch pokemon image
    // add padding to id
    // replace , with space
    pokemonCard = 
    `
    <div class="card">
        <div class="pokemon-card" style="background-color: ${color}">
            <div class="img-container">
                <img src="${`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}" alt="${name}">
            </div>
            <div class="info">
                <p id="id">#${id.toString().padStart(3, '0')}</p> 
                <h2>${name}</h2>
                <p id="type">${types.toString().replace(/,/g, ' ')}</p>
            </div>
        </div>
        <div class="pokemon-card-back">
            <h2>${name}</h2>
            <p>${types.toString().replace(/,/g, ' ')}</p>
            <p>${stats[0]}</p>
            <p>${stats[1]}</p>
            <p>${stats[2]}</p>
            <p>${stats[3]}</p>
            <p>${stats[4]}</p>
            <p>${stats[5]}</p>
            <p>Abilities:</p>
            <p>${abilities.toString().replace(/,/g, ' ')}</p>
        </div>
    </div>
    `
    // insert cards to container
    container.insertAdjacentHTML('beforeend', pokemonCard);
};


const getTypes = (data) => {
    
    // create types array
    const types = [];

    // loop over all the types
    for (let i = 0; i < data.types.length; i++) {

        const type = data.types[i].type.name;

        // check if type is available
        if (data.types[i].type.name !== undefined) {

            // insert type to array
            types.push(type);
        }
    }
    // return array
    return types;
};

const getStats = (data) => {

    // create stats array
    const stats = [];

    // loop over all the stats
    for (let i = 0; i < data.stats.length; i++) {
        const statName = data.stats[i].stat.name;
        const statValue = data.stats[i].base_stat;

        // insert stats to array
        stats.push(`${statName}: ${statValue}`);
    }
    // return array
    return stats;
};

const getAbilities = (data) => {

    // create abilities array
    const abilities = [];

    // loop over all abilities
    for (let i = 0; i < data.abilities.length; i++) {
        const ability = data.abilities[i].ability.name;

        // insert ability to array
        abilities.push(ability);
    }

    // return array
    return abilities;
};

const getColor = (type) => {
    
    // loop over all the key in array
    for (let key in typeColor) {

        // check if value is the same
        if(key === type) {

            // return array value
            return typeColor[type];    
        }
    }
};

// fetch pokemons
fetchPokemons();