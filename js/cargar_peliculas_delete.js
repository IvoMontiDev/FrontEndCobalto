const API_SERVER = 'https://ivomontidev.alwaysdata.net/api';

const cargarPeliculasParaEliminar = async () => {
    try {
        const response = await fetch(`${API_SERVER}/movies`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const movies = await response.json();

        if (!Array.isArray(movies)) {
            throw new Error('Invalid API response structure');
        }

        const moviesList = document.getElementById('tendencias');
        moviesList.innerHTML = '';

        movies.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');

            const movieTitle = document.createElement('h4');
            movieTitle.textContent = movie.title;

            const movieImage = document.createElement('img');
            movieImage.classList.add('movie-image');
            movieImage.src =  movie.poster_path; // Ajusta el path según tu estructura de datos
            movieImage.alt = movie.title;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.onclick = async () => {
                try {
                    const deleteResponse = await fetch(`${API_SERVER}/movies/${movie.id}`, {
                        method: 'DELETE',
                    });
                    if (!deleteResponse.ok) {
                        const errorText = await deleteResponse.text();
                        throw new Error(`HTTP error! status: ${deleteResponse.status}, details: ${errorText}`);
                    }
                    // Remove movie from list after deletion
                    movieItem.remove();
                } catch (error) {
                    console.error('Error eliminando la película:', error);
                    window.location.reload();
                }
            };

            movieItem.appendChild(movieImage); // Agregar imagen
            movieItem.appendChild(movieTitle);
            movieItem.appendChild(deleteButton);
            moviesList.appendChild(movieItem);
        });
    } catch (error) {
        console.error('Error cargando las películas:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    cargarPeliculasParaEliminar();
});
