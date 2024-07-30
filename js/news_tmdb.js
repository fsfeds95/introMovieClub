//TMDB

const years = ["1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"];
const random = Math.floor(Math.random() * years.length);


const API_KEY = 'api_key=fd7402172ca9f36816c7691becaf455f';

const BASE_URL = 'https://api.themoviedb.org/3';

const LANG_ES = '&language=es-MX';

const API_URL = BASE_URL+'/discover/movie?primary_release_year='+years[random]+'&'+API_KEY+LANG_ES;
//const API_URL = BASE_URL + '/discover/movie?' + API_KEY + '&append_to_response=videos' + LANG_ES;

const IMG_URL = 'https://image.tmdb.org/t/p/original';

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
    const { key, site, type, title, original_language, release_dates, original_title, backdrop_path, poster_path, release_date, vote_average, overview, id, genre_ids } = movie;
    const genreIdToName = (id) => genres.find(g => g.id === id).name
    var replaceTitle = { ":": "", " ": "_", "-": "_", "¡": "", "!": "", ",": "", "¿": "" };
    var replaceLang = { "en": "🇺🇸  #Ingles", "fr": "🇫🇷  #Frances", "it": "🇮🇹  #Italiano", "de": "🇩🇪  #Aleman", "ja": "🇯🇵  #Japones", "es": "🇲🇽  #Español", "ko": "🇰🇷 / 🇰🇵  #Coreano", "pt": "🇵🇹 / 🇧🇷 Portugués" };
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
                                <div class="movie-card__poster" style="background-image: url(${IMG_URL+poster_path})"></div>
                        </a>
                        <div class="d">
                                <div class="contenedor border">
                                        <div class="titulo_es">
                                                <b>
                                                        🍿  ${title} 
                                                </b>
                                        </div>
                                        <div class="titulo_en"><b>📽 <i>${original_title}</i></b></div>
                                        <div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>
                                        <div class="puntuacion"><b>🔝  Puntuación TMDB | </b> <span style="color:${getColor(vote_average)}">${vote_average}</span></div><br>
                                        <div class="genero"><b>🎭                      Género | </b>  ${genre_ids.map(id => `#${genreIdToName(id).replace(/\s/g,function(match) {return replaceTitle[match];})}`).join(', ')} </div><br>
                                        <div class="ano"><b>🗓                            Año | </b> <i>${release_date.substring(4,0)}</i></div><br>
                                        <div class="idioma"><b>🗣        Idioma Original |  ${original_language.replace(/en|fr|it|de|ja|es|ko/g,function(match) {return replaceLang[match];})} </b></div><br>
                                        <div class="Sinopsis"><b>📝                   Sinopsis | </b> <code> ${overview} </code></div>
                                </div>



                        </div>
                </div>
        </div>
                `

    main.appendChild(moviesEL);
  })
};

document.getElementById("years").innerHTML = '<center>Peliculas randoms del año: '+years[random]+'</center>';

function getColor(vote) {
  if (vote >= 8) {
    return '#252525'
  } else if (vote >= 5) {
    return '#454545'
  } else {
    return '#FFFFFF'
  }
}
