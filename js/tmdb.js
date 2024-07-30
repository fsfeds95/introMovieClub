$(document).ready(function () {
 $("#searchButton").click(function () {
  var searchQuery = $("#searchInput").val();

  searchMovies(searchQuery);
 });

 function searchMovies(query) {
  if (query == "") {
   $("#results").html("<p>Ingrese un título de película para buscar.</p>");
  } else {
   $.getJSON(
    "https://api.themoviedb.org/3/search/movie?api_key=74dc824830c7f93dc61b03e324070886&query=" +
     query +
     "&language=es-MX",
    function (data) {
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

  movies.forEach(function (movie) {
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
    "-": "_",
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

   resultsHtml += `	<div class="movie-card">
			<div class="movie-card__header" style="background-image: url(https://image.tmdb.org/t/p/w500${backdropPath})">
				<span class="movie-card_genre">
					ID: ${id}
				</span>
				<span class="movie-card_genre">
					<a href="https://wmapof.cyclic.app/p?url=https://image.tmdb.org/t/p/original${posterPath}" target="_blank">
						Poster
					</a>
				</span>
				<span class="movie-card_genre">
					<a href="https://wmapof.cyclic.app/b?url=https://image.tmdb.org/t/p/original${backdropPath}" target="_blank">
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
				<div class="movie-card__poster" style="background-image: url(https://image.tmdb.org/t/p/w500${posterPath})"></div>
			<div class="d">


        <a class="copy" onclick="copyTextById('peli_${id}_1')"> Copiar</a>
				<div class="contenedor border" id="peli_${id}_1">${title.replace(/:|\s|-|!|¡|,|¿/g, function (match) {
      return replaceTitle[match];
     })}_(${releaseYear})_540p_dual-lat_@AstroPeliculasOf.mp4</div>
        
        
        <a class="copy" onclick="copyTextById('peli_${id}_2')"> Copiar</a>
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
					<div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>
					<div class="genero"><b>🎭&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;&#42;Género&nbsp;|&#42;&#42;</b>&nbsp;&#42;&#42;${getGenres(movie.genre_ids)}&#42;&#42;</div><div>&nbsp;</div>
					<div class="ano"><b>🗓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;&#42;Año&nbsp;|&#42;&#42;</b>&nbsp;&#95;&#95;<i>${releaseYear}</i>&#95;&#95;</div><div>&nbsp;</div>
					<div class="calidad"><b>📺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;&#42;Calidad&nbsp;|&#42;&#42;&nbsp;&#42;&#42;#540p&#42;&#42;</b></div><div>&nbsp;</div>
					<div class="idioma"><b>🗣&nbsp;&nbsp;&#42;&#42;Idioma Original&nbsp;|&#42;&#42;&nbsp;${getLanguage(language)}</b></div><div>&nbsp;</div>
					<div class="audio"><b>🎧&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;&#42;Audio&nbsp;|&#42;&#42;&nbsp;🇲🇽&nbsp;&#42;&#42;#Latino&#42;&#42;</b></div><div>&nbsp;</div>
					<div class="Sinopsis"><b>📝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;&#42;Sinopsis&nbsp;|&#42;&#42;</b>&nbsp;<code>&#96;${overview}&#96;</code></div>
					<div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>
					<div class="redes"><b>▫️&nbsp;&#42;&#42;Síguenos&nbsp;como&#42;&#42;&nbsp;@AstroPeliculasOf</b></div></div>
				
				
				<a class="copy" onclick="copyTextById('peli_${id}_3')"> Copiar</a>
				<div class="contenedor border" id="peli_${id}_3">
				  <div class="trailer">📽&nbsp;Trailer&nbsp;Oficial&nbsp;📽&nbsp;-&nbsp;https://youtu.be/${getTrailerKey(id)}</div>
					<div class="canal_contenedor">👨‍🚀&nbsp;Cᴏɴᴛᴇɴᴇᴅᴏʀ&nbsp;👨‍🚀&nbsp;-&nbsp;https://t.me/+3fe6UvaLvKk2MGVh</div>
					<div class="ver_descargar">➡️&nbsp;Vᴇʀ&nbsp;/&nbsp;Dᴇsᴄᴀʀɢᴀʀ&nbsp;⬅️&nbsp;-&nbsp;https://t.me/c/1972636331/</div>
					</div>
					
					
				<a class="copy" onclick="copyTextById('peli_${id}_4')"> Copiar</a>
				<div class="contenedor border" id="peli_${id}_4">
					<div class="titulo_es"><b>🍿&nbsp;&#42;&#42;${title}&#42;&#42;</b></div>
					<div class="titulo_en"><b>📽&nbsp;&#95;&#95;<i>${originalTitle}</i>&#95;&#95;</b></div>
					<div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>
					<div class="ano"><b>🗓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;&#42;Año&nbsp;|&#42;&#42;</b>&nbsp;&#95;&#95;${releaseYear}&#95;&#95;</div><div>&nbsp;</div>
					<div class="calidad"><b>📺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;&#42;Calidad&nbsp;|&#42;&#42;&nbsp;&#42;&#42;#540p&#42;&#42;</b></div><div>&nbsp;</div>
					<div class="idioma"><b>🗣&nbsp;&nbsp;&nbsp;&nbsp;&#42;&#42;Idioma Original&nbsp;|&#42;&#42;&nbsp;${getLanguage(language)}</b></div><div>&nbsp;</div>
					<div class="audio"><b>🎧&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;&#42;Audio&nbsp;|&#42;&#42;&nbsp;🇲🇽&nbsp;&#42;&#42;#Latino&#42;&#42;</b></div>
					<div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>
					<div class="redes"><b>▫️&nbsp;&#42;&#42;Síguenos&nbsp;como&#42;&#42;&nbsp;@AstroPeliculasOf</b></div>
				</div>
				<a class="copy" onclick="copyTextById('peli_${id}_5')"> Copiar</a>
				<div class="contenedor border" id="peli_${id}_5">
					<div class="trailer">📽&nbsp;Trailer&nbsp;Oficial&nbsp;📽&nbsp;-&nbsp;https://youtu.be/${getTrailerKey(id)}</div>
					<div class="canal_principal">🌎&nbsp;Canal&nbsp;Principal&nbsp;🌎&nbsp;-&nbsp;@AstroPeliculasOf</div>
			</div>
		</div>
	</div>`;
  });

  $("#results").html(resultsHtml);
 }

 function getTrailerKey(movieId) {
  var trailerKey = "";

  $.ajax({
   url: `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=fd7402172ca9f36816c7691becaf455f`,

   async: false,

   success: function (data) {
    var videos = data.results.filter(function (video) {
     return (
      video.site === "YouTube" && 
      video.type === "Trailer" //&& 
      //video.iso_639_1 === "es"
     );
    });

    if (videos.length > 0) {
     trailerKey = videos[0].key;
    }
   }
  });

  return trailerKey;
 }

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

  genreIds.forEach(function (genreId) {
   if (genres[genreId]) {
    genreList.push(genres[genreId]);
   }
  });

  return genreList.join(", ");
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
 if (vote >= 8) {
  return "green";
 } else if (vote >= 5) {
  return "orange";
 } else {
  return "red";
 }
}