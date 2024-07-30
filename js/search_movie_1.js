const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_ORIGINAL = 'https://image.tmdb.org/t/p/original';
const IMG_500 = 'https://image.tmdb.org/t/p/w500';
const API_KEY = 'api_key=74dc824830c7f93dc61b03e324070886';
const query = 'query=';
const LANG_ES = 'language=es-MX';
const LANG_EN = 'language=en-US';


$(document).ready(function() {
 $("#searchButton").click(function() {
  var searchQuery = $("#searchInput").val();

  searchMovies(searchQuery);
 });

 function searchMovies(querySearch) {
  if (querySearch == "") {
   $("#results").html("<p>Ingrese un título de película para buscar.</p>");
  } else {
   $.getJSON(
    BASE_URL + '/search/movie?' + API_KEY + '&' + query + querySearch + '&' + LANG_ES,
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

   var language = movie.original_language;

   var overview = movie.overview;

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

   var movieCredits = showMovieCredits(id);

   resultsHtml += `        <div class="movie-card">
                        <div class="movie-card__header" style="background-image: url(${IMG_500+backdropPath})">
                                <span class="movie-card_genre">
                                        ID: ${id}
                                </span>
                                <span class="movie-card_genre">
                                        <a href="https://wmapof.cyclic.app/p?url=${IMG_ORIGINAL+posterPath}" target="_blank">
                                                Poster
                                        </a>
                                </span>
                                <span class="movie-card_genre">
                                        <a href="https://wmapof.cyclic.app/b?url=${IMG_ORIGINAL+backdropPath}" target="_blank">
                                                Backdrop
                                        </a>
                                </span>
                                <span class="movie-card_genre">
                                        <a href="https://www.themoviedb.org/movie/${id}/" target="_blank">
                                                Toda la información
                                        </a>
                                </span>
                        </div>
                <div class="movie-card_content">
                                
    <div class="movie-card__poster" data-src="${IMG_500+posterPath}"></div>
                        <div class="d">


        <button class="copy" onclick="copyTextById('peli_${id}_1', this)"><i class="fa-regular fa-clipboard"></i> Copiar</button>
                                <div class="contenedor border" id="peli_${id}_1">${title.replace(/:|\s|-|!|¡|,|¿/g, function (match) {
      return replaceTitle[match];
     })}_(${releaseYear})_540p_dual-lat_@AstroPeliculasOf.mp4</div>
        
        
        <button class="copy" onclick="copyTextById('peli_${id}_2', this)"><i class="fa-regular fa-clipboard"></i> Copiar</button>
                                <div class="contenedor border" id="peli_${id}_2">
                                        <div class="titulo_es">
                                                <b>
                                                        🔠&nbsp;&#42;&#42;#${title.replace(/:|\s|-|!|¡|,|¿/g, function(match) {return replaceTitle[match];})
        .substring(1, 0)}&#42;&#42;
                                                </b>
                                        </div>
                                        <div class="titulo_es">
                                                <b>
                                                        🍿&nbsp;&#42;&#42;${title}&#42;&#42;
                                                </b>
                                        </div>
                                        <div class="titulo_en"><b>📽&nbsp;&#95;&#95;<i>${originalTitle}</i>&#95;&#95;</b></div>
                                        <div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>
                                        <div class="genero"><b>🎭&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;&#42;Género&nbsp;|&#42;&#42;</b>&nbsp;${getGenres(movie.genre_ids)}</div><div>&nbsp;</div>
                                        <div class="ano"><b>🗓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;&#42;Año&nbsp;|&#42;&#42;</b>&nbsp;&#95;&#95;<i>${releaseYear}</i>&#95;&#95;</div><div>&nbsp;</div>
                                        <div class="calidad"><b>📺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;&#42;Calidad&nbsp;|&#42;&#42;&nbsp;&#42;&#42;#540p&#42;&#42;</b></div><div>&nbsp;</div>
                                        <div class="idioma"><b>🗣&nbsp;&#42;&#42;Idioma Original&nbsp;|&#42;&#42;&nbsp;${getLanguage(language)}</b></div><div>&nbsp;</div>
                                        <div class="audio"><b>🎧&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;&#42;Audio&nbsp;|&#42;&#42;&nbsp;🇲🇽&nbsp;&#42;&#42;#Latino&#42;&#42;</b></div><div>&nbsp;</div>
<div><b>👤&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;&#42;Cast&nbsp;|&#42;&#42;&nbsp;&#42;&#42;${movieCredits}&#42;&#42;</b></div>
<div>&nbsp;</div>
<div><b>Director | ${showMovieDirectors(id)}</b></div>
<div>&nbsp;</div>
<div><b>Productores | ${showMovieProducers(id)}</b></div>
<div>&nbsp;</div>
<div><b>Escritor | ${showMovieWriters(id)}</b></div>
<div>&nbsp;</div>
                                        <div class="Sinopsis"><code>&#96;&#96;&#96;📝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sinopsis&nbsp;|<br>${overview}&#96;&#96;&#96;</code></div>
                                        <div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>
                                        <div class="redes"><b>▫️&nbsp;&#42;&#42;Síguenos&#42;&#42;&nbsp;@AstroPeliculasOf</b></div></div>
                                
                                
                                <button class="copy" onclick="copyTextById('peli_${id}_3', this)"><i class="fa-regular fa-clipboard"></i> Copiar</button>
                                <div class="contenedor border" id="peli_${id}_3">
                                  <div class="trailer">📘&nbsp;TheMovieDB&nbsp;📘&nbsp;-&nbsp;https://www.themoviedb.org/movie/${id}/&nbsp;&&&nbsp;📽&nbsp;Trailer&nbsp;Oficial&nbsp;📽&nbsp;-&nbsp;https://youtu.be/${getTrailerKey(id)}</div>
                                        <div class="canal_contenedor">👨‍🚀&nbsp;Cᴏɴᴛᴇɴᴇᴅᴏʀ&nbsp;👨‍🚀&nbsp;-&nbsp;https://t.me/+3fe6UvaLvKk2MGVh</div>
                                        <div class="ver_descargar">➡️&nbsp;Vᴇʀ&nbsp;/&nbsp;Dᴇsᴄᴀʀɢᴀʀ&nbsp;⬅️&nbsp;-&nbsp;https://t.me/c/1972636331/</div>
                                        <div class="compartir">↗️&nbsp;Comparte&nbsp;↗️&nbsp;-&nbsp;share:Ve&nbsp;la&nbsp;película:&nbsp;${title}&nbsp;en&nbsp;https://t.me/AstroPeliculasOf/</div>
                                        </div>
                                        
                                        
                                <button class="copy" onclick="copyTextById('peli_${id}_4', this)"><i class="fa-regular fa-clipboard"></i> Copiar</button>
                                <div class="contenedor border" id="peli_${id}_4">
                                        <div class="titulo_es"><b>🍿&nbsp;&#42;&#42;${title}&#42;&#42;</b></div>
                                        <div class="titulo_en"><b>📽&nbsp;&#95;&#95;<i>${originalTitle}</i>&#95;&#95;</b></div>
                                        <div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>
                                        <div class="ano"><b>🗓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;&#42;Año&nbsp;|&#42;&#42;</b>&nbsp;&#95;&#95;${releaseYear}&#95;&#95;</div><div>&nbsp;</div>
                                        <div class="calidad"><b>📺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;&#42;Calidad&nbsp;|&#42;&#42;&nbsp;&#42;&#42;#540p&#42;&#42;</b></div><div>&nbsp;</div>
                                        <div class="idioma"><b>🗣&nbsp;&nbsp;&nbsp;&nbsp;&#42;&#42;Idioma Original&nbsp;|&#42;&#42;&nbsp;${getLanguage(language)}</b></div><div>&nbsp;</div>
                                        <div class="audio"><b>🎧&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;&#42;Audio&nbsp;|&#42;&#42;&nbsp;🇲🇽&nbsp;&#42;&#42;#Latino&#42;&#42;</b></div>
                                        <div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>
                                        <div class="redes"><b>▫️&nbsp;&#42;&#42;Síguenos&#42;&#42;&nbsp;@AstroPeliculasOf</b></div>
                                </div>
                                <button class="copy" onclick="copyTextById('peli_${id}_5', this)"><i class="fa-regular fa-clipboard"></i> Copiar</button>
                                <div class="contenedor border" id="peli_${id}_5">
                                        <div class="trailer">📘&nbsp;TheMovieDB&nbsp;📘&nbsp;-&nbsp;https://www.themoviedb.org/movie/${id}/&nbsp;&&&nbsp;📽&nbsp;Trailer&nbsp;Oficial&nbsp;📽&nbsp;-&nbsp;https://youtu.be/${getTrailerKey(id)}</div>
                                        <div class="canal_principal">🌎&nbsp;Canal&nbsp;Principal&nbsp;🌎&nbsp;-&nbsp;@AstroPeliculasOf</div>
                        </div>
                </div>
        </div>`;
  });

  $("#results").html(resultsHtml);



  // Seleccionar todos los elementos con la clase 'movie-card__poster'
  const lazyImages = document.querySelectorAll('.movie-card__poster');

  // Opciones de configuración del IntersectionObserver
  const lazyImageOptions = {
   rootMargin: '0px', // Margen alrededor del viewport (0px indica que el margen es cero)
   threshold: 0.1 // Umbral de visibilidad (0.1 significa que el 10% del elemento debe ser visible)
  };

  // Crear una instancia de IntersectionObserver con una función de devolución de llamada
  const lazyImageObserver = new IntersectionObserver((entries, observer) => {
   entries.forEach(entry => {
    if (entry.isIntersecting) { // Verificar si el elemento es visible en la pantalla
     const lazyImage = entry.target; // Obtener el elemento actual
     lazyImage.style.backgroundImage = `url(${lazyImage.getAttribute('data-src')})`; // Asignar la URL de la imagen como fondo
     lazyImageObserver.unobserve(lazyImage); // Dejar de observar el elemento para evitar cargarlo nuevamente
    }
   });
  }, lazyImageOptions);

  // Observar cada elemento con la clase 'movie-card__poster'
  lazyImages.forEach(lazyImage => {
   lazyImageObserver.observe(lazyImage);
  });



 }

 function getGenres(genreIds) {
  var genres = {
   28: "&#42;&#42;#Accion&#42;&#42;",

   12: "&#42;&#42;#Aventura&#42;&#42;",

   16: "&#42;&#42;#Animacion&#42;&#42;",

   35: "&#42;&#42;#Comedia&#42;&#42;",

   80: "&#42;&#42;#Crimen&#42;&#42;",

   99: "&#42;&#42;#Documental&#42;&#42;",

   18: "&#42;&#42;#Drama&#42;&#42;",

   10751: "&#42;&#42;#Familiar&#42;&#42;",

   14: "&#42;&#42;#Fantasia&#42;&#42;",

   36: "&#42;&#42;#Historia&#42;&#42;",

   27: "&#42;&#42;#Terror&#42;&#42;",

   10402: "&#42;&#42;#Musica&#42;&#42;",

   9648: "&#42;&#42;#Misterio&#42;&#42;",

   10749: "&#42;&#42;#Romance&#42;&#42;",

   878: "&#42;&#42;#Ciencia_Ficcion&#42;&#42;",

   10770: "&#42;&#42;#Película_de_la_Television&#42;&#42;",

   53: "&#42;&#42;#Suspenso&#42;&#42;",

   10752: "&#42;&#42;#Belica&#42;&#42;",

   37: "&#42;&#42;#Oeste&#42;&#42;",

   10759: "&#42;&#42;#Accion_y_Aventura&#42;&#42;",

   10762: "&#42;&#42;#Infantil&#42;&#42;",

   10763: "&#42;&#42;#Noticias&#42;&#42;",

   10764: "&#42;&#42;#Realidad&#42;&#42;",

   10765: "&#42;&#42;#Ciencia_Ficcion_y_Fantasia&#42;&#42;",

   10766: "&#42;&#42;#Serial&#42;&#42;",

   10767: "&#42;&#42;#Conversacion&#42;&#42;",

   10768: "&#42;&#42;#Politico&#42;&#42;",

   10769: "&#42;&#42;#Opcion_Interactiva&#42;&#42;"
  };

  var genreList = [];

  genreIds.forEach(function(genreId) {
   if (genres[genreId]) {
    genreList.push(genres[genreId]);
   }
  });

  return genreList.join("<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
 }

 function getLanguage(languageCode) {
  var languages = {
   en: "🇺🇸&nbsp;&#42;&#42;#Ingles&#42;&#42;",

   ca: "🇪🇸&nbsp;&#42;&#42;#Catalan&#42;&#42;",

   es: "🇲🇽/🇪🇸&nbsp;&#42;&#42;#Español&#42;&#42;",

   fr: "🇫🇷&nbsp;&#42;&#42;#Frances&#42;&#42;",

   de: "🇩🇪&nbsp;&#42;&#42;#Aleman&#42;&#42;",

   it: "🇮🇹&nbsp;&#42;&#42;#Italiano&#42;&#42;",

   ja: "🇯🇵&nbsp;&#42;&#42;#Japones&#42;&#42;",

   ko: "🇰🇷 / 🇰🇵&nbsp;&#42;&#42;#Coreano&#42;&#42;",

   ru: "🇷🇺&nbsp;&#42;&#42;#Ruso&#42;&#42;",

   zh: "🇨🇳&nbsp;&#42;&#42;#Chino&#42;&#42;"
  };

  return languages[languageCode] || languageCode;
 }
});

function getColor(vote) {
 if (vote >= 10) {
  return '#63b800'
 } else if (vote >= 7.5) {
  return '#c3d800'
 } else if (vote >= 5) {
  return '#fff457'
 } else if (vote >= 2.5) {
  return '#fffbb2'
 } else {
  return '#fffbf4'
 }
}

function getTrailerKey(movieId) {
 var trailerKey = "";

 $.ajax({
  url: `${BASE_URL}/movie/${movieId}/videos?${API_KEY}&${LANG_EN}`,
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

 //¡Aquí tienes el trailer key, mi amor! Ahora podrás disfrutar de un adelanto de la película que tanto te gusta.

 //console.log("El trailer key es: http://www.youtube.com/watch?v=" + trailerKey);

 return trailerKey;
}


//-----------------------------------------
//-----------------------------------------
//-----------------------------------------
//-----------------------------------------



// Funcion actores ------------------------
function showMovieCredits(movieId) {
 var movieCredits = '';

 $.ajax({
  url: `${BASE_URL}/movie/${movieId}/credits?${API_KEY}&${LANG_ES}`,
  async: false,
  success: function(response) {

   // Filtrar los actores más relevantes
   var relevantActors = response.cast.filter(function(actor) {
    return actor.order <= 5;
    // Puedes ajustar el numero de relevancia según tus preferencias, si quieres que aparezcan "3 actores" tienes que colocar como numero "2"
   });

   // Obtener solo los nombres de los actores y unirlos en un string
   var actorNames = relevantActors.map(function(actor) {
    return actor.name;
   });

   movieCredits = actorNames.join("&#42;&#42;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;&#42;");
   // Dividir los nombres de los actores

  },
  error: function(error) {
   console.log(error);
   // Algo no salió como esperábamos.
  }
 });

 return movieCredits;
}

// Funcion directores ---------------------
function showMovieDirectors(movieId) {
 var movieDirector = '';

 $.ajax({
  url: `${BASE_URL}/movie/${movieId}/credits?${API_KEY}&${LANG_EN}`,
  async: false,
  success: function(response) {

   // Obtener los directores de la película
   var directors = response.crew.filter(function(crewMember) {
    return crewMember.job === "Director";
   });

   if (directors.length > 0) {
    movieDirector = directors[0].name; // Obtener el nombre del primer director
   } else {
    movieDirector = "El director es un misterio.";
   }

  },
  error: function(error) {
   console.log(error);
   // Algo no salió como esperábamos.
  }
 });

 return movieDirector;
}

// Funcion Productores --------------------
function showMovieProducers(movieId) {
 var movieProducers = '';

 $.ajax({
  url: `${BASE_URL}/movie/${movieId}/credits?${API_KEY}&${LANG_ES}`,
  async: false,
  success: function(response) {

   // Filtrar los productores más relevantes
   var relevantProducers = response.crew.filter(function(crewMember) {
    return crewMember.job === "Producer";
   });

   // Filtrar los productores ejecutivos si no hay productores regulares
   if (relevantProducers.length === 0) {
    relevantProducers = response.crew.filter(function(crewMember) {
     return crewMember.job === "Executive Producer";
    });
   }

   // Obtener los nombres y los cargos de los productores
   var producerInfo = relevantProducers.map(function(producer) {
    var jobTitle = producer.job === "Executive Producer" ? "<i>Productor Ejecutivo</i>" : "<i>Productor</i>";
    return `${producer.name} (${jobTitle})`;
   });

   if (producerInfo.length > 0) {
    movieProducers = producerInfo.join(", ");
    // Dividir los nombres y los cargos de los productores
   } else {
    movieProducers = "Productores no encontrados.";
   }

  },
  error: function(error) {
   console.log(error);
   // Algo no salió como esperábamos.
  }
 });

 return movieProducers;
}

// Funcion escritores ---------------------
function showMovieWriters(movieId) {
 var movieWriters = '';

 $.ajax({
  url: `${BASE_URL}/movie/${movieId}/credits?${API_KEY}&${LANG_ES}`,
  async: false,
  success: function(response) {

   // Obtener los escritores de la película
   var writers = response.crew.filter(function(crewMember) {
    return crewMember.job === "Writer";
   });

   if (writers.length > 0) {
    movieWriters = writers.map(function(writer) {
     var jobTitle = writer.job === "Screenplay" ? "Guionista" : "Historia";
     return `${writer.name} (${jobTitle})`;
    }).join(", ");
    // Obtener los nombres de los escritores y sus títulos en español, separados por coma
   } else {
    var storyWriters = response.crew.filter(function(crewMember) {
     return crewMember.job === "Story";
    });

    var screenplayWriters = response.crew.filter(function(crewMember) {
     return crewMember.job === "Screenplay";
    });

    var storyAndScreenplayWriters = storyWriters.concat(screenplayWriters);

    movieWriters = storyAndScreenplayWriters.map(function(writer) {
     var jobTitle = writer.job === "Screenplay" ? "Guionista" : "Historia";
     return `${writer.name} (${jobTitle})`;
    }).join(", ");
    // Si no hay escritores regulares, mostramos los escritores de "Historia y Guion" con sus títulos en español
   }

  },
  error: function(error) {
   console.log(error);
   // Algo no salió como esperábamos.
  }
 });

 return movieWriters;
}