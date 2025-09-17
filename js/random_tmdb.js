//TMDB

const years = ["1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027"];
const random = Math.floor(Math.random() * years.length);


const API_KEY = 'api_key=fd7402172ca9f36816c7691becaf455f';

const BASE_URL = 'https://api.themoviedb.org/3';

const LANG_ES = '&language=es-MX';
const LANG_EN = '&language=en-US';

const API_URL = BASE_URL + '/discover/movie?primary_release_year=' + years[random] + '&' + API_KEY + LANG_ES;
//const API_URL = BASE_URL+'/discover/movie?primary_release_year='+ano+'&'+API_KEY+LANG_ES;
//const API_URL = BASE_URL+'/discover/movie?'+API_KEY+'&append_to_response=videos'+ LANG_ES;

const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const anio = document.getElementById('years');
const main = document.getElementById('main');

// Load Font Awesome if not already loaded
if (!document.querySelector('link[href*="font-awesome"]')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css';
  link.crossOrigin = 'anonymous';
  link.referrerPolicy = 'no-referrer';
  document.head.appendChild(link);
}





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

let isFavoritesView = false;
let originalMovies = [];

getMovies(API_URL);

function getMovies(url) {
  
  fetch(url).then(res => res.json()).then(data => {
    //console.log(data)
    console.log(data.results)
    originalMovies = data.results;
    showMovies(data.results)
  })
  
};

function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

