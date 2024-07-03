// editar_pelicula.js

document.addEventListener('DOMContentLoaded', async function() {
    const selectMovie = document.getElementById('selectMovie');

    try {
        // Hacer una solicitud HTTP para obtener las películas disponibles
        const response = await fetch('https://ivomontidev.alwaysdata.net/api/movies');
        if (!response.ok) {
            throw new Error('Error al obtener las películas');
        }
        const movies = await response.json();

        // Limpiar el select actual
        selectMovie.innerHTML = '';

        // Crear opciones para cada película
        movies.forEach(movie => {
            const option = document.createElement('option');
            option.value = movie.id; // Asignar el ID de la película como valor
            option.textContent = movie.title; // Mostrar el título de la película
            selectMovie.appendChild(option);
        });

        // Mostrar el formulario de edición si hay películas disponibles
        if (movies.length > 0) {
            document.getElementById('editForm').style.display = 'block';
            // Cargar detalles de la primera película por defecto
            await loadSelectedMovie(movies[0].id); // Ajustar según tu lógica
        }
    } catch (error) {
        console.error('Error al cargar las películas:', error);
        // Mostrar mensaje de error al usuario si es necesario
    }
});

// Función para cargar los detalles de la película seleccionada
async function loadSelectedMovie(movieId) {
    try {
        if (!movieId) {
            throw new Error('ID de película no válido');
        }
        
        const response = await fetch(`https://ivomontidev.alwaysdata.net/api/movies/${movieId}`);
        if (!response.ok) {
            throw new Error('Error al cargar la película');
        }
        const movie = await response.json();

        // Verificar si la respuesta JSON está vacía o no tiene el formato esperado
        if (!movie || Object.keys(movie).length === 0) {
            throw new Error('Respuesta de película vacía o inválida');
        }

        // Mostrar los datos de la película en el formulario de edición
        document.getElementById('editMovieId').value = movie.id;
        document.getElementById('editTitle').value = movie.title;
        document.getElementById('editDescription').value = movie.description;
        document.getElementById('editReleaseDate').value = movie.release_date;
        document.getElementById('editPosterUrl').value = movie.poster_path;
        document.getElementById('editDirector').value = movie.director;
        document.getElementById('editCast').value = movie.cast;
        document.getElementById('editMinimumAge').value = movie.minimum_age;
        document.getElementById('editGenreId').value = movie.genre_id;
    } catch (error) {
        console.error('Error al cargar la película seleccionada:', error);
        // Mostrar mensaje de error al usuario si es necesario
    }
}

async function updateMovie(){
const formData = new FormData(editForm);
const editedMovie = {
    id: formData.get('editMovieId'),
    title: formData.get('editTitle'),
    description: formData.get('editDescription'),
    release_date: formData.get('editReleaseDate'),
    poster_path: formData.get('editPosterUrl'),
    director: formData.get('editDirector'),
    cast: formData.get('editCast'),
    minimum_age: formData.get('editMinimumAge'),
    genre_id: formData.get('editGenreId')
};

try {
    const response = await fetch(`https://ivomontidev.alwaysdata.net/api/movies/${editedMovie.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedMovie)
    });

    if (!response.ok) {
        throw new Error('Error al actualizar la película');
    }

    const updatedMovie = await response.json();
    console.log('Película actualizada exitosamente:', updatedMovie);

    // Opcional: Mostrar mensaje de éxito al usuario o redireccionar
} catch (error) {
    console.error('Error al actualizar la película:', error);
    // Mostrar mensaje de error al usuario si es necesario
}}