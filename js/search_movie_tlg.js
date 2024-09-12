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
 // Funcion: Busqueda con botón.
 $("#searchButton").click(async function() {
  const searchQuery = $("#searchInput").val();
  await searchMovie(searchQuery);
 });
 // Funcion: Busqueda con "Enter".
 $("#searchInput").on("keypress", async function(event) {
  if (event.key === "Enter") {
   const searchQuery = $("#searchInput").val();
   await searchMovie(searchQuery);
  }
 });
});

// Funcion: Carga SKELETOR.
async function searchMovie(query) {
 $("#results").html(`
 
 <div class="skeletonCont movie-card">
  <div class="skeletonImg movie-card__header">
   <span class="movie-card_genre">ID: Loading</span>
   <span class="movie-card_genre">Backdrop</span>
   <span class="movie-card_genre">Mas Images</span>
   <span class="movie-card_genre">Información</span>
  </div>
  <div class="skeletonCont movie-card_content">
   <div class="skeletonImg movie-card___poster" data-src="https://dummyimage.com/720x1080/CCCCCC/000000.jpg&text=Loading"></div>
   <div class="d">
    <div class="contenedor border" id="peli_1">
     <div class="skeletonTxt">
      Loading_(Loading)_480p_[dual-lat].mp4
     </div>
    </div>
    <div class="contenedor border" id="peli_2">
    <div class="skeletonTxt initial"><b>⟨🔠⟩ Loading</b></div>
     <div class="separador"><b>▬▬▬▬▬▬▬▬▬</b></div>
    <div class="skeletonTxt title_es"><b>⟨🍿⟩ Loading</b></div>
    <div class="skeletonTxt title_or"><b>⟨🎥⟩ Loading</b></div>
     <div class="separador"><b>▬▬▬▬▬▬▬▬▬</b></div>
     <div class="skeletonTxt year"><b>⟨🎟⟩ Estreno: Loading</b></div>
     <div class="skeletonTxt lang"><b>⟨🗣️⟩ Idioma Original: Loading</b></div>
     <div class="skeletonTxt audio"><b>⟨🔊⟩ Audio: Loading</b></div>
     <div class="skeletonTxt quality"><b>⟨📺⟩ Calidad: Loading</b></div>
     <div class="skeletonTxt duration"><b>⟨⏳⟩ Duración: Loading</b></div>
     <div class="skeletonTxt genre"><b>⟨🎭⟩ Género: Loading</b></div>
     <div class="skeletonTxt credits"><b>⟨👤⟩ Reparto: Loading</b></div>
      <div class="separador"><b>▬▬▬▬▬▬▬▬▬</b></div>
     <div class="skeletonTxt sinopsis"><b>⟨💭⟩ Sinopsis: Loading</b></div>
      <div class="separador"><b>▬▬▬▬▬▬▬▬▬</b></div>
     <div class="skeletonTxt popup"><b>⟨⚙️⟩ Cómo ver la película: Loading</b></div>
     <div class="skeletonTxt trailer"><b>⟨🎞️⟩ Trailer: Loading</a></b></div>
     <div class="skeletonTxt view_download"><b>⟨🔗⟩ Ver/Descargar: Loading</b></div>
    </div>
  </div>
 </div>
 </div>
 
 `);

 if (query === "") {
  $("#results").html("<p>Ingrese un título de película para buscar.</p>");
 } else {
  try {
   const response = await $.getJSON(
    `${BASE_URL}/search/movie?${API_KEY}&query=${query}&${LANG_ES}`
   );
   const movies = response.results;

   if (movies.length === 0) {
    $("#results").html("<p>No se encontraron películas con ese título.</p>");
   } else {
    await displayMovies(movies);
   }
  } catch (error) {
   console.log('Ay, mi amor, algo salió mal:', error);
  }
 }
}

