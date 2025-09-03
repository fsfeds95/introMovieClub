//TMDB
var today = new Date();
var ano = today.getFullYear();

const API_KEY = 'api_key=fd7402172ca9f36816c7691becaf455f';

const BASE_URL = 'https://api.themoviedb.org/3';

const LANG_ES = '&language=es-MX';
const LANG_EN = '&language=en-US';


//https://api.themoviedb.org/3/trending/all/week?api_key=74dc824830c7f93dc61b03e324070886&language=es-MX

const API_URL = BASE_URL + '/trending/movie/week?api_key=74dc824830c7f93dc61b03e324070886&language=es-MX';
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

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results);
  showMovies(data.results);
};

async function showMovies(data) {
  main.innerHTML = '';
  
  for (const movie of data) {
    const {
      backdrop_path,
      id,
      title,
      original_language,
      original_title,
      overview,
      poster_path,
      genre_ids,
      vote_average,
      release_date
    } = movie;
    
    const genreIdToName = (id) => genres.find(g => g.id === id).name;
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
            <div class="movie-card__header" style="background-image: url(${IMG_URL + backdrop_path})">
              <span class="movie-card_genre">
                <a href="https://www.themoviedb.org/movie/${id}/" target="_blank">
                  Toda la información
                </a>
              </span>
            </div>
            <div class="movie-card_content">
              <a href="${IMG_URL + poster_path}">
                <div class="movie-card__poster" data-src="${IMG_URL + poster_path}"></div>
              </a>
              <div class="d">
                <div class="contenedor border">
                  <div class="titulo_es"><b>🍿  ${title} </b></div>
                  <div class="titulo_en">📽 <i>${original_title}</i></div>
                  <div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>
                  <div class="puntuacion"><b>🔝  Puntuación TMDB | </b> <span class="vote_average" style="background:${getColor(vote_average)};"><b>${vote_average}</b></span></div>
<div>&nbsp;</div>
                  <div class="genero"><b>🎭  Género | </b>  ${genre_ids.map(id => `${genreIdToName(id)}`).join(', ')} </div>
<div>&nbsp;</div>
                  <div class="ano"><b>🗓  Año | </b> <i>${release_date.substring(0, 4)}</i></div>
<div>&nbsp;</div>
                  <div class="idioma"><b>🗣  Idioma Original |</b>  ${original_language.replace(/en|fr|it|de|ja|es|ko/g, match => replaceLang[match])} </div>
<div>&nbsp;</div>
                  <div><b>👤 Reparto |</b> ${await showMovieCredits(id)}</div>
<div>&nbsp;</div>
                  <div><b>📣 Director |</b> ${await showMovieDirectors(id)}</div>
<div>&nbsp;</div>
                  <div><b>🎬 Productores |</b> ${await showMovieProducers(id)}</div>
<div>&nbsp;</div>
                  <div><b>✍ Escritores y Gionistas |</b> ${await showMovieWriters(id)}</div>
                  <div class="Sinopsis"><b>📝 Sinopsis | </b> <code> ${overview} </code></div>
<div>&nbsp;</div>
                  <div class="trailer">
                    <b>📺 Trailer | </b> <a href="${await getTrailer(id)}">YouTube</a></div>
                </div>
              </div>
            </div>
          </div>`;
    
    main.appendChild(moviesEL);
    
    const lazyImages = document.querySelectorAll('.movie-card__poster');
    const lazyImageOptions = {
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.style.opacity = 1;
          lazyImage.style.backgroundImage = `url(${lazyImage.getAttribute('data-src')})`;
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    }, lazyImageOptions);
    
    lazyImages.forEach(lazyImage => {
      lazyImageObserver.observe(lazyImage);
    });
  }
}


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
};


//-----------------------------------------
//-----------------------------------------
//-----------------------------------------
//-----------------------------------------



// Funcion actores ------------------------
async function showMovieCredits(movieId) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?${API_KEY}&${LANG_ES}`);
  const data = await response.json();
  // Filtrar los actores más relevantes
  const relevantActors = data.cast.filter(actor => actor.order <= 5);
  return relevantActors.map(actor => actor.name).join(", ");
}

// Funcion directores ---------------------
async function showMovieDirectors(movieId) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?${API_KEY}&${LANG_EN}`);
  const data = await response.json();
  const directors = data.crew.filter(crewMember => crewMember.job === "Director");
  return directors.length > 0 ? directors[0].name : "El director es un misterio.";
}

// Funcion Productores --------------------
async function showMovieProducers(movieId) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?${API_KEY}&${LANG_ES}`);
  const data = await response.json();
  let relevantProducers = data.crew.filter(crewMember => crewMember.job === "Producer");
  if (relevantProducers.length === 0) {
    relevantProducers = data.crew.filter(crewMember => crewMember.job === "Executive Producer");
  }
  return relevantProducers.length > 0 ? relevantProducers.map(producer => `${producer.name} (${producer.job})`).join(", ") : "Productores no encontrados.";
}

// Funcion escritores ---------------------
async function showMovieWriters(movieId) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?${API_KEY}&${LANG_ES}`);
  const data = await response.json();
  const writers = data.crew.filter(crewMember => crewMember.job === "Writer");
  return writers.length > 0 ? writers.map(writer => writer.name).join(", ") : "No hay escritores.";
}

// Funcion: Obtener la clave del tráiler de YouTube
async function getTrailer(movieId) {
  try {
    const response = await $.ajax({
      url: `${BASE_URL}/movie/${movieId}/videos?${API_KEY}`,
      async: false
    });
    
    const videos = response.results.filter(video => {
      return video.site === "YouTube" && video.type === "Trailer" && video.iso_639_1 === "en";
    });
    
    if (videos.length > 0) {
      return 'https://youtu.be/' + videos[0].key;
    } else {
      return 'https//youtu.be/oBIYvN8GaFw';
    }
  } catch (error) {
    console.log('¡Ay, mi amor! Algo salió mal:', error);
    return "Trailer no disponible";
  }
}