const API_SERVER = 'https://ivomontidev.alwaysdata.net/api';

const cargarPeliculasTendencia = async (page = 1) => {
    try {
        const response = await fetch(`${API_SERVER}/movies?page=${page}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const movies = await response.json();

        if (!Array.isArray(movies)) {
            throw new Error('Invalid API response structure');
        }

        const tendenciasContainer = document.querySelector('.peliculasTendencia .peliculas');
        tendenciasContainer.innerHTML = '';

        movies.forEach(movie => {
            const ancla = document.createElement('a');
            ancla.href = `./pages/detalle.html?id=${movie.id}`;
            
            const pelicula = document.createElement('div');
            pelicula.classList.add('pelicula');
            
            const img = document.createElement('img');
            img.classList.add('imgTendencia');
            img.src = movie.poster_path; // Asegúrate de que el path es correcto
            img.alt = movie.title;
            img.loading = 'lazy';
            
            const tituloPelicula = document.createElement('div');
            tituloPelicula.classList.add('tituloPelicula');
            
            const titulo = document.createElement('h4');
            titulo.textContent = movie.title;
            
            ancla.appendChild(pelicula);
            pelicula.appendChild(img);
            pelicula.appendChild(tituloPelicula);
            tituloPelicula.appendChild(titulo);
            tendenciasContainer.appendChild(ancla);
        });

        tendenciasContainer.parentElement.setAttribute('data-page', page);
    } catch (error) {
        console.error('Error cargando las películas:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    cargarPeliculasTendencia();
});
