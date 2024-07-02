const API_SERVER = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id');

    if (movieId) {
        // Hacer una solicitud al servidor para obtener los detalles de la película con el ID proporcionado
        fetch(`${API_SERVER}/movies/${movieId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const { title, release_date, genre_name, description, director, cast, minimum_age, poster_path } = data;

                // Actualizar el DOM con los datos de la película
                document.getElementById('titulo').textContent = title || 'Título no disponible';
                document.getElementById('poster').setAttribute('src', `../${poster_path}`);
                document.getElementById('fechaGeneros').textContent = `Fecha de lanzamiento: ${release_date || 'Fecha no disponible'}`;
                document.getElementById('descripcion').textContent = description || 'Descripción no disponible';
                document.getElementById('director').textContent = director || 'Director no disponible';
                document.getElementById('cast').textContent = cast || 'Elenco no disponible';
                document.getElementById('minimum_age').textContent = minimum_age || 'Edad mínima no disponible';
                document.getElementById('genero').textContent = `${genre_name || 'Género no disponible'}`
            })
            .catch(error => console.error('Error al obtener los detalles de la película:', error));
    }
});
