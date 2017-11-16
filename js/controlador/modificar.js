var gestor = require('./js/gestor');

function mostrar(err,doc){
  if(err)
  alert('Error al obtener = ' + err);
  else {
  var cajaNombre = document.getElementById('nombre');
  var cajaEdad = document.getElementById('edad');
  var cajaEmail = document.getElementById('email');
  cajaNombre.value = doc.nombre;
  cajaEdad.value = doc.edad;
  cajaEmail.value = doc.email;
}
}

function cargar(){
var dir = window.location.href;
var url = new URL(dir);
var id = url.searchParams.get('id');
var rev = url.searchParams.get('rev');
document.getElementById('id').value = id;
document.getElementById('rev').value = rev;
gestor.obtener(id,mostrar);
}

function resultado(err,res){
    if(err)
      alert('No se pudieron guardar cambios');
    else
      {
        alert('Los cambios se guardaron correctamente');
        window.location = "consulta.html";
      }
}

function guardarCambios(){
    var id = document.getElementById('id').value;
    var rev = document.getElementById('rev').value;
    var nombre = document.getElementById('nombre').value;
    var edad = document.getElementById('edad').value;
    var email = document.getElementById('email').value;
    gestor.guardarCambios(id,rev,nombre,edad,email,resultado);
}
