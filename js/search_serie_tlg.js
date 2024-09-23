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

// Whatermark
const whatermark = 'https://095a2517-5733-4377-8631-a3e04ed221e8.e1-us-cdp-2.choreoapps.dev'

// Lenguajes
const LANG_ES = 'language=es-MX';
const LANG_EN = 'language=en-US';

// Hacer la llamada a la API de TheMovieDB
async function searchSeries() {
 const serieQuery = encodeURIComponent(new URLSearchParams(window.location.search).get('serieQuery'));
 try {
  const response = await fetch(`${BASE_URL}/search/tv?${API_KEY}&query=${serieQuery}&${LANG_ES}`);
  const data = await response.json();

  // Verificar si hay resultados antes de mostrarlos
  if (data.results && data.results.length > 0) {
   displaySeriesList(data.results);
  } else {
   // Mostrar un mensaje si no hay resultados
   const seriesContainer = document.getElementById('series-container');
   seriesContainer.innerHTML = '<p>No se encontraron series.</p>';
  }
 } catch (error) {
  console.error(error);
 }
}

if (window.location.search.includes('serieQuery')) {
 searchSeries();
}

// Función para mostrar la lista de series
async function displaySeriesList(series) {
 let resultsHtml = '';

 for (const serie of series) {
  const id = serie.id;
  const title = serie.name;
  const originalTitle = serie.original_name;
  const poster = serie.poster_path;
  const backdrop = serie.backdrop_path;
  const genre = serie.genre_ids;
  const releaseYear = serie.first_air_date.split("-")[0];

  const langCode = serie.original_language;

  const originalLanguage = await getLanguage(serie.original_language);
  const vote = serie.vote_average;
  const overview = serie.overview;



  // Imagenes Posters.
  const popPosterFat = await getPosterSerie(id, IMG_ORI, langCode);
  const popPosterFit = await getPosterSerie(id, IMG_185, langCode);

  // Imagenes Backdrops
  const popBackdropFat = await getBackdropSerie(id, IMG_ORI);
  const popBackdropFit = await getBackdropSerie(id, IMG_500);
  
  const esGenre = await getGenres(genre);
  const actors = await getActorsSerie(id);
  const trailerLink = await getTrailer(id);
  const titleRemplace = await getVideoTitle(title);
  

  resultsHtml += `

<div class="movie-card">


 <div class="movie-card__header" style="background-image: url(${popBackdropFit})">
  <span class="movie-card_genre">ID: ${id}</span>
  <span class="movie-card_genre">
   <a href="${whatermark}/b?url=${popBackdropFat}" target="_blank">
    Backdrop
   </a>
  </span>
  <span class="movie-card_genre">
   <a href="moreImage.html?idSerie=${id}">
    Mas Images
   </a>
  </span>
  <span class="movie-card_genre">
   <a href="https://www.themoviedb.org/tv/${id}/" target="_blank">
    Información
   </a>
  </span>
 </div>


 <div class="movie-card_content">

  <div class="movie-card__poster" data-src="${popPosterFit}"></div>

  <div class="d">
   <button class="copy" onclick="copyTextById('serie_${id}_1', this)"><i class="fa-regular fa-clipboard"></i> Copiar</button>
   <div class="contenedor border" id="serie_${id}_1">${titleRemplace}_-_s00e00_480p_[dual-lat].mp4</div>
   <button class="copy" onclick="copyTextById('serie_${id}_2', this)"><i class="fa-regular fa-clipboard"></i> Copiar</button>
   <div class="contenedor border" id="serie_${id}_2">



<div class="initial"><b>⟨🔠⟩ #${title.substring(1, 0)}</b></div>

     <div class="separador"><b>▬▬▬▬▬▬▬▬▬</b></div>
    <div class="titulo_es">⟨🍿⟩ ${title} (${releaseYear})</div>
    <div class="titulo_en">⟨📽⟩ ${originalTitle}</div>
    <div class="separador"><b>▬▬▬▬▬</b></div>
    <div class="type"><b>⟨⭐⟩ Tipo : #Serie</b></div>
    <div class="year"><b>⟨🎟⟩ Estreno: #Año${releaseYear}</b></div>
    <div class="temporadas">⟨📼⟩ Temporada/as: ${await getSeasonCount(id)}</div>
    <div class="genero">⟨🎭⟩ Género: ${esGenre}</div>
    <div class="calidad">⟨📺⟩ Calidad: #HD</div>
    <div class="idioma">⟨🗣⟩ Idioma Original: ${originalLanguage}</div>
    <div class="audio">⟨🎧⟩ Audio: 🇲🇽 #Latino</div>
    <div class="credits"><b>⟨👤⟩ Reparto: ${actors}</b></div>

    <div class="separador"><b>▬▬▬▬▬</b></div>
    <div class="Sinopsis">⟨📝⟩ Sinopsis: ${overview}</div>


    <div class="separador"><b>▬▬▬▬▬</b></div>
    <div class="separador"><b>&nbsp;</b></div>
    <div class="separador"><b>&nbsp;</b></div>

<div class="popup"><b>⟨⚙️⟩ Cómo ver la serie ⟨⚙️⟩ - popup: Para ver la serie tienes que descargar la aplicación TeraBox, la puedes descargar directamente de la PlayStore o la AppStore.&bsol;n&bsol;nUna vez abierto el link se abrirá en la aplicación de TeraBox.</b></div>

<div class="trailer"><b>⟨🎞️⟩ Trailer ⟨🎞️⟩ - ${trailerLink}</b></div>

<div class="view_download"><b>⟨🔗⟩ Ver/Descargar ⟨🔗⟩ -&nbsp;</b></div>
   </div>
  </div>
 </div>
`;
 }

 $("#results").html(resultsHtml);

 // Seleccionar todos los elementos con la clase 'movie-card__poster'
 const lazyImages = document.querySelectorAll('.movie-card__poster');
 const lazyImageOptions = {
  // Margen alrededor del viewport (0px indica que el margen es cero)
  rootMargin: '0px',
  // Umbral de visibilidad (0.5 significa que el 50% del elemento debe ser visible)
  threshold: 0.5
 };

 // Crear una instancia de IntersectionObserver con una función de devolución de llamada
 const lazyImageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
   if (entry.isIntersecting) {
    const lazyImage = entry.target;
    // Mostramos la imagen al establecer la opacidad en 1
    lazyImage.style.opacity = 1;
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

// Funcion: Traducir los generos
async function getGenres(genreIds) {
 const genres = {
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

 const genreList = [];

 for (const genreId of genreIds) {
  if (genres[genreId]) {
   genreList.push(genres[genreId]);
  }
 }

 return genreList.join(", ");
}

// Función: Obtener el número de temporadas
async function getSeasonCount(idSerie) {
 const response = await fetch(`${BASE_URL}/tv/${idSerie}?${API_KEY}&${LANG_ES}`);
 const data = await response.json();
 return data.number_of_seasons;
}

// Función: Traducir el lenguaje
async function getLanguage(languageCode) {
 const languages = {
  en: "🇺🇸 #Ingles",
  ca: "🇪🇸 #Catalan",
  fr: "🇫🇷 #Frances",
  de: "🇩🇪 #Aleman",
  it: "🇮🇹 #Italiano",
  ja: "🇯🇵 #Japones",
  ru: "🇷🇺 #Ruso",
  zh: "🇨🇳 #Chino",
  pl: "🇵🇱 #Polaco",
  ko: "🇰🇷 / 🇰🇵 #Coreano",
  es: "🇲🇽 / 🇪🇸 #Español"
 };
 return languages[languageCode] || languageCode;
}

// Funcion: Obtener poster de pelicula.
async function getPosterSerie(idSerie, size, langCode) {
 try {
  const response = await $.ajax({
   url: `${BASE_URL}/tv/${idSerie}/images?${API_KEY}&include_image_language=${langCode},es,en&${LANG_ES}`,
   async: false
  });
  const posters = response.posters;
  posters.sort((a, b) => b.popularity - a.popularity);
  const posterPath = posters.find(poster => [langCode, "es", "en"].includes(poster.iso_639_1));
  if (posterPath) {
   return size + posterPath.file_path;
  } else {
   return 'https://dummyimage.com/720x1080/CCCCCC/000000.jpg&text=No+Image';
  }
 } catch (error) {
  console.log('Ay, mi amor, algo salió mal:', error);
  return '';
 }
}

// Funcion: Obtener backdrop de pelicula.
async function getBackdropSerie(idSerie, size) {
 try {
  const response = await $.ajax({
   //https://api.themoviedb.org/3/movie/1394/images?api_key=74dc824830c7f93dc61b03e324070886
   url: `${BASE_URL}/tv/${idSerie}/images?${API_KEY}`,
   async: false
  });
  const backdrops = response.backdrops;
  backdrops.sort((a, b) => b.popularity - a.popularity);
  const backdropPath = backdrops.find(backdrop => ["es", "en", "null"].includes(backdrop.iso_639_1));
  if (backdropPath) {
   return size + backdropPath.file_path;
  } else {
   return 'https://dummyimage.com/1080x720/CCCCCC/000000.jpg&text=No+Image';
  }
 } catch (error) {
  console.log('Ay, mi amor, algo salió mal:', error);
  return '';
 }
}

// Función: Obtener la clave del tráiler de YouTube
async function getTrailer(idSerie) {
 try {
  const response = await $.ajax({
   url: `${BASE_URL}/tv/${idSerie}/videos?${API_KEY}`,
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

// Funcion: Remplazo de carácteres, letras en minúsculas.
async function getVideoTitle(frase) {
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
  .replace(/ú/g, 'u')
  .replace(/ /g, '_')
  .toLowerCase();
}

// Funcion: Obtener actores.
async function getActorsSerie(idSerie) {
 const response = await fetch(`${BASE_URL}/tv/${idSerie}/credits?${API_KEY}`);
 const data = await response.json();

 const relevantActors = data.cast.filter(actor => actor.order <= 4);
 const actorNames = relevantActors.map(actor => `#${actor.name.replace(/\s/g, '_')} (${actor.character})`);
 return actorNames.join("</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
}