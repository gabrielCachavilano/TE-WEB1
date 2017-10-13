
//carga la tabla al abrir el html
$(document).ready(function(){
  "use strict";
  Obtener_informacion();
});

$("#Cargar_datos").on('click', function() {
   subir_info();
});

function subir_info() {
  let default_data = {
   0:{
     informacion_nombre : "Carlos",
     informacion_email : "carlos@mail.com",
     informacion_direccion : "Tandil",
     informacion_consulta : "Hola, esta es mi consulta.",
   },
   1:{
     informacion_nombre : "Juan",
     informacion_email: "juan@mail.com",
     informacion_direccion: "Tandil",
     informacion_consulta: "Hola, esta es una consulta.",
   },
   2:{
     informacion_nombre : "Jose",
     informacion_email : "Jose@mail.com",
     informacion_direccion : "Tandil",
     informacion_consulta: "Tengo una consulta.",
   }
 };

 for(let i=0; i <= 2; ++i)
  {
   pasar_parametro(
     default_data[i].informacion_nombre,
     default_data[i].informacion_email,
     default_data[i].informacion_direccion,
     default_data[i].informacion_consulta);
  }
  $('#table_datos > tbody').html('');
  Obtener_informacion();
}
//llamado de la info guardada
function Obtener_informacion(){
  $.ajax({
     method: "GET",
     dataType: 'JSON',
     url: "https://web-unicen.herokuapp.com/api/thing/group/" + 131,
     success: function(resultData){
       for (let i = 0; i < resultData.information.length; i++) {
         $("#table_datos > tbody").append('<tr id="'+resultData.information[i]['_id'] +'">'
         + '<td class="td">'+ resultData.information[i]['thing']['informacion_nombre'] +'</td>'
         + '<td class="td">'+ resultData.information[i]['thing']['informacion_email'] +'</td>'
         + '<td class="td">'+ resultData.information[i]['thing']['informacion_direccion'] +'</td>'
         + '<td class="td">'+ resultData.information[i]['thing']['informacion_consulta'] +'</td>'
         + '<td class="button">' + '<button type="button" name"button" data-value="'+ resultData.information[i]['_id'] + '" class="erase">Borrar</Button>' + '</td>'
         + '</tr>');

       }
       $('button.erase').on('click', function(){
         borrar_info($(this).data('value'));
       });

     },
     error:function(jqxml, status, errorThrown){
       console.log(errorThrown);
     }
  });
}

function borrar_info(id_info){
  $.ajax({
        method: "DELETE",
        url: "https://web-unicen.herokuapp.com/api/thing/" + id_info,
        success: function(data) {
         $('tr#'+ id_info).remove();
        }
});
}


$("#enviar_datos").on("click", function(){
  guardarInformacion();
});

function guardarInformacion(){
  event.preventDefault();
  let grupo = 131;
  let informacion_nombre = $("#nombre").val();
  let informacion_email = $("#email").val();
  let informacion_direccion = $("#direccion").val();
  let informacion_consulta = $("#consulta").val();
  pasar_parametro(informacion_nombre,informacion_email,informacion_direccion,informacion_consulta);
  $('form')[0].reset();
}

function pasar_parametro(informacion_nombre,informacion_email,informacion_direccion,informacion_consulta) {
  let info = {
      group: 131,
      thing : {
        informacion_nombre, informacion_email, informacion_direccion, informacion_consulta,
      }};

    $.ajax({
       method: "POST",
       dataType: 'JSON',
       data: JSON.stringify(info),
       contentType: "application/json; charset=utf-8",
       url: "https://web-unicen.herokuapp.com/api/thing",
       success: function(resultData){
         console.log(resultData);
       },
       error:function(jqxml, status, errorThrown){
         console.log(errorThrown);
       }
    });
}
