"use strict";
//carga el html juegos de estrategia
$("#gamesStrategy").on("click", function(event) {
  event.preventDefault();
  loading_archives("JuegosDeEstrategia");
});
//carga el html juegos de disparos
$("#gamesShot").on("click", function(event) {
  event.preventDefault();
  loading_archives("JuegosDeDisparos");
});
//carga el html registro
$("#register").on("click", function(event) {
  event.preventDefault();
  loading_archives("Registracion");
});
//carga el html tabla de consultas
$("#tableRegister").on("click", function(event) {
  event.preventDefault();
  loading_archives("TablaDeConsultas");
});
//carga el html extra
$("#pageExtra").on("click", function(event) {
  event.preventDefault();
  loading_archives("Extra");
});
//carga el html contacto
$("#contact").on("click", function(event) {
  event.preventDefault();
  loading_archives("ContactoYUbicacion");
});

//funcion parcial-render
function loading_archives(archives){
$.ajax({
  url: archives + ".html",
  method:"GET",
  dataType:"html",
  success: function(data){
    $("#use-ajax").html(data);
  },
  error: function(){
    $("#use-ajax").html("<h1>Error - Request Failed!</h1>");
  }
});
$("#use-ajax").html("<h1 class='loading'>Loading...</h1>");
};
