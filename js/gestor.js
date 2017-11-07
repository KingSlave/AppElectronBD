exports.guardarContacto = guardarContacto;
exports.consultar=consultar;

var PouchDB = require('./vendor/pouchdb');

var bd = PouchDB('agenda');

function Contacto(nombre,edad,email){
  var obj = new Object();
  obj._id="contacto-"+nombre;
  obj.nombre=nombre;
  obj.edad=edad;
  obj.email=email;
  return obj;
}

function guardarContacto(nombre,edad,email){
var c = new Contacto(nombre,edad,email);
bd.put(c);
}

function consultar(contenido){
bd.allDocs({include_docs:true,attachments:true,
  startkey:'contacto'}).then(function(doc){
    for(var i=0;i<doc.rows.length;i++){
      contenido.innerHTML+="<tr>"+
      "<td>"+doc.rows[i].doc.nombre+"</td>"+
      "<td>"+doc.rows[i].doc.edad+"</td>"+
      "<td>"+doc.rows[i].doc.email+"</td>"+
      "</tr>";
    }
  }).catch(function(err){
    console.log('ERROR: No se pudo consultar');
  });
}
