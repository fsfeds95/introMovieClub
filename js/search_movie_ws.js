const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=74dc824830c7f93dc61b03e324070886';

const IMG_ORI = 'https://image.tmdb.org/t/p/original';
const IMG_500 = 'https://image.tmdb.org/t/p/w500';
const IMG_300 = 'https://image.tmdb.org/t/p/w300';
const IMG_185 = 'https://image.tmdb.org/t/p/w185';
const IMG_92 = 'https://image.tmdb.org/t/p/w92';

const LANG_ES = 'language=es-MX';
const LANG_EN = 'language=en-US';

$(document).ready(function() {
 $("#searchButton").click(async function() {
  const searchQuery = $("#searchInput").val();
  await searchMoviesAsync(searchQuery);
 });

 $("#searchInput").on("keypress", async function(event) {
  if (event.key === "Enter") {
   const searchQuery = $("#searchInput").val();
   await searchMoviesAsync(searchQuery);
  }
 });
});

async function searchMoviesAsync(query) {
 $("#results").html(`
 
 <div class="skeletonCont movie-card">
  
  <div class="skeletonImg movie-card__header">
   
   <span class="skeletonTxt movie-card_genre">ID: loading</span>
   <span class="skeletonTxt movie-card_genre">
     Poster
   </span>
   <span class="skeletonTxt movie-card_genre">
     Backdrop
   </span>
   <span class="skeletonTxt movie-card_genre">
     Información
   </span>
  </div>
  
  <div class="skeletonCont movie-card_content">
   <div class="skeletonImg movie-card___poster" data-src="https://dummyimage.com/720x1080/CCCCCC/000000.jpg&text=Loading"></div>
   <div class="d">
    <div class="skeletonTxt contenedor border" id="peli_1">loading_(2024)_480p_[dual-lat].mp4</div>



    <div class="contenedor border" id="peli_2">
     <div class="skeletonTxt title_es"><b>⟨🍿⟩ loading (loading)</b></div>
     <div class="skeletonTxt title_or"><b>⟨🎥⟩ loading</b></div>
     <div class="separador"><b>➖➖➖➖➖➖➖➖➖➖</b></div>
     <div class="skeletonTxt lang"><b>⟨🗣️⟩ Idioma Original: loading</b></div>
     <div class="skeletonTxt audio"><b>⟨🔊⟩ Audio: loading</b></div>
     <div class="skeletonTxt quality"><b>⟨📺⟩ Calidad: loading</b></div>
     <div class="skeletonTxt duration"><b>⟨⏳⟩ Duración: loading</b></div>
     <div class="skeletonTxt genre"><b>⟨🎭⟩ Género: loading</b></div>
     <div class="skeletonTxt credits"><b>⟨👤⟩ Reparto: loading</b></div>
     <div class="separador"><b>➖➖➖➖➖➖➖➖➖➖</b></div>
     <div class="skeletonTxt trailer"><b>⟨🎞️⟩ Trailer: loading</a></b></div>
     <div class="skeletonTxt view_download"><b>⟨🔗⟩ Ver/Descargar:&nbsp;</b></div>
     <div class="separador"><b>➖➖➖➖➖➖➖➖➖➖</b></div>
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
    await displayMoviesAsync(movies);
   }
  } catch (error) {
   console.log('Ay, mi amor, algo salió mal:', error);
  }
 }
}

async function displayMoviesAsync(movies) {
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

  const popPosterFat = await getPosterMovieAsync(id, IMG_ORI);
  const popBackdropFat = await getBackdropMovieAsync(id, IMG_ORI);
  const popPosterFit = await getPosterMovieAsync(id, IMG_185);
  const popBackdropFit = await getBackdropMovieAsync(id, IMG_500);
  
  const langComplete = await getLanguageAsync(langCode);
  const durationTime = await getDurationMovieAsync(id);
  const genreEs = await getGenresAsync(movie.genre_ids);
  const actors = await showMovieCreditsAsync(id);
  const ytKey = await getTrailerKeyAsync(id);

  resultsHtml += `<div class="movie-card">
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
        <a href="https://www.themoviedb.org/movie/${id}/" target="_blank">
          Información
        </a>
      </span>
    </div>
    <div class="movie-card_content">
      <div class="movie-card__poster" data-src="${popPosterFit}"></div>
      <div class="d">
        <button class="copy" onclick="copyTextById('peli_${id}_1', this)"><i class="fa-regular fa-clipboard"></i> Copiar</button>
        <div class="contenedor border" id="peli_${id}_1">${videoTitle(title)}_(${releaseYear})_480p_[dual-lat].mp4</div>
        <button class="copy" onclick="copyTextById('peli_${id}_2', this)"><i class="fa-regular fa-clipboard"></i> Copiar</button>
        <div class="contenedor border" id="peli_${id}_2">
          <div class="title_es"><b>⟨🍿⟩ ${title} (${releaseYear})</b></div>
          <div class="title_or"><b>⟨🎥⟩ ${originalTitle}</b></div>
          <div class="separador"><b>➖➖➖➖➖➖➖➖➖➖</b></div>
          <div class="lang"><b>⟨🗣️⟩ Idioma Original: ${langComplete}</b></div>
          <div class="audio"><b>⟨🔊⟩ Audio: 🇲🇽 Dual-Latino</b></div>
          <div class="quality"><b>⟨📺⟩ Calidad: HD</b></div>
          <div class="duration"><b>⟨⏳⟩ Duración: ${durationTime}</b></div>
          <div class="genre"><b>⟨🎭⟩ Género: ${genreEs}</b></div>
          <div class="credits"><b>⟨👤⟩ Reparto: ${actors}</b></div>
          <div class="separador"><b>➖➖➖➖➖➖➖➖➖➖</b></div>
          <div class="trailer"><b>⟨🎞️⟩ Trailer: <a href="https://youtu.be/${ytKey}">https://youtu.be/${ytKey}</a></b></div>
          <div class="view_download"><b>⟨🔗⟩ Ver/Descargar:&nbsp;</b></div>
          <div class="separador"><b>➖➖➖➖➖➖➖➖➖➖</b></div>
        </div>
      </div>
    </div>
  </div>`;
 }

 $("#results").html(resultsHtml);

 const lazyImages = document.querySelectorAll('.movie-card__poster');
 const lazyImageOptions = {
  rootMargin: '0px',
  threshold: 1
 };

 const lazyImageObserver = new IntersectionObserver((entries, observer) => {
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

async function getTrailerKeyAsync(movieId) {
 try {
  const response = await $.ajax({
   url: `${BASE_URL}/movie/${movieId}/videos?${API_KEY}`,
   async: false
  });
  const videos = response.results.filter(video => video.site === "YouTube" && video.type === "Trailer" && video.iso_639_1 === "en");
  if (videos.length > 0) {
   return videos[0].key;
  }
 } catch (error) {
  console.log('Ay, mi amor, algo salió mal:', error);
 }
 return "";
}

async function getGenresAsync(genreIds) {
 const genres = {
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

 const genreList = [];
 for (const genreId of genreIds) {
  if (genres[genreId]) {
   genreList.push(genres[genreId]);
  }
 }
 return genreList.join(",&nbsp;");
}

async function getLanguageAsync(languageCode) {
 const languages = {
  en: "🇺🇸&nbsp;Ingles",
  ca: "🇪🇸&nbsp;Catalan",
  es: "🇲🇽&nbsp;/&nbsp;🇪🇸&nbsp;Español",
  fr: "🇫🇷&nbsp;Frances",
  de: "🇩🇪&nbsp;Aleman",
  it: "🇮🇹&nbsp;Italiano",
  ja: "🇯🇵&nbsp;Japones",
  ko: "🇰🇷&nbsp;/&nbsp;🇰🇵&nbsp;Coreano",
  ru: "🇷🇺&nbsp;Ruso",
  zh: "🇨🇳&nbsp;Chino",
  pl: "🇵🇱&nbsp;Polaco"
 };
 return languages[languageCode] || languageCode;
}

async function showMovieCreditsAsync(movieId) {
 try {
  const response = await $.ajax({
   url: `${BASE_URL}/movie/${movieId}/credits?${API_KEY}&${LANG_ES}`,
   async: false
  });
  const relevantActors = response.cast.filter(actor => actor.order <= 2);
  const actorNames = relevantActors.map(actor => actor.name);
  return actorNames.join(", ");
 } catch (error) {
  console.log('Ay, mi amor, algo salió mal:', error);
  return "";
 }
}

async function getPosterMovieAsync(movieId, size) {
 try {
  const response = await $.ajax({
   url: `${BASE_URL}/movie/${movieId}/images?${API_KEY}&include_image_language=es,en,null&${LANG_ES}`,
   async: false
  });
  const posters = response.posters;
  posters.sort((a, b) => b.popularity - a.popularity);
  const posterPath = posters.find(poster => ["en", "es", "null"].includes(poster.iso_639_1));
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

async function getBackdropMovieAsync(movieId, size) {
 try {
  const response = await $.ajax({
   url: `${BASE_URL}/movie/${movieId}/images?${API_KEY}&include_image_language=es,en,null&${LANG_ES}`,
   async: false
  });
  const backdrops = response.backdrops;
  backdrops.sort((a, b) => b.popularity - a.popularity);
  const backdropPath = backdrops.find(backdrop => ["en", "es", "null"].includes(backdrop.iso_639_1));
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

async function getDurationMovieAsync(movieId) {
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
  .replace(/ú/g, 'u')
  .replace(/ /g, '_');
}