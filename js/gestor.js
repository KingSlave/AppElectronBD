exports.guardarContacto = guardarContacto;
exports.consultar=consultar;
exports.eliminar = eliminar;
exports.obtener = obtener;
exports.guardarCambios = guardarCambios;

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
bd.put(c,function(err,doc){
  if(!err){
    alert('El contacto ha sido guardado');
  }
});
}

function consultar(contenido){
bd.allDocs({include_docs:true,attachments:true,
  startkey:'contacto'}).then(function(doc){
    for(var i=0;i<doc.rows.length;i++){
      contenido.innerHTML+="<tr>"+
      "<td>"+doc.rows[i].doc.nombre+"</td>"+
      "<td>"+doc.rows[i].doc.edad+"</td>"+
      "<td>"+doc.rows[i].doc.email+"</td>"+
      "<td><button class='boton-no' onclick='eliminar(\""+doc.rows[i].doc._id+"\",\""+doc.rows[i].doc._rev+"\")'>Eliminar</button></td>"+
      "<td><a class='boton' href='modificar.html?id="+doc.rows[i].doc._id+"&rev="+doc.rows[i].doc._rev+"'>Modificar</a></td>"+
      "</tr>";
    }
  }).catch(function(err){
    console.log('ERROR: No se pudo consultar');
  });
}

function eliminar(id,rev){
bd.remove(id,rev,function(err,res){
  if(err){
    alert('No se pudo eliminar');
    }
    else {
      alert('Documento eliminado!');
        // window.location="consulta.html";
        location.reload();
    }
});
}

function obtener(id,mostrar){
    bd.get(id,mostrar);
}

function guardarCambios(id,rev,nombre,edad,email,resultado){

bd.put({_id:''+id,
_rev:''+rev,
nombre:''+nombre,
edad:''+edad,
email:''+email},resultado);

}
