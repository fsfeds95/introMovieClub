//TMDB
var today = new Date();
var ano = today.getFullYear();

const API_KEY = 'api_key=fd7402172ca9f36816c7691becaf455f';

const BASE_URL = 'https://api.themoviedb.org/3';

const LANG_ES = '&language=es-MX';
const LANG_EN = '&language=en-US';


//https://api.themoviedb.org/3/trending/all/week?api_key=74dc824830c7f93dc61b03e324070886&language=es-MX

const API_URL = BASE_URL+'/trending/movie/week?api_key=74dc824830c7f93dc61b03e324070886&language=es-MX';
//const API_URL = BASE_URL+'/discover/movie?'+API_KEY+'&append_to_response=videos'+ LANG_ES;

const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const IMG_500 = 'https://image.tmdb.org/t/p/w500';

const anio = document.getElementById('years');
const main = document.getElementById('main');


const genres = [
  {
    "id": 28,
    "name": "Acción"
        },
  {
    "id": 12,
    "name": "Aventura"
        },
  {
    "id": 16,
    "name": "Animación"
        },
  {
    "id": 35,
    "name": "Comedia"
        },
  {
    "id": 80,
    "name": "Crimen"
        },
  {
    "id": 99,
    "name": "Documental"
        },
  {
    "id": 18,
    "name": "Drama"
        },
  {
    "id": 10751,
    "name": "Familia"
        },
  {
    "id": 14,
    "name": "Fantasía"
        },
  {
    "id": 36,
    "name": "Historia"
        },
  {
    "id": 27,
    "name": "Terror"
        },
  {
    "id": 10402,
    "name": "Música"
        },
  {
    "id": 9648,
    "name": "Misterio"
        },
  {
    "id": 10749,
    "name": "Romance"
        },
  {
    "id": 878,
    "name": "Ciencia ficción"
        },
  {
    "id": 10770,
    "name": "Película de TV"
        },
  {
    "id": 53,
    "name": "Suspenso"
        },
  {
    "id": 10752,
    "name": "Bélica"
        },
  {
    "id": 37,
    "name": "Western"
        }];

getMovies(API_URL);

function getMovies(url) {

  fetch(url).then(res => res.json()).then(data => {
    //console.log(data)
    console.log(data.results)
    showMovies(data.results)
  })

};

function showMovies(data) {
  main.innerHTML = '';

  data.forEach(movie => {
    const {
      backdrop_path,
      id,
      title,
      original_language,
      original_title,
      overview,
      poster_path,
      media_type,
      genre_ids,
      popularity,
      release_date,
      video,
      vote_average,
      vote_count
    } = movie;
    const genreIdToName = (id) => genres.find(g => g.id === id).name
    var replaceTitle = { ":": "", " ": "_", "-": "_", "¡": "", "!": "", ",": "", "¿": "" };
    var replaceLang = {
      "en": "🇺🇸  Ingles",
      "fr": "🇫🇷  Frances",
      "it": "🇮🇹  Italiano",
      "de": "🇩🇪  Aleman",
      "ja": "🇯🇵  Japones",
      "es": "🇲🇽 / 🇪🇦  Español",
      "ko": "🇰🇷 / 🇰🇵  Coreano"
    };
    const moviesEL = document.createElement('div');
    moviesEL.classList.add('movie');
    moviesEL.innerHTML = `
          <div class="movie-card">
            <div class="movie-card__header" style="background-image: url(${IMG_URL+backdrop_path})">
              <span class="movie-card_genre">
                <a href="https://www.themoviedb.org/movie/${id}/" target="_blank">
                  Toda la información
                </a>
              </span>
            </div>
            <div class="movie-card_content">
              <a href="${IMG_URL+poster_path}">
                <div class="movie-card__poster" data-src="${IMG_URL+poster_path}">
                </div>
              </a>
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
      <div><b>👤 Reparto |</b> ${showMovieCredits(id)}</div>
      <div>&nbsp;</div>
      <div><b>📣 Director |</b> ${showMovieDirectors(id)}</div>
      <div>&nbsp;</div>
      <div><b>🎬 Productores |</b> ${showMovieProducers(id)}</div>
      <div>&nbsp;</div>
      <div><b>✍ Escritores y Gionistas |</b> ${showMovieWriters(id)}</div>
      <div>&nbsp;</div>
                <div class="Sinopsis"><b>📝                   Sinopsis | </b> <code> ${overview} </code></div>
              </div>
            </div>
          </div>
        </div>`

    main.appendChild(moviesEL);

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
  })
};

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
        var uniqueWriters = Array.from(new Set(writers.map(writer => writer.name)));
        var regularWriters = [];
        var storyAndScreenplayWriters = [];

        uniqueWriters.forEach(function(writer) {
          var jobTitles = writers.filter(function(w) {
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

        movieWriters = storyAndScreenplayWriters.concat(regularWriters).join(", ");
        // Obtener los nombres de los escritores únicos y sus títulos en español, separados por coma
      } else {
        var storyWriters = response.crew.filter(function(crewMember) {
          return crewMember.job === "Story";
        });

        var screenplayWriters = response.crew.filter(function(crewMember) {
          return crewMember.job === "Screenplay";
        });

        var uniqueWriters = Array.from(new Set(storyWriters.concat(screenplayWriters).map(writer => writer.name)));
        movieWriters = uniqueWriters.map(function(writer) {
          var jobTitles = storyWriters.concat(screenplayWriters).filter(function(w) {
            return w.name === writer;
          }).map(function(w) {
            return w.job === "Screenplay" ? "Guión" : "Historia";
          }).join(" y ");
          return `${writer} (${jobTitles})`;
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