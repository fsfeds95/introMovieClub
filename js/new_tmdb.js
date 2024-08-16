//TMDB
var today = new Date();
var ano = today.getFullYear();

const API_KEY = 'api_key=fd7402172ca9f36816c7691becaf455f';

const BASE_URL = 'https://api.themoviedb.org/3';
// Resolución de imagenes
const IMG_ORI = 'https://image.tmdb.org/t/p/original';
const IMG_500 = 'https://image.tmdb.org/t/p/w500';
const IMG_300 = 'https://image.tmdb.org/t/p/w300';
const IMG_185 = 'https://image.tmdb.org/t/p/w185';
const IMG_92 = 'https://image.tmdb.org/t/p/w92';

const LANG_ES = '&language=es-MX';
const LANG_EN = '&language=en-US';

//const API_URL = BASE_URL+'/discover/movie?primary_release_year=2023&'+API_KEY+LANG_ES;
const API_URL = BASE_URL + '/discover/movie?primary_release_year=' + ano + '&' + API_KEY + LANG_ES;
//const API_URL = BASE_URL+'/discover/movie?'+API_KEY+'&append_to_response=videos'+ LANG_ES;

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const anio = document.getElementById('years');
const main = document.getElementById('main');


const genres = [
 {
  "id": 28,
  "name": "Acción"
  }, {
  "id": 12,
  "name": "Aventura"
  }, {
  "id": 16,
  "name": "Animación"
  }, {
  "id": 35,
  "name": "Comedia"
  }, {
  "id": 80,
  "name": "Crimen"
  }, {
  "id": 99,
  "name": "Documental"
  }, {
  "id": 18,
  "name": "Drama"
  }, {
  "id": 10751,
  "name": "Familia"
  }, {
  "id": 14,
  "name": "Fantasía"
  }, {
  "id": 36,
  "name": "Historia"
  }, {
  "id": 27,
  "name": "Terror"
  }, {
  "id": 10402,
  "name": "Música"
  }, {
  "id": 9648,
  "name": "Misterio"
  }, {
  "id": 10749,
  "name": "Romance"
  }, {
  "id": 878,
  "name": "Ciencia ficción"
  }, {
  "id": 10770,
  "name": "Película de TV"
  }, {
  "id": 53,
  "name": "Suspenso"
  }, {
  "id": 10752,
  "name": "Bélica"
  }, {
  "id": 37,
  "name": "Western"
  }
];

getMovies(API_URL);

async function getMovies(url) {
 try {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results);
  showMovies(data.results);
 } catch (error) {
  console.log(error);
 }
}

