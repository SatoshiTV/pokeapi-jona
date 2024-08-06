document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const pokemonQuery = document.getElementById('pokemon-query');
    const pokemonDetails = document.getElementById('pokemon-details');
    const pokemonImage = document.getElementById('pokemon-image');

    searchButton.addEventListener('click', async () => {
        const query = pokemonQuery.value.trim().toLowerCase();
        if (query) {
            try {
                const data = await fetchPokemon(query);
                displayPokemon(data);
            } catch (error) {
                console.error('Error al obtener los datos del Pokémon:', error);
                alert('Pokémon no encontrado. Por favor, verifica el ID o nombre e inténtalo de nuevo.');
            }
        }
    });

    async function fetchPokemon(query) {
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${query}`;
        const response = await fetch(pokemonUrl);
        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }
        return await response.json();
    }

    function displayPokemon(data) {
        document.getElementById('pokemon-id').textContent = data.id;
        document.getElementById('pokemon-name').textContent = data.name;
        document.getElementById('pokemon-weight').textContent = data.weight;
        document.getElementById('pokemon-height').textContent = data.height;

        const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
        document.getElementById('pokemon-types').textContent = types;

        pokemonImage.src = data.sprites.front_default || 'placeholder.png';
        pokemonImage.alt = `Imagen de ${data.name}`;

        pokemonDetails.style.display = 'block';
    }
});
