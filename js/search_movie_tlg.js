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

$(document).ready(function() {
 $("#searchButton").click(function() {
  var searchQuery = $("#searchInput").val();
  searchMovies(searchQuery);
 });
 $("#searchInput").on("keypress", function(event) {
  if (event.key === "Enter") {
   var searchQuery = $("#searchInput").val();
   searchMovies(searchQuery);
  }
 });



 function searchMovies(query) {
  if (query == "") {
   $("#results").html("<p>Ingrese un título de película para buscar.</p>");
  } else {
   $.getJSON(
    BASE_URL + "/search/movie?" + API_KEY + "&query=" +
    query +
    "&" + LANG_ES,
    function(data) {
     var movies = data.results;

     if (movies.length === 0) {
      $("#results").html("<p>No se encontraron películas con ese título.</p>");
     } else {
      displayMovies(movies);
     }
    }
   );
  }
 }

 function displayMovies(movies) {
  var resultsHtml = "";

  movies.forEach(function(movie) {
   var id = movie.id;

   var title = movie.title;

   var originalTitle = movie.original_title;

   var tagline = movie.tagline;

   var releaseYear = movie.release_date.split("-")[0];

   var posterPath = movie.poster_path;

   var backdropPath = movie.backdrop_path;

   var langCode = movie.original_language;

   var overview = movie.overview;

   var duration = movie.runtime;

   resultsHtml += `<div class="movie-card">
   <div class="movie-card__header" style="background-image: url(${IMG_300+getBackdropMovie(id)})">
     <span class="movie-card_genre">ID:‎ ${id}</span>
     <span class="movie-card_genre">
       <a href="https://watermark-astropeliculas-final.onrender.com/p?url=${IMG_185+getPosterMovie(id)}" target="_blank">
         Poster
       </a>
     </span>
     <span class="movie-card_genre">
       <a href="https://watermark-astropeliculas-final.onrender.com/b?url=${IMG_ORI+getBackdropMovie(id)}" target="_blank">
         Backdrop
       </a>
     </span>
     <span class="movie-card_genre">
       <a href="https://www.themoviedb.org/movie/${id}/" target="_blank">
         Información
       </a>
     </span>
   </div>
   <div class="movie-card_content">
     <div class="movie-card__poster" data-src="${IMG_300+getPosterMovie(id)}"></div>
     <div class="d">
      
<button class="copy" onclick="copyTextById('peli_${id}', this)"><i class="fa-regular fa-clipboard"></i>‎ Copiar</button>

<div class="contenedor border" id="peli_${id}">


<div class="initial"><b>⟨🔠⟩‎ #${title.substring(1, 0)}</b></div>

<div class="separador"><b>➖➖➖➖➖➖➖➖➖➖</b></div>

<div class="title_es"><b>⟨🍿⟩‎ ${title}</b></div>

<div class="title_or"><b>⟨🎥⟩‎ ${originalTitle}</b></div>

<div class="separador"><b>➖➖➖➖➖➖➖➖➖➖</b></div>

<div class="year"><b>⟨🎟⟩‎ Estreno:‎ #Año${releaseYear}</b></div>

<div class="quality"><b>⟨📺⟩‎ Calidad:‎‎ HD</b></div>

<div class="lang"><b>⟨🗣️⟩‎ Idioma‎ Original:‎ ${getLanguage(langCode)}</b></div>

<div class="audio"><b>⟨🔊⟩‎ Audio:‎ 🇲🇽‎ Latino</b></div>

<div class="duration"><b>⟨⏳⟩‎ Duración:‎ ${getDurationMovie(id)}</b></div>

<div class="genre"><b>⟨🎭⟩‎ Género:‎ ${getGenres(movie.genre_ids)}</b></div>

<div class="credits"><b>⟨👤⟩‎ Reparto:‎ ${showMovieCredits(id)}</b></div>

<div class="separador"><b>➖➖➖➖➖➖➖➖➖➖</b></div>

<div class="sinopsis"><b>⟨💭⟩‎ Sinopsis:‎ ${overview}</b></div>

<div class="separador"><b>➖➖➖➖➖➖➖➖➖➖</b></div>

<div class="trailer"><b>⟨🎞️⟩‎ Trailer:‎ <a href="https://youtu.be/${getTrailerKey(id)}">https://youtu.be/${getTrailerKey(id)}</a></b></div>

<div class=""><b>‎ </b></div>

<div class="view_download"><b>⟨🔗⟩‎ Ver/Descargar:&nbsp;</b></div>

<div class="separador"><b>➖➖➖➖➖➖➖➖➖➖</b></div>

</div>
</div>
</div>`;
  });

  $("#results").html(resultsHtml);

  // Seleccionar todos los elementos con la clase 'movie-card__poster'
  const lazyImages = document.querySelectorAll('.movie-card__poster');

  // Opciones de configuración del IntersectionObserver
  const lazyImageOptions = {
   // Margen alrededor del viewport (0px indica que el margen es cero)
   rootMargin: '0px',
   // Umbral de visibilidad (0.1 significa que el 10% del elemento debe ser visible)
   threshold: 1
  };

  // Crear una instancia de IntersectionObserver con una función de devolución de llamada
  const lazyImageObserver = new IntersectionObserver((entries, observer) => {
   entries.forEach(entry => {
    if (entry.isIntersecting) {
     const lazyImage = entry.target;
     lazyImage.style.opacity = 1; // Mostramos la imagen al establecer la opacidad en 1
     lazyImage.style.backgroundImage = `url(${lazyImage.getAttribute('data-src')})`;
     lazyImageObserver.unobserve(lazyImage);
    }
   });
  }, lazyImageOptions);

  // Observar cada elemento con la clase 'movie-card__poster'
  lazyImages.forEach(lazyImage => {
   lazyImageObserver.observe(lazyImage);
  });
 }

 // Funcion: Obtener key del trailer de youtube
 function getTrailerKey(movieId) {
  var trailerKey = "";

  $.ajax({
   url: `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=fd7402172ca9f36816c7691becaf455f`,

   async: false,

   success: function(data) {
    var videos = data.results.filter(function(video) {
     return (
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.iso_639_1 === "en"
     );
    });

    if (videos.length > 0) {
     trailerKey = videos[0].key;
    }
   }
  });

  return trailerKey;
 }

 // Funcion: Traducir los generos
 function getGenres(genreIds) {
  var genres = {
   28: "#Accion",

   12: "#Aventura",

   16: "#Animacion",

   35: "#Comedia",

   80: "#Crimen",

   99: "#Documental",

   18: "#Drama",

   10751: "#Familiar",

   14: "#Fantasia",

   36: "#Historia",

   27: "#Terror",

   10402: "#Musica",

   9648: "#Misterio",

   10749: "#Romance",

   878: "#Ciencia_Ficcion",

   10770: "#Película_de_la_Television",

   53: "#Suspenso",

   10752: "#Belica",

   37: "#Oeste",

   10759: "#Accion_y_Aventura",

   10762: "#Infantil",

   10763: "#Noticias",

   10764: "#Realidad",

   10765: "#Ciencia_Ficcion_y_Fantasia",

   10766: "#Serial",

   10767: "#Conversacion",

   10768: "#Politico",

   10769: "#Opcion_Interactiva"
  };

  var genreList = [];

  genreIds.forEach(function(genreId) {
   if (genres[genreId]) {
    genreList.push(genres[genreId]);
   }
  });

  return genreList.join(",‎ ");
 }

 // Función: Traducir el lenguaje
 function getLanguage(languageCode) {
  var languages = {
   en: "🇺🇸‎ Ingles",

   ca: "🇪🇸‎ Catalan",

   es: "🇲🇽‎ /‎ 🇪🇸‎ Español",

   fr: "🇫🇷‎ Frances",

   de: "🇩🇪‎ Aleman",

   it: "🇮🇹‎ Italiano",

   ja: "🇯🇵‎ Japones",

   ko: "🇰🇷‎ /‎ 🇰🇵‎ Coreano",

   ru: "🇷🇺‎ Ruso",

   zh: "🇨🇳‎ Chino"
  };

  return languages[languageCode] || languageCode;
 }
});

