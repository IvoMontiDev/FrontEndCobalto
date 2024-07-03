document.getElementById('formulario').addEventListener('submit', async function(event) {
    event.preventDefault();

    const data = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        release_date: document.getElementById('release_date').value,
        poster_url: document.getElementById('poster_url').value,
        director: document.getElementById('director').value,
        cast: document.getElementById('cast').value,
        minimum_age: document.getElementById('minimum_age').value,
        genre_id: document.getElementById('genre_id').value,

    };

    console.log('Data being sent:', data);

    try {
        const response = await fetch('https://ivomontidev.alwaysdata.net/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Película creada exitosamente');
        } else {
            alert('Película creada exitosamente');
            window.location.reload();
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Error al crear la película');
        window.location.reload();
    }
});
