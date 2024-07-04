const cargarReviews = async () => {
    try {
        const response = await fetch(`${API_SERVER}/reviews`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reviews = await response.json();

        const reviewsArray = Array.isArray(reviews) ? reviews : [reviews];

        const aclamadasContainer = document.getElementById('aclamadasContainer');
        aclamadasContainer.innerHTML = '';

        reviewsArray.forEach(review => {
            const reviewDiv = document.createElement('div');
            reviewDiv.classList.add('review');
            // Estilos
            reviewDiv.style.marginBottom = '20px'; 
            reviewDiv.style.padding = '10px';
            reviewDiv.style.border = '1px solid #ccc'; 
            reviewDiv.style.borderRadius = '5px'; 
            reviewDiv.style.margin = "1vw";

            const movieTitle = document.createElement('h4');
            movieTitle.textContent = `Película: ${review.movie_title}`;
            // Estilos
            movieTitle.style.marginBottom = '10px'; 

            const userName = document.createElement('p');
            userName.textContent = `Usuario: ${review.nombre}`;
            // Estilos
            userName.style.margin = '5px 0'; 

            const rating = document.createElement('p');
            // Estilos
            rating.style.margin = '5px 0'; 

            // Añadir estrellas según el rating
            if (review.rating > 0 && review.rating <= 5) {
                const stars = '⭐'.repeat(review.rating);
                rating.textContent = `${stars}`;
            } else {
                rating.textContent = 'Sin rating'; // Mensaje alternativo si no hay rating válido
            }

            const comment = document.createElement('p');
            comment.textContent = `${review.comment}`;
            // Estilos
            comment.style.margin = '5px 0'; 

            reviewDiv.appendChild(movieTitle);
            reviewDiv.appendChild(userName);
            reviewDiv.appendChild(rating);
            reviewDiv.appendChild(comment);

            aclamadasContainer.appendChild(reviewDiv);
        });

    } catch (error) {
        console.error('Error cargando los reviews:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    cargarReviews();
});
