// BASE
const BASE_URL = 'https://api.themoviedb.org/3';
// API key TMDB
const API_KEY = 'api_key=74dc824830c7f93dc61b03e324070886';

// Resolución de imagenes
const IMG_ORI = 'https://image.tmdb.org/t/p/original';
const IMG_500 = 'https://image.tmdb.org/t/p/w500';
const IMG_300 = 'https://image.tmdb.org/t/p/w300';
const IMG_185 = 'https://image.tmdb.org/t/p/w185';
const IMG_92 = 'https://image.tmdb.org/t/p/w92';

// Lenguajes
const LANG_ES = 'language=es-MX';
const LANG_EN = 'language=en-US';

// Hacer la llamada a la API de TheMovieDB
function searchSeries(query) {
 fetch(`${BASE_URL}/search/tv?${API_KEY}&query=${query}&${LANG_ES}`)
  .then(response => response.json())
  .then(data => {
   // Verificar si hay resultados antes de mostrarlos
   if (data.results && data.results.length > 0) {
    displaySeriesList(data.results);
   } else {
    // Mostrar un mensaje si no hay resultados
    const seriesContainer = document.getElementById('series-container');
    seriesContainer.innerHTML = '<p>No se encontraron series.</p>';
   }
  })
  .catch(error => console.error(error));
}

// Función para mostrar la lista de series
function displaySeriesList(series) {
 let resultsHtml = '';

 series.forEach(serie => {

  var id = serie.id;
  var title = serie.name;
  var originalTitle = serie.original_name;
  var poster = serie.poster_path;
  var backdrop = serie.backdrop_path;
  var genre = serie.genre_ids;
  var releaseYear = serie.first_air_date.split("-")[0];

  var lang = serie.original_language;

  var originalLanguage = getLanguage(serie.original_language);
  var vote = serie.vote_average
  var overview = serie.overview;

  var popPosterFat = IMG_ORI + getPosterSerie(id, lang);
  var popBackdropFat = IMG_ORI + getBackdropSerie(id, lang);
  var popPosterFit = IMG_500 + getPosterSerie(id, lang);
  var popBackdropFit = IMG_500 + getBackdropSerie(id, lang);
  var esGenre = getGenres(genre);

  resultsHtml += `
<div class="movie-card">
 <div class="movie-card__header" style="background-image: url(${popBackdropFit})">
  <span class="movie-card_genre">ID: ${id}</span>
  <span class="movie-card_genre">
   <a href="https://bfc30010-7323-4c16-9b06-e31ddf53c427.e1-us-cdp-2.choreoapps.dev/p?url=${popPosterFat}" target="_blank">
    Poster
   </a>
  </span>
  <span class="movie-card_genre">
   <a href="https://bfc30010-7323-4c16-9b06-e31ddf53c427.e1-us-cdp-2.choreoapps.dev/b?url=${popBackdropFat}" target="_blank">
    Backdrop
   </a>
  </span>
  <span class="movie-card_genre">
   <a href="https://www.themoviedb.org/tv/${id}/" target="_blank">
    Información
   </a>
  </span>
 </div>
 <div class="movie-card_content">
  <img class="movie-card___poster" src="${popPosterFit}" alt="${title}">
  <div class="d">


   <button class="copy" onclick="copyTextById('serie_${id}_1', this)"><i class="fa-regular fa-clipboard"></i> Copiar</button>
   <div class="contenedor border" id="serie_${id}_1">${title} (${releaseYear}) - s00e00 - [480p].mp4</div>

   <button class="copy" onclick="copyTextById('serie_${id}_2', this)"><i class="fa-regular fa-clipboard"></i> Copiar</button>

   <div class="contenedor border" id="serie_${id}_2">



    <div>⚠️ *NUEVA SERIE EN EL CANAL*</div>

    <div class="separador"><b>➖➖➖➖➖➖➖➖➖➖</b></div>




    <div class="titulo_es">⟨🍿⟩
     ${title} (${releaseYear})</div>


    <div class="titulo_en">⟨📽⟩
     ${originalTitle}</div>




    <div class="separador"><b>➖➖➖➖➖➖➖➖➖➖</b></div>





    <div class="temporadas">⟨📼⟩
     Temporada/as: ${getSeasonCount(id)}</div>
    <div> </div>


    <div class="genero">⟨🎭⟩
     Género: ${esGenre}</div>
    <div> </div>


    <div class="calidad">⟨📺⟩
     Calidad: HD</div>
    <div> </div>


    <div class="idioma">⟨🗣⟩
     Idioma Original: ${originalLanguage}</div>
    <div> </div>


    <div class="audio">⟨🎧⟩
     Audio: 🇲🇽
     Latino</div>
    <div> </div>


    <div class="Sinopsis">⟨📝⟩
     Sinopsis: &#96;&#96;&#96;${overview}&#96;&#96;&#96;</div>





    <div class="separador"><b>➖➖➖➖➖➖➖➖➖➖</b></div>




    <div class="trailer">⟨🎞️⟩
     Intro de la serie: <a href="https://youtu.be/${getTrailerKey(id, lang)}">${getTrailerKey(id, lang)}</a></div>
    <div> </div>


    <div class="descarga">⟨🔗⟩
     Ver / Descargar:&nbsp;</div>

   </div>
  </div>
 </div>
    `;
 });

 const seriesContainer = document.getElementById('series-container');
 results.innerHTML = resultsHtml;
}