function addFavorite(movie) {
  let favorites = getFavorites();
  if (!favorites.some(fav => fav.id === movie.id)) {
    favorites.push(movie);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

function removeFavorite(movieId) {
  let favorites = getFavorites();
  favorites = favorites.filter(fav => fav.id !== movieId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function showMovies(data) {
  main.innerHTML = '';
  
  data.forEach(movie => {
    const { key, site, type, title, original_language, release_dates, original_title, backdrop_path, poster_path, release_date, vote_average, overview, id, genre_ids } = movie;
    const genreIdToName = (id) => genres.find(g => g.id === id).name
    var replaceTitle = { ":": "", " ": "_", "-": "_", "¡": "", "!": "", ",": "", "¿": "" };
    var replaceLang = { "en": '<i class="fa-solid fa-globe-americas"></i>  Ingles', "fr": '<i class="fa-solid fa-globe-europe"></i>  Frances', "it": '<i class="fa-solid fa-globe-europe"></i>  Italiano', "de": '<i class="fa-solid fa-globe-europe"></i>  Aleman', "ja": '<i class="fa-solid fa-globe-asia"></i>  Japones', "es": '<i class="fa-solid fa-globe-americas"></i>  Español', "ko": '<i class="fa-solid fa-globe-asia"></i>  Coreano' };
    const isFavorite = getFavorites().some(fav => fav.id === movie.id);
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
              <div>
              <button class="favorite-btn ${isFavorite ? 'favorited' : ''}" data-id="${id}">${isFavorite ? '<i class="fa-solid fa-heart"></i> Quitar de Favoritos' : '<i class="fa-regular fa-heart"></i>'}</button>
              </div>
              <div class="titulo_es">
                <b><i class="fa-solid fa-film"></i>  ${title} </b>
              </div>
              <div class="titulo_en"><i class="fa-solid fa-video"></i> <i>${original_title}</i></div>
              <div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>
              <div class="puntuacion"><b><i class="fa-solid fa-star"></i>  Puntuación TMDB | </b> <span class="vote_average" style="background:${getColor(vote_average)};"><b>${vote_average}</b></span></div>
              <div>&nbsp;</div>
              <div class="genero"><b><i class="fa-solid fa-masks-theater"></i>                      Género | </b>  ${genre_ids.map(id => `${genreIdToName(id)}`).join(', ')} </div>
              <div>&nbsp;</div>
              <div class="ano"><b><i class="fa-solid fa-calendar"></i>                            Año | </b> <i>${release_date.substring(0,4)}</i></div>
              <div>&nbsp;</div>
              <div class="idioma"><b><i class="fa-solid fa-globe"></i>        Idioma Original |</b>  ${original_language.replace(/en|fr|it|de|ja|es|ko/g,function(match) {return replaceLang[match];})} </div>
              <div>&nbsp;</div>
    <div id="cast-${id}"><b><i class="fa-solid fa-user"></i> Reparto |</b> Cargando...</div>
    <div>&nbsp;</div>
    <div id="director-${id}"><b><i class="fa-solid fa-bullhorn"></i> Director |</b> Cargando...</div>
    <div>&nbsp;</div>
    <div id="producers-${id}"><b><i class="fa-solid fa-clapperboard"></i> Productores |</b> Cargando...</div>
    <div>&nbsp;</div>
    <div id="writers-${id}"><b><i class="fa-solid fa-pen"></i> Escritores y Guionistas |</b> Cargando...</div>
    <div>&nbsp;</div>
              <div class="Sinopsis"><b><i class="fa-solid fa-file-lines"></i>                   Sinopsis | </b> <code> ${overview} </code></div>
            </div>
          </div>
        </div>
      </div>`
    
    main.appendChild(moviesEL);
    
    const favBtn = moviesEL.querySelector('.favorite-btn');
    favBtn.addEventListener('click', () => {
      if (favBtn.classList.contains('favorited')) {
        removeFavorite(movie.id);
        favBtn.classList.remove('favorited');
        favBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
      } else {
        addFavorite(movie);
        favBtn.classList.add('favorited');
        favBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
      }
      if (isFavoritesView) {
        const favorites = getFavorites();
        if (favorites.length === 0) {
          main.innerHTML = '<h2 class="noMovie">Sin películas favoritas.</h2>';
        } else {
          showMovies(favorites);
        }
      }
    });
    
    loadMovieDetails(id);
    
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

document.getElementById("years").innerHTML = '<center>Peliculas randoms del año: ' + years[random] + '</center>';

const showFavBtn = document.createElement('button');
showFavBtn.textContent = 'Ver Favoritos';
showFavBtn.style.margin = '10px';
document.body.insertBefore(showFavBtn, main);

const backBtn = document.createElement('button');
backBtn.textContent = 'Volver a Películas Random';
backBtn.style.margin = '10px';
backBtn.style.display = 'none';
document.body.insertBefore(backBtn, main);

showFavBtn.addEventListener('click', () => {
  const favorites = getFavorites();
  if (favorites.length === 0) {
    main.innerHTML = '<h2 class="noMovie">Sin películas favoritas.</h2>';
  } else {
    showMovies(favorites);
  }
  document.getElementById("years").innerHTML = '<center>Películas Favoritas</center>';
  showFavBtn.style.display = 'none';
  backBtn.style.display = 'inline';
  isFavoritesView = true;
});

backBtn.addEventListener('click', () => {
  showMovies(originalMovies);
  document.getElementById("years").innerHTML = '<center>Peliculas randoms del año: ' + years[random] + '</center>';
  backBtn.style.display = 'none';
  showFavBtn.style.display = 'inline';
  isFavoritesView = false;
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

function loadMovieDetails(movieId) {
  const cacheKey = `credits-${movieId}`;
  const cachedCredits = localStorage.getItem(cacheKey);
  if (cachedCredits) {
    const credits = JSON.parse(cachedCredits);
    updateMovieDetails(movieId, credits);
    return;
  }
  
  fetch(`${BASE_URL}/movie/${movieId}/credits?${API_KEY}${LANG_ES}`)
    .then(res => res.json())
    .then(credits => {
      localStorage.setItem(cacheKey, JSON.stringify(credits));
      updateMovieDetails(movieId, credits);
    })
    .catch(error => {
      console.log(error);
      document.getElementById(`cast-${movieId}`).innerHTML = '<b><i class="fa-solid fa-user"></i> Reparto |</b> Error al cargar';
      document.getElementById(`director-${movieId}`).innerHTML = '<b><i class="fa-solid fa-bullhorn"></i> Director |</b> Error al cargar';
      document.getElementById(`producers-${movieId}`).innerHTML = '<b><i class="fa-solid fa-clapperboard"></i> Productores |</b> Error al cargar';
      document.getElementById(`writers-${movieId}`).innerHTML = '<b><i class="fa-solid fa-pen"></i> Escritores y Guionistas |</b> Error al cargar';
    });
}

function updateMovieDetails(movieId, response) {
  // Reparto
  const relevantActors = response.cast.filter(actor => actor.order <= 5);
  const actorNames = relevantActors.map(actor => actor.name).join(", ");
  document.getElementById(`cast-${movieId}`).innerHTML = `<b><i class="fa-solid fa-user"></i> Reparto |</b> ${actorNames || "No disponible"}`;
  
  // Director (using the same credits, as names are consistent)
  const directors = response.crew.filter(crewMember => crewMember.job === "Director");
  const movieDirector = directors.length > 0 ? directors[0].name : "El director es un misterio.";
  document.getElementById(`director-${movieId}`).innerHTML = `<b><i class="fa-solid fa-bullhorn"></i> Director |</b> ${movieDirector}`;
  
  // Productores
  let relevantProducers = response.crew.filter(crewMember => crewMember.job === "Producer");
  if (relevantProducers.length === 0) {
    relevantProducers = response.crew.filter(crewMember => crewMember.job === "Executive Producer");
  }
  const producerInfo = relevantProducers.map(producer => {
    const jobTitle = producer.job === "Executive Producer" ? "<i>Productor Ejecutivo</i>" : "<i>Productor</i>";
    return `${producer.name} (${jobTitle})`;
  }).join(", ");
  document.getElementById(`producers-${movieId}`).innerHTML = `<b><i class="fa-solid fa-clapperboard"></i> Productores |</b> ${producerInfo || "Productores no encontrados."}`;
  
  // Escritores
  let writers = response.crew.filter(crewMember => crewMember.job === "Writer");
  let movieWriters = '';
  if (writers.length > 0) {
    const uniqueWriters = Array.from(new Set(writers.map(writer => writer.name)));
    const regularWriters = [];
    const storyAndScreenplayWriters = [];
    
    uniqueWriters.forEach(writer => {
      const jobTitles = writers.filter(w => w.name === writer).map(w => w.job === "Screenplay" ? "Guión" : "Historia").join(" y ");
      if (jobTitles.includes("Historia") && jobTitles.includes("Guión")) {
        storyAndScreenplayWriters.push(`${writer} (${jobTitles})`);
      } else {
        regularWriters.push(`${writer} (${jobTitles})`);
      }
    });
    
    movieWriters = storyAndScreenplayWriters.concat(regularWriters).join(", ");
  } else {
    const storyWriters = response.crew.filter(crewMember => crewMember.job === "Story");
    const screenplayWriters = response.crew.filter(crewMember => crewMember.job === "Screenplay");
    const uniqueWriters = Array.from(new Set([...storyWriters, ...screenplayWriters].map(writer => writer.name)));
    movieWriters = uniqueWriters.map(writer => {
      const jobTitles = [...storyWriters, ...screenplayWriters].filter(w => w.name === writer).map(w => w.job === "Screenplay" ? "Guión" : "Historia").join(" y ");
      return `${writer} (${jobTitles})`;
    }).join(", ");
  }
  document.getElementById(`writers-${movieId}`).innerHTML = `<b><i class="fa-solid fa-pen"></i> Escritores y Guionistas |</b> ${movieWriters || "No encontrados"}`;
}