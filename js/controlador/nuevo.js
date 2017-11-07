var gestor = require('./js/gestor');

function guardar(){

var nombre = document.getElementById('nombre').value;
var edad = document.getElementById('edad').value;
var email = document.getElementById('email').value;

gestor.guardarContacto(nombre,edad,email);



}
