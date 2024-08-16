const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_URL_MOVIE = BASE_URL + '/movie';
const BASE_URL_COLLECTION = BASE_URL + '/collection';



const IMG_ORIGINAL = 'https://image.tmdb.org/t/p/original';
const IMG_500 = 'https://image.tmdb.org/t/p/w500';


const API_KEY = 'api_key=74dc824830c7f93dc61b03e324070886';
const LANG_ES = 'language=es-MX';
const LANG_EN = 'language=en-US';

const TEXTRANK_API = 'https://api.textrank.com';

$(document).ready(function() {
 $("#searchButton").click(function() {
  var searchQuery = $("#searchInput").val();

  searchCollection(searchQuery);
 });

 async function searchCollection(searchQuery) {
  if (searchQuery == "") {
   $("#results").html("<p>Ingrese un título de película para buscar.</p>");
  } else {
   try {
    const response = await fetch(BASE_URL + '/search/collection?' + API_KEY + '&query=' + searchQuery + '&' + LANG_ES);


    //https://api.themoviedb.org/3/search/collection?api_key=74dc824830c7f93dc61b03e324070886&query=the purge&language=es


    const data = await response.json();
    const collections = data.results;

    if (collections.length === 0) {
     $("#results").html("<p>No se encontraron películas con ese título.</p>");
    } else {
     displayCollection(collections);
    }
   } catch (error) {
    console.error('¡Ups! Algo salió mal:', error);
   }
  }
 }

 async function displayCollection(collections) {
  var resultsHtml = "";

  for (const collection of collections) {
   var idCollection = collection.id;
   var title = collection.name.replace(' - Colección', '');
   var originalTitle = collection.original_name;
   var posterPath = collection.poster_path;
   var backdropPath = collection.backdrop_path;
   var overview = collection.overview;
   var replaceTitle = {
    ":": "",
    " ": "_",
    "-": "",
    "¡": "",
    "!": "",
    ",": "",
    "¿": "",
    "á": "a",
    "é": "e",
    "í": "i",
    "ó": "o",
    "ú": "u"
   };

   //------------------------------------------

   try {
    const movieTitles = await getMovieTitles(idCollection);
    const totalMovies = await getTotalMovies(idCollection);

    const totalRevenue = await getTotalRevenue(idCollection);

    const getBackdrop = await getBackdropBackdrop(idCollection);

    resultsHtml += `

<div class="movie-card">
  
  
  <div class="movie-card__header" style="background-image: url(${getBackdrop})">
    <span class="movie-card_genre">
      ID: ${idCollection}
    </span>
    <span class="movie-card_genre">
      <a href="https://bfc30010-7323-4c16-9b06-e31ddf53c427.e1-us-cdp-2.choreoapps.dev/p?url=https://image.tmdb.org/t/p/original${posterPath}" target="_blank">
        Poster
      </a>
    </span>
    <span class="movie-card_genre">
      <a href="https://bfc30010-7323-4c16-9b06-e31ddf53c427.e1-us-cdp-2.choreoapps.dev/b?url=${getBackdrop}" target="_blank">
        Backdrop
      </a>
    </span>
    <span class="movie-card_genre">
      <a href="https://www.themoviedb.org/movie/${idCollection}/" target="_blank">
        Toda la información
      </a>
    </span>
  </div>
  
  
  
  <div class="movie-card_content">
    <div class="movie-card___poster" style="background-image: url(https://image.tmdb.org/t/p/w500${posterPath})">
    </div>
    
    <div class="d">

<button class="copy" onclick="copyTextById('peli_${idCollection}', this)"><i class="fa-regular fa-clipboard"></i> Copiar</button>


<div class="contenedor border" id="peli_${idCollection}">



<div>⚠️ *NUEVA COLECCIÓN EN EL CANAL*</div>

<div class="separador"><b>➖➖➖➖➖➖➖➖➖➖</b></div>

<div class="titulo_es">⟨📦⟩ Colección: ${title}</div>
        
<div class="separador"><b>➖➖➖➖➖➖➖➖➖➖</b></div>

<div class="titulosCollection">⟨🍿⟩ Peliculas: ${totalMovies + movieTitles}</div>

<div class="separador"><b>&nbsp;</b></div>

<div class="ganancias">⟨💰⟩ Ganancias Totales: ${totalRevenue}</div>

<div class="Sinopsis">⟨📝⟩ Sinopsis: ${overview}</div>

<div class="separador"><b>➖➖➖➖➖➖➖➖➖➖</b></div>

<div class="descarga">⟨🔗⟩ Ver️ /️ Descargar:&nbsp;</div>

<div class="separador"><b>➖➖➖➖➖➖➖➖➖➖</b></div>


      </div>
      
    </div>
    
  </div>
  
  
</div>
        `;
   } catch (error) {
    console.error('¡Ups! Algo salió mal:', error);
   }
  }

  $("#results").html(resultsHtml);
 }


 // Función
 // Numero total de películas en la colección
 async function getTotalMovies(idCollection) {
  try {
   const response = await fetch(`${BASE_URL_COLLECTION}/${idCollection}?${API_KEY}`);
   //
   const data = await response.json();
   const moviesList = data.parts.filter(movie => movie.release_date);
   // Filtrar las películas que tienen una fecha de lanzamiento
   const totalMovies = moviesList.length;
   // Utilizar la longitud del array filtrado

   // console.log(`Numeros de películas en la colección ${idCollection}: ${totalMovies}`);
   return totalMovies;
  } catch (error) {
   console.error('¡Ups! Algo salió mal:', error);
   throw error;
  }
 }


 // Función
 // Titulos de las peliculas por su año de estreno
 async function getMovieTitles(idCollection) {
  try {
   const response = await fetch(`${BASE_URL_COLLECTION}/${idCollection}?${API_KEY}&${LANG_ES}`);
   const data = await response.json();
   const moviesList = data.parts.filter(movie => movie.release_date).sort(function(a, b) {
    return parseInt(a.release_date.slice(0, 4)) - parseInt(b.release_date.slice(0, 4));
   });
   const formattedTitles = moviesList.map(movie => `️</br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⟨▪️⟩ ${movie.title} (${movie.release_date.slice(0, 4)})`).join('');

   return formattedTitles;
  } catch (error) {
   console.error('¡Ups! Algo salió mal:', error);
   throw error;
  }
 }


 // Función
 // Ganancias totales de las películas de la colección 
 async function getTotalRevenue(idCollection) {
  try {
   const collectionResponse = await fetch(`${BASE_URL_COLLECTION}/${idCollection}?${API_KEY}`);
   const collectionData = await collectionResponse.json();
   const movieIds = collectionData.parts.map(movie => movie.id);

   let totalRevenue = 0;

   for (const movieId of movieIds) {
    const movieResponse = await fetch(`${BASE_URL_MOVIE}/${movieId}?${API_KEY}`);
    const movieData = await movieResponse.json();

    if (movieData.revenue) {
     totalRevenue += movieData.revenue;
    }
   }

   const totalRevenueInDollars = `${totalRevenue.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}`;

   return totalRevenueInDollars;
  } catch (error) {
   console.error('¡Ups! Algo salió mal:', error);
   throw error;
  }
 }


 // Función
 // Imagen de fondo
 async function getBackdropBackdrop(idCollection) {
  let backdrop_URL = '';

  try {
   const response = await fetch(`${BASE_URL}/collection/${idCollection}/images?${API_KEY}&include_image_language=en,null&${LANG_EN}`);
   const data = await response.json();

   let backdrops = data.backdrops;

   // Ordenar los backdrops por popularidad de forma descendente
   backdrops.sort((a, b) => b.popularity - a.popularity);

   const backdropPath = backdrops.find(backdrop => {
    return (
     //  backdrop.iso_639_1 === "es" ||
     backdrop.iso_639_1 === "en" ||
     backdrop.iso_639_1 === "null"
    );
   });

   if (backdropPath) {
    backdrop_URL = `https://image.tmdb.org/t/p/original${backdropPath.file_path}`;
   }
  } catch (error) {
   console.log('Ay, mi amor, algo salió mal:', error);
  }

  return backdrop_URL;
 }


});