async function showMovies(data) {
 main.innerHTML = '';

 for (const movie of data) {
  const { key, site, type, title, original_language, release_dates, original_title, backdrop_path, poster_path, release_date, vote_average, overview, id, genre_ids, runtime, runTime } = movie;
  const genreIdToName = (id) => genres.find(g => g.id === id).name;
  var replaceTitle = { ":": "", " ": "_", "-": "_", "¡": "", "!": "", ",": "", "¿": "" };
  var replaceLang = {
   "en": "🇺🇸 Ingles",
   "fr": "🇫🇷 Frances",
   "it": "🇮🇹 Italiano",
   "de": "🇩🇪 Aleman",
   "ja": "🇯🇵 Japones",
   "es": "🇲🇽 / 🇪🇦 Español",
   "ko": "🇰🇷 / 🇰🇵 Coreano",
   "pt": "🇵🇹 / 🇧🇷 Portugués"
  };

  const moviesEL = document.createElement('div');
  moviesEL.classList.add('movie');
  moviesEL.innerHTML = `
    <div class="movie-card">
      <div class="movie-card__header" style="background-image: url(${IMG_ORI + await getBackdropMovie(id)})">
        <span class="movie-card_genre">
          <a href="https://www.themoviedb.org/movie/${id}/" target="_blank">
            Toda la información
          </a>
        </span>
      </div>
      <div class="movie-card_content">
       <div class="movie-card__poster" data-src="${IMG_300 + await getPosterMovie(id)}">
       </div>
        <div class="d">
        <div class="contenedor border">
          <div class="titulo_es">
            <b>🍿  ${title} </b>
          </div>
          <div class="titulo_en">📽 <i>${original_title}</i></div>
          <div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>
          <div class="puntuacion"><b>🔝  Puntuación TMDB | </b> <span class="vote_average" style="background:${getColor(vote_average)};"><b>${vote_average}</b></span></div>
          <div>&nbsp;</div>
          <div class="genero"><b>🎭                      Género | </b>  ${genre_ids.map(id => `${genreIdToName(id)}`).join(', ')} </div>
          <div>&nbsp;</div>
          <div class="ano"><b>🗓                            Año | </b> <i>${release_date.substring(4,0)}</i></div>
          <div>&nbsp;</div>
          <div class="idioma"><b>🗣        Idioma Original |</b>  ${original_language.replace(/en|fr|it|de|ja|es|ko/g,function(match) {return replaceLang[match];})} </div>
          <div>&nbsp;</div>
<div><b>👤 Reparto |</b> ${await showMovieCredits(id)}</div>
<div>&nbsp;</div>
<div><b>📣 Director |</b> ${await showMovieDirectors(id)}</div>
<div>&nbsp;</div>
<div><b>🎬 Productores |</b> ${await showMovieProducers(id)}</div>
<div>&nbsp;</div>
<div><b>✍ Escritores y Gionistas |</b> ${await showMovieWriters(id)}</div>
<div>&nbsp;</div>
          <div class="Sinopsis"><b>📝                   Sinopsis | </b> <code> ${overview} </code></div>
<div>&nbsp;</div>

<div><b>Duración |</b> ${await getDurationMovie(id)}</div>

        </div>
      </div>
    </div>
  </div>`;

  main.appendChild(moviesEL);
 }

 // Seleccionar todos los elementos con la clase 'movie-card__poster'
 const lazyImages = document.querySelectorAll('.movie-card__poster');

 // Opciones de configuración del IntersectionObserver
 const lazyImageOptions = {
  rootMargin: '0px',
  threshold: 0.01,
  delay: 500 // Retraso en milisegundos antes de activar el lazyimage
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

// ...

//document.getElementById("years").innerHTML = '<center>Peliculas del año: 2023</center>';
document.getElementById("years").innerHTML = '<center>Peliculas del año: ' + ano + '</center>';

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


//-----------------------------------------
//----------------------------------------
//-----------------------------------------
//-----------------------------------------





// Función: Obtener la duración de la película.
async function getDurationMovie(movieId) {
 try {
  const res = await $.ajax({
   url: `${BASE_URL}/movie/${movieId}?${API_KEY}&${LANG_ES}`,
   async: false
  });
  const duracion = res.runtime;
  const horas = Math.floor(duracion / 60);
  const minutos = duracion % 60;
  return `${horas}h ${minutos}m`;
 } catch (error) {
  console.log(error);
  return "Duración no disponible";
 }
}

// Funcion actores ------------------------
async function showMovieCredits(movieId) {
 try {
  const res = await $.ajax({
   url: `${BASE_URL}/movie/${movieId}/credits?${API_KEY}&${LANG_ES}`,
   async: false
  });

  // Filtrar los actores más relevantes
  const relevantActors = res.cast.filter(function(actor) {
   return actor.order <= 5;
  });

  // Obtener solo los nombres de los actores y unirlos en un string
  const actorNames = relevantActors.map(function(actor) {
   return actor.name;
  });

  return actorNames.join(", ");
 } catch (error) {
  console.log(error);
  return "Reparto no disponible";
 }
}

// Funcion directores ---------------------
async function showMovieDirectors(movieId) {
 try {
  const res = await $.ajax({
   url: `${BASE_URL}/movie/${movieId}/credits?${API_KEY}&${LANG_EN}`,
   async: false
  });

  // Obtener los directores de la película
  const directors = res.crew.filter(function(crewMember) {
   return crewMember.job === "Director";
  });

  if (directors.length > 0) {
   return directors[0].name; // Obtener el nombre del primer director
  } else {
   return "El director es un misterio.";
  }
 } catch (error) {
  console.log(error);
  return "Director no disponible";
 }
}

// Funcion Productores --------------------
async function showMovieProducers(movieId) {
 try {
  const res = await $.ajax({
   url: `${BASE_URL}/movie/${movieId}/credits?${API_KEY}&${LANG_ES}`,
   async: false
  });

  // Filtrar los productores más relevantes
  const relevantProducers = res.crew.filter(function(crewMember) {
   return crewMember.job === "Producer";
  });

  // Filtrar los productores ejecutivos si no hay productores regulares
  if (relevantProducers.length === 0) {
   relevantProducers = res.crew.filter(function(crewMember) {
    return crewMember.job === "Executive Producer";
   });
  }

  // Obtener los nombres y los cargos de los productores
  const producerInfo = relevantProducers.map(function(producer) {
   const jobTitle = producer.job === "Executive Producer" ? "<i>Productor Ejecutivo</i>" : "<i>Productor</i>";
   return `${producer.name} (${jobTitle})`;
  });

  if (producerInfo.length > 0) {
   return producerInfo.join(", ");
  } else {
   return "Productores no encontrados.";
  }
 } catch (error) {
  console.log(error);
  return "Productores no disponibles";
 }
}

// Funcion escritores ---------------------
async function showMovieWriters(movieId) {
 try {
  const res = await $.ajax({
   url: `${BASE_URL}/movie/${movieId}/credits?${API_KEY}&${LANG_ES}`,
   async: false
  });

  // Obtener los escritores de la película
  const writers = res.crew.filter(function(crewMember) {
   return crewMember.job === "Writer";
  });

  if (writers.length > 0) {
   const uniqueWriters = Array.from(new Set(writers.map(writer => writer.name)));
   const regularWriters = [];
   const storyAndScreenplayWriters = [];

   uniqueWriters.forEach(function(writer) {
    const jobTitles = writers.filter(function(w) {
     return w.name === writer;
    }).map(function(w) {
     return w.job === "Screenplay" ? "Guión" : "Historia";
    }).join(" y ");

    if (jobTitles.includes("Historia") && jobTitles.includes("Guión")) {
     storyAndScreenplayWriters.push(`${writer} (${jobTitles})`);
    } else {
     regularWriters.push(`${writer} (${jobTitles})`);
    }
   });

   return storyAndScreenplayWriters.concat(regularWriters).join(", ");
  } else {
   const storyWriters = res.crew.filter(function(crewMember) {
    return crewMember.job === "Story";
   });

   const screenplayWriters = res.crew.filter(function(crewMember) {
    return crewMember.job === "Screenplay";
   });

   const uniqueWriters = Array.from(new Set(storyWriters.concat(screenplayWriters).map(writer => writer.name)));
   return uniqueWriters.map(function(writer) {
    const jobTitles = storyWriters.concat(screenplayWriters).filter(function(w) {
     return w.name === writer;
    }).map(function(w) {
     return w.job === "Screenplay" ? "Guión" : "Historia";
    }).join(" y ");
    return `${writer} (${jobTitles})`;
   }).join(", ");
  }
 } catch (error) {
  console.log(error);
  return "Escritores no disponibles";
 }
}

// Función Poster -------------------------
async function getPosterMovie(movieId) {
 try {
  const response = await $.ajax({
   url: `${BASE_URL}/movie/${movieId}/images?${API_KEY}&include_image_language=en&${LANG_ES}`,
  });

  // Ordenar los posters por popularidad de forma descendente
  const posters = response.posters.sort((a, b) => b.popularity - a.popularity);

  // Buscar el poster en inglés
  const posterPath = posters.find(poster => poster.iso_639_1 === "en");

  if (posterPath) {
   return posterPath.file_path;
  } else {
   return '';
  }
 } catch (error) {
  console.log('Ay, mi amor, algo salió mal:', error);
  return '';
 }
}

// Función Backdrop -----------------------
async function getBackdropMovie(movieId) {
 try {
  const response = await $.ajax({
   url: `${BASE_URL}/movie/${movieId}/images?${API_KEY}&include_image_language=en&${LANG_ES}`,
  });

  // Ordenar los backdrops por popularidad de forma descendente
  const backdrops = response.backdrops.sort((a, b) => b.popularity - a.popularity);

  // Buscar el backdrop en los idiomas preferidos
  const backdropPath = backdrops.find(backdrop => (
   backdrop.iso_639_1 === "en"
  ));

  if (backdropPath) {
   return backdropPath.file_path;
  } else {
   return '';
  }
 } catch (error) {
  console.log('Ay, mi amor, algo salió mal:', error);
  return '';
 }
}