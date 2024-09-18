// BASE
const BASE_URL = 'https://api.themoviedb.org/3';
// API key TMDB
const API_KEY = 'api_key=74dc824830c7f93dc61b03e324070886';

// Resolución de imagenes
const IMG_ORI = 'https://image.tmdb.org/t/p/original';
const IMG_500 = 'https://image.tmdb.org/t/p/w500';
const IMG_300 = 'https://image.tmdb.org/t/p/w300';
const IMG_185 = 'https://image.tmdb.org/t/p/w185';
const IMG_92  = 'https://image.tmdb.org/t/p/w92';

// Whatermark
const whatermark = 'https://095a2517-5733-4377-8631-a3e04ed221e8.e1-us-cdp-2.choreoapps.dev'


async function imageMoviePoster() {
 try {
  // Obtener la URL actual
  const currentUrl = window.location.href;

  // Crear un objeto URL a partir de la URL actual
  const url = new URL(currentUrl);

  // Obtener el valor del parámetro "idMovie"
  const idMovie = url.searchParams.get('idMovie');

  const response = await fetch(`${BASE_URL}/movie/${idMovie}/images?${API_KEY}`);
  const data = await response.json();
  const gallery = document.getElementById('poster');
  const images = [...data.posters];

  images.forEach(image => {
   const conImgElement = document.createElement('div');
   conImgElement.classList.add('conImg');

   const imgElement = document.createElement('img');
   imgElement.src = whatermark + '/small_p?url=' + IMG_500 + image.file_path;

   const linkElement = document.createElement('a');
   linkElement.href = whatermark + '/p?url=' + IMG_ORI + image.file_path;
   // Abrir en una nueva ventana
   linkElement.target = '_blank';
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

  const response = await fetch(`${BASE_URL}/movie/${idMovie}/images?${API_KEY}`);
  const data = await response.json();
  const gallery = document.getElementById('backdrop');
  const images = [...data.backdrops];

  images.forEach(image => {
   const conImgElement = document.createElement('div');
   conImgElement.classList.add('conImg');

   const imgElement = document.createElement('img');
   imgElement.src = whatermark + '/small_b?url=' + IMG_500 + image.file_path;

   const linkElement = document.createElement('a');
   linkElement.href = whatermark + '/b?url=' + IMG_ORI + image.file_path;
   // Abrir en una nueva ventana
   linkElement.target = '_blank';
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

if (window.location.search.includes('idMovie')) {
 // Llamar a la función para que se ejecute
 imageMovieBackdrop();
 imageMoviePoster();
}