async function getInfo() {
    const url = 'https://accounts.spotify.com/api/token'
    const datos = 'grant_type=client_credentials&client_id=f9ae72aa6e614fc29e802175b5c3c42a&client_secret=b99586d80e6f47e88003a79720ceca51';
    console.log(datos)

    const answer = await fetch(url, {
        method: 'POST', headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: datos
    });
    console.log(answer)

    const JsonAnswer = await answer.json();
    console.log(JsonAnswer)

    const token = JsonAnswer.access_token;
    console.log(token);

    const url1 = 'https://api.spotify.com/v1/artists/7ltDVBr6mKbRvohxheJ9h1/top-tracks';
    const answer2 = await fetch(url1, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` // Uso correcto de interpolación con backticks
        }
    });

    const JsonAnswer2 = await answer2.json();
    console.log(JsonAnswer2);

    const song = JsonAnswer2.tracks[0];

    document.getElementById("nombre-artista").textContent = song.artists[0].name; // Nombre del artista
    document.getElementById("nombre-cancion").textContent = song.name; // Nombre de la canción

    let albumImagen = document.createElement('img');
    albumImagen.src = song.album.images[0].url;
    document.getElementById("IMAGEN").appendChild(albumImagen);

}