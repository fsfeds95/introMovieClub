async function imageMoviePoster() {
 try {
  // Obtener la URL actual
  const currentUrl = window.location.href;

  // Crear un objeto URL a partir de la URL actual
  const url = new URL(currentUrl);

  // Obtener el valor del parámetro "idMovie"
  const idMovie = url.searchParams.get('idMovie');

  const response = await fetch(`https://api.themoviedb.org/3/movie/${idMovie}/images?api_key=74dc824830c7f93dc61b03e324070886`);
  const data = await response.json();
  const gallery = document.getElementById('poster');
  const images = [...data.posters];

  images.forEach(image => {
    const conImgElement = document.createElement('div');
    conImgElement.classList.add('conImg');

    const imgElement = document.createElement('img');
    imgElement.src = 'https://image.tmdb.org/t/p/w500' + image.file_path; // Cargar directamente la imagen

    const linkElement = document.createElement('a');
    linkElement.href = 'https://image.tmdb.org/t/p/original' + image.file_path;
    linkElement.target = '_blank'; // Abrir en nueva ventana
    linkElement.innerText = 'Whatermark';

    conImgElement.appendChild(imgElement);
    const divLink = document.createElement('div');
    divLink.appendChild(linkElement);
    conImgElement.appendChild(divLink);
    gallery.appendChild(conImgElement);
  });
 } catch (error) {
  console.error('Error:', error);
 }
}

async function imageMovieBackdrop() {
 try {
  // Obtener la URL actual
  const currentUrl = window.location.href;

  // Crear un objeto URL a partir de la URL actual
  const url = new URL(currentUrl);

  // Obtener el valor del parámetro "idMovie"
  const idMovie = url.searchParams.get('idMovie');

  const response = await fetch(`https://api.themoviedb.org/3/movie/${idMovie}/images?api_key=74dc824830c7f93dc61b03e324070886`);
  const data = await response.json();
  const gallery = document.getElementById('backdrop');
  const images = [...data.backdrops];

  images.forEach(image => {
    const conImgElement = document.createElement('div');
    conImgElement.classList.add('conImg');

    const imgElement = document.createElement('img');
    imgElement.src = 'https://image.tmdb.org/t/p/w500' + image.file_path; // Cargar directamente la imagen

    const linkElement = document.createElement('a');
    linkElement.href = 'https://095a2517-5733-4377-8631-a3e04ed221e8.e1-us-cdp-2.choreoapps.dev/b?url=https://image.tmdb.org/t/p/original' + image.file_path;
    linkElement.target = '_blank'; // Abrir en nueva ventana
    linkElement.innerText = 'Whatermark';

    conImgElement.appendChild(imgElement);
    const divLink = document.createElement('div');
    divLink.appendChild(linkElement);
    conImgElement.appendChild(divLink);
    gallery.appendChild(conImgElement);
  });
 } catch (error) {
  console.error('Error:', error);
 }
}

// Llamar a la función para que se ejecute
imageMovieBackdrop();
imageMoviePoster();