// Funcion: Traducir los generos
function getGenres(genreIds) {
 var genres = {
  28: "Accion",

  12: "Aventura",

  16: "Animacion",

  35: "Comedia",

  80: "Crimen",

  99: "Documental",

  18: "Drama",

  10751: "Familiar",

  14: "Fantasia",

  36: "Historia",

  27: "Terror",

  10402: "Musica",

  9648: "Misterio",

  10749: "Romance",

  878: "Ciencia Ficcion",

  10770: "Película de la Television",

  53: "Suspenso",

  10752: "Belica",

  37: "Oeste",

  10759: "Accion y Aventura",

  10762: "Infantil",

  10763: "Noticias",

  10764: "Realidad",

  10765: "Ciencia Ficcion y Fantasia",

  10766: "Serial",

  10767: "Conversacion",

  10768: "Politico",

  10769: "Opcion Interactiva"
 };

 var genreList = [];

 genreIds.forEach(function(genreId) {
  if (genres[genreId]) {
   genreList.push(genres[genreId]);
  }
 });

 return genreList.join(", ");
}

// Función: Obtener el número de temporadas
function getSeasonCount(serieId) {
 var seasonCount = '';

 $.ajax({
  url: `${BASE_URL}/tv/${serieId}?${API_KEY}&${LANG_ES}`,
  async: false,
  success: function(response) {
   seasonCount = response.number_of_seasons;
  },
  error: function(error) {
   console.log(error);
   // Algo no salió como esperábamos.
  }
 });

 return seasonCount;
}

// Función: Traducir el lenguaje
function getLanguage(languageCode) {
 var languages = {
  en: "🇺🇸 Ingles",

  ca: "🇪🇸 Catalan",

  es: "🇲🇽 / 🇪🇸 Español",

  fr: "🇫🇷 Frances",

  de: "🇩🇪 Aleman",

  it: "🇮🇹 Italiano",

  ja: "🇯🇵 Japones",

  ko: "🇰🇷 / 🇰🇵 Coreano",

  ru: "🇷🇺 Ruso",

  zh: "🇨🇳 Chino"
 };

 return languages[languageCode] || languageCode;
}

// Funcion: Obtener poster de pelicula
function getPosterSerie(serieId, languageCode) {
 var poster_URL = '';

 $.ajax({
  url: `https://api.themoviedb.org/3/tv/${serieId}/images?api_key=74dc824830c7f93dc61b03e324070886&include_image_language=es,en,${languageCode}`,
  async: false,
  success: function(response) {
   var posters = response.posters;

   // Ordenar los posters por popularidad de forma descendente
   posters.sort(function(a, b) {
    return b.popularity - a.popularity;
   });

   var posterPath = posters.find(function(poster) {
    return (
     poster.iso_639_1 === languageCode ||
     poster.iso_639_1 === "es" ||
     poster.iso_639_1 === "en"
    );
   });

   if (posterPath) {
    poster_URL = posterPath.file_path;
   }
  },
  error: function(error) {
   console.log('Ay, mi amor, algo salió mal:', error);
  }
 });

 return poster_URL;
}

// Funcion: Obtener backdrop de pelicula
function getBackdropSerie(serieId, languageCode) {
 var backdrop_URL = '';

 $.ajax({
  url: `https://api.themoviedb.org/3/tv/${serieId}/images?api_key=74dc824830c7f93dc61b03e324070886&include_image_language=es,en,${languageCode},null`,
  async: false,
  success: function(response) {
   var backdrops = response.backdrops;

   // Ordenar los backdrops por popularidad de forma descendente
   backdrops.sort(function(a, b) {
    return b.popularity - a.popularity;
   });

   var backdropPath = backdrops.find(function(backdrop) {
    return (
     backdrop.iso_639_1 === languageCode ||
     backdrop.iso_639_1 === "en" ||
     backdrop.iso_639_1 === "es" ||
     backdrop.iso_639_1 === "null"
    );
   });

   if (backdropPath) {
    backdrop_URL = backdropPath.file_path;
   }
  },
  error: function(error) {
   console.log('Ay, mi amor, algo salió mal:', error);
  }
 });

 return backdrop_URL;
}

// Función: Obtener key del tráiler de YouTube
function getTrailerKey(serieId, languageCode) {
 var trailerKey = "";

 $.ajax({
  url: `https://api.themoviedb.org/3/tv/${serieId}/videos?api_key=fd7402172ca9f36816c7691becaf455f`,
  async: false,
  success: function(data) {
   var videos = data.results.filter(function(video) {
    return (
     video.site === "YouTube" &&
     video.type === "Opening Credits" &&
     video.iso_639_1 === languageCode
    );
   });

   if (videos.length > 0) {
    trailerKey = `https://youtu.be/${videos[0].key}`;
   } else {
    trailerKey = "No hay tráiler disponible";
   }
  }
 });

 return trailerKey;
}