// Funcion: Muestra la película buscada.
async function displayMovies(movies) {
 let resultsHtml = "";

 for (const movie of movies) {
  const id = movie.id;
  const title = movie.title;
  const originalTitle = movie.original_title;
  const tagline = movie.tagline;
  const releaseYear = movie.release_date.split("-")[0];
  const posterPath = movie.poster_path;
  const backdropPath = movie.backdrop_path;
  const langCode = movie.original_language;
  const overview = movie.overview;
  const duration = movie.runtime;

  // Imagenes Posters.
  const popPosterFat = await getPosterMovie(id, IMG_ORI, langCode);
  const popPosterFit = await getPosterMovie(id, IMG_185, langCode);

  // Imagenes Backdrops
  const popBackdropFat = await getBackdropMovie(id, IMG_ORI);
  const popBackdropFit = await getBackdropMovie(id, IMG_500);

  const langComplete = await getLanguage(langCode);
  const durationTime = await getDurationMovie(id);
  const genreEs = await getGenres(movie.genre_ids);
  const actors = await getActorsMovie(id);
  const trailerLink = await getTrailer(id);
  const trailerEmbed = await getTrailerEmbed(id);
  const titleRemplace = await getVideoTitle(title);

  resultsHtml += `

<div class="movie-card">


 <div class="movie-card__header" style="background-image: url(${popBackdropFit})">
  <span class="movie-card_genre">ID: ${id}</span>
  <span class="movie-card_genre">
   <a href="https://095a2517-5733-4377-8631-a3e04ed221e8.e1-us-cdp-2.choreoapps.dev/b?url=${popBackdropFat}" target="_blank">
    Backdrop
   </a>
  </span>
  <span class="movie-card_genre">
   <a href="moreImage.html?idMovie=${id}">
    Mas Images
   </a>
  </span>
  <span class="movie-card_genre">
   <a href="https://www.themoviedb.org/movie/${id}/" target="_blank">
    Información
   </a>
  </span>
 </div>


 <div class="movie-card_content">

  <div class="movie-card__poster" data-src="${popPosterFit}"></div>

  <div class="d">

   <button class="copy" onclick="copyTextById('peli_${id}_1', this)"><i class="fa-regular fa-clipboard"></i> Copiar</button>
   <div class="contenedor border" id="peli_${id}_1">${titleRemplace}_(${releaseYear})_480p_[dual-lat].mp4</div>

   <button class="copy" onclick="copyTextById('peli_${id}_2', this)"><i class="fa-regular fa-clipboard"></i> Copiar</button>
   <div class="contenedor border" id="peli_${id}_2">



<div class="initial"><b>⟨🔠⟩ #${title.substring(1, 0)}</b></div>

     <div class="separador"><b>▬▬▬▬▬▬▬▬▬</b></div>


<div class="title_es"><b>⟨🍿⟩ ${title} (${releaseYear})</b></div>

<div class="title_or"><b>⟨🎥⟩ ${originalTitle}</b></div>


     <div class="separador"><b>▬▬▬▬▬▬▬▬▬</b></div>

<div class="type"><b>⟨⭐⟩ Tipo : #Pelicula</b></div>

<div class="year"><b>⟨🎟⟩ Estreno: #Año${releaseYear}</b></div>


<div class="lang"><b>⟨🗣️⟩ Idioma Original: ${langComplete}</b></div>

<div class="audio"><b>⟨🔊⟩ Audio: 🇲🇽 #Dual_Latino</b></div>

<div class="quality"><b>⟨📺⟩ Calidad: #HD</b></div>

<div class="duration"><b>⟨⏳⟩ Duración: ${durationTime}</b></div>

<div class="genre"><b>⟨🎭⟩ Género: ${genreEs}</b></div>

<div class="credits"><b>⟨👤⟩ Reparto: ${actors}</b></div>

     <div class="separador"><b>▬▬▬▬▬▬▬▬▬</b></div>

<div class="sinopsis"><b>⟨💭⟩ Sinopsis: ${overview}</b></div>

     <div class="separador"><b>▬▬▬▬▬▬▬▬▬</b></div>
    <div class="separador"><b>&nbsp;</b></div>
    <div class="separador"><b>&nbsp;</b></div>

<div class="popup"><b>⟨⚙️⟩ Cómo ver la película ⟨⚙️⟩ - popup: Para ver la película tienes que descargar la aplicación TeraBox, la puedes descargar directamente de la PlayStore o la AppStore.&bsol;n&bsol;nUna vez abierto el link se abrirá en la aplicación de TeraBox.</b></div>

<div class="trailer"><b>⟨🎞️⟩ Trailer ⟨🎞️⟩ - ${trailerLink}</b></div>

<div class="view_download"><b>⟨🔗⟩ Ver/Descargar ⟨🔗⟩ -&nbsp;</b></div>
   </div>

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

// Función: Obtener la clave del tráiler de YouTube
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
   return "No Disponible";
  }
 } catch (error) {
  console.log('¡Ay, mi amor! Algo salió mal:', error);
  return "Trailer no disponible";
 }
}

// Función: Obtener el tráiler en video embed
async function getTrailerEmbed(movieId) {
 try {
  const response = await $.ajax({
   url: `${BASE_URL}/movie/${movieId}/videos?${API_KEY}`,
   async: false
  });

  const videos = response.results.filter(video => {
   return video.site === "YouTube" && video.type === "Trailer" && (video.iso_639_1 === "es" || video.iso_639_1 === "en");
  });

  if (videos.length > 0) {
   return 'https://www.youtube.com/embed/' + videos[0].key;
  } else {
   return "https://www.youtube.com/embed/oBIYvN8GaFw";
  }
 } catch (error) {
  console.log('¡Ay, mi amor! Algo salió mal:', error);
  return "https://www.youtube.com/embed/oBIYvN8GaFw";
 }
}

// Funcion: Traducir los generos.
async function getGenres(genreIds) {
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

 return genreList.join(", ");
}

// Función: Traducir el lenguaje.
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
  es: "🇲🇽 / 🇪🇸 #Español",
 };
 return languages[languageCode] || languageCode;
}

// Funcion: Obtener actores.
async function getActorsMovie(movieId) {
 try {
  const response = await $.ajax({
   url: `${BASE_URL}/movie/${movieId}/credits?${API_KEY}&${LANG_ES}`,
   async: false
  });
  const relevantActors = response.cast.filter(actor => actor.order <= 4);
 const actorNames = relevantActors.map(actor => `#${actor.name.replace(/\s/g, '_')} (${actor.character})`);
  return actorNames.join("</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
 } catch (error) {
  console.log('Ay, mi amor, algo salió mal:', error);
  return "";
 }
}

// Funcion: Obtener poster de pelicula.
async function getPosterMovie(movieId, size, langCode) {
 try {
  const response = await $.ajax({
   url: `${BASE_URL}/movie/${movieId}/images?${API_KEY}&include_image_language=${langCode},es,en&${LANG_ES}`,
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
async function getBackdropMovie(movieId, size) {
 try {
  const response = await $.ajax({
   //https://api.themoviedb.org/3/movie/1394/images?api_key=74dc824830c7f93dc61b03e324070886
   url: `${BASE_URL}/movie/${movieId}/images?${API_KEY}`,
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

// Función: Obtener la duración de la película.
async function getDurationMovie(movieId) {
 try {
  const response = await $.ajax({
   url: `${BASE_URL}/movie/${movieId}?${API_KEY}&${LANG_ES}`,
   async: false
  });
  const duracion = response.runtime;
  const horas = Math.floor(duracion / 60);
  const minutos = duracion % 60;
  return `${horas}h ${minutos}m`;
 } catch (error) {
  console.log(error);
  return "";
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