// Funcion: Obtener actores
function showMovieCredits(movieId) {
 var movieCredits = '';

 $.ajax({
  url: `${BASE_URL}/movie/${movieId}/credits?${API_KEY}&${LANG_ES}`,
  async: false,
  success: function(response) {

   // Filtrar los actores más relevantes
   var relevantActors = response.cast.filter(function(actor) {
    return actor.order <= 2;
    // Puedes ajustar el numero de relevancia según tus preferencias, si quieres que aparezcan "3 actores" tienes que colocar como numero "2"
   });

   // Obtener solo los nombres de los actores y unirlos en un string
   var actorNames = relevantActors.map(function(actor) {
    return actor.name;
   });

   movieCredits = actorNames.join(", ");
   // Dividir los nombres de los actores

  },
  error: function(error) {
   console.log(error);
   // Algo no salió como esperábamos.
  }
 });

 return movieCredits;
}

// Funcion: Obtener poster de pelicula
function getPosterMovie(movieId) {
 var poster_URL = '';

 $.ajax({
  url: `${BASE_URL}/movie/${movieId}/images?${API_KEY}&include_image_language=es,en,null&${LANG_ES}`,
  async: false,
  success: function(response) {
   var posters = response.posters;

   // Ordenar los posters por popularidad de forma descendente
   posters.sort(function(a, b) {
    return b.popularity - a.popularity;
   });

   var posterPath = posters.find(function(poster) {
    return (
     poster.iso_639_1 === "en"
     // ||poster.iso_639_1 === "en"
     //|| poster.iso_639_1 === "null"
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
function getBackdropMovie(movieId) {
 var backdrop_URL = '';

 $.ajax({
  url: `${BASE_URL}/movie/${movieId}/images?${API_KEY}&include_image_language=es,en,null&${LANG_ES}`,
  async: false,
  success: function(response) {
   var backdrops = response.backdrops;

   // Ordenar los backdrops por popularidad de forma descendente
   backdrops.sort(function(a, b) {
    return b.popularity - a.popularity;
   });

   var backdropPath = backdrops.find(function(backdrop) {
    return (
     backdrop.iso_639_1 === "en" ||
     backdrop.iso_639_1 === "es" ||
     backdrop.iso_639_1 === "ca" ||
     backdrop.iso_639_1 === "ja" ||
     backdrop.iso_639_1 === "br" ||
     backdrop.iso_639_1 === "fr" ||
     backdrop.iso_639_1 === "de" ||
     backdrop.iso_639_1 === "it" ||
     backdrop.iso_639_1 === "ko" ||
     backdrop.iso_639_1 === "ru" ||
     backdrop.iso_639_1 === "zh" ||
     backdrop.iso_639_1 === "pt" ||
     backdrop.iso_639_1 === "nl" ||
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


// Función: Obtener la duración de la película.
function getDurationMovie(movieId) {
 var movieDuration = '';

 $.ajax({
  url: `${BASE_URL}/movie/${movieId}?${API_KEY}&${LANG_ES}`,
  async: false,
  success: function(response) {
   var duracion = response.runtime;
   var horas = Math.floor(duracion / 60);
   var minutos = duracion % 60;

   movieDuration = `${horas}h ${minutos}m`;
  },
  error: function(error) {
   console.log(error);
   // Algo no salió como esperábamos, mi sensual gamer.
  }
 });

 return movieDuration;
}

function videoTitle(frase) {
 return frase
  .replace(/\*/g, '')
  .replace(/-/g, '')
  .replace(/\$/g, '')
  .replace(/¡/g, '')
  .replace(/!/g, '')
  .replace(/,/g, '')
  .replace(/\?/g, '')
  .replace(/¿/g, '')
  .replace(/%/g, '')
  .replace(/&/g, '')
  .replace(/\'/g, '')
  .replace(/:/g, '')

  .replace(/ñ/g, 'n')
  .replace(/ń/g, 'n')

  .replace(/ć/g, 'c')
  .replace(/ç/g, 'c')
  .replace(/č/g, 'c')

  .replace(/á/g, 'a')
  .replace(/æ/g, 'a')
  .replace(/ā/g, 'a')
  .replace(/â/g, 'a')
  .replace(/ã/g, 'a')
  .replace(/å/g, 'a')
  .replace(/ą/g, 'a')
  .replace(/ä/g, 'a')
  .replace(/à/g, 'a')

  .replace(/é/g, 'e')
  .replace(/ė/g, 'e')
  .replace(/ê/g, 'e')
  .replace(/ę/g, 'e')
  .replace(/ē/g, 'e')
  .replace(/è/g, 'e')
  .replace(/é/g, 'e')
  .replace(/ë/g, 'e')

  .replace(/í/g, 'i')
  .replace(/ī/g, 'i')
  .replace(/î/g, 'i')
  .replace(/į/g, 'i')
  .replace(/ì/g, 'i')
  .replace(/ï/g, 'i')
  .replace(/í/g, 'i')

  .replace(/ó/g, 'o')
  .replace(/õ/g, 'o')
  .replace(/ō/g, 'o')
  .replace(/œ/g, 'o')
  .replace(/ø/g, 'o')
  .replace(/õ/g, 'o')
  .replace(/ô/g, 'o')
  .replace(/ö/g, 'o')
  .replace(/ò/g, 'o')

  .replace(/ú/g, 'u')
  .replace(/ū/g, 'u')
  .replace(/ù/g, 'u')
  .replace(/û/g, 'u')
  .replace(/ü/g, 'u')
  .replace(/ú/g, 'u');
}