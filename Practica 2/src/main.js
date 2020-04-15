//Evento
window.addEventListener('load', inicio, false);
//Funciones
function inicio() {
    document.getElementById('archivo').addEventListener('change', cargar, false); 
}

function cargar(ev) {   
    var arch=new FileReader();
    //Cargar Archivos
    arch.addEventListener('load',leer,false);
    arch.readAsText(ev.target.files[0]);
}

function leer(ev) {
  Limpiar();
  //Agregamos
  document.getElementById('CampoTexto').value=ev.target.result;
}

function Limpiar(){
  //Limpiamos
  document.getElementById('CampoTexto').value="";
}
document.getElementById("Nuevo_archivo").onclick=function(){
  Limpiar();
}


function Guardar(){
  var NombreArchivo=prompt("Ingrese Nombre del Archivo")+".cs";
  var ContenidoDeArchivo = document.getElementById('CampoTexto').value;

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(ContenidoDeArchivo));
  element.setAttribute('download', NombreArchivo);

  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
} 
document.getElementById("Guarda").onclick=function(){
  Guardar();
}

function GuardarPy(){
  var NombreArchivo=prompt("Ingrese Nombre del Archivo")+".py";
  var ContenidoDeArchivo = document.getElementById('CampoTextoPython').value;

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(ContenidoDeArchivo));
  element.setAttribute('download', NombreArchivo);

  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
} 
document.getElementById("Des_Py").onclick=function(){
  GuardarPy();
}

function GuardarHtml(){
  var NombreArchivo=prompt("Ingrese Nombre del Archivo")+".html";
  var ContenidoDeArchivo = document.getElementById('CampoTextoHTML').value;

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(ContenidoDeArchivo));
  element.setAttribute('download', NombreArchivo);

  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
} 
document.getElementById("Des_Html").onclick=function(){
  GuardarHtml();
}

function GuardarJson(){
  var NombreArchivo=prompt("Ingrese Nombre del Archivo")+".json";
  var ContenidoDeArchivo = document.getElementById('CampoTextoJSON').value;

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(ContenidoDeArchivo));
  element.setAttribute('download', NombreArchivo);

  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
} 
document.getElementById("Des_Json").onclick=function(){
  GuardarJson();
}

function Enviar_Analisis_L(){
  var ContenidoDeArchivo = document.getElementById('CampoTexto').value
  Analizar(ContenidoDeArchivo);
} 
document.getElementById("boton_L").onclick=function(){
  
  Enviar_Analisis_L();
}
