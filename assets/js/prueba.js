var incrementoS = 1;
var incrementoG = 1;
var incrementoM = 1;
var incrementoP = 1;
var id = 111;
function myFunction() {
	var nomSistema = $("#nomSistema").val();	
	var selectGrupo = $( "#sel1 option:selected" ).val();
	var descripcion = $("#descripcionSistema").val();
	
	var aux ="<tr><td>"+incrementoS+"</td><td>"+id+"</td><td>"+nomSistema+"</td><td>"+descripcion+"</td><td>"+selectGrupo+"</td><td>"+
		"<ul class='icons-list'><li class='text-primary-600' data-toggle='modal' data-target='#newSystem'><a href='#'>"+
		"<i onclick='funcionEditar()'' class='icon-pencil7' data-id="+id+"></i></a></li><li class='text-danger-600'><a href='#'><i class='icon-trash'></i></a>"+
		"</li><li class='text-teal-600'><a href='#'><i class='icon-cog7'></i></a></li></ul></td></tr>";
        	$("#tablaSistema").append(aux);
  	incrementoS = incrementoS + 1;
  	id = id + 1;
  	Limpiar();
}

function guardarGrupo() {
	var nomGrupo = $("#nomGrupo").val();	
	var selectTrabajador = $( "#sel2 option:selected" ).val();
	var desGrupo = $("#desGrupo").val();
	
	var aux ="<tr><td>"+incrementoG+"</td><td>"+id+"</td><td>"+nomGrupo+"</td><td>"+desGrupo+"</td><td>"+selectTrabajador+"</td><td>...</td><td>"+
		"<ul class='icons-list'><li class='text-primary-600' data-toggle='modal' data-target='#newGroup'><a href='#'>"+
		"<i onclick='funcionEditar()'' class='icon-pencil7' data-id="+id+"></i></a></li><li class='text-danger-600'><a href='#'><i class='icon-trash'></i></a>"+
		"</li><li class='text-teal-600'><a href='#'><i class='icon-cog7'></i></a></li></ul></td></tr>";
        	$("#tablaGrupo").append(aux);
  	incrementoG = incrementoG + 1;
  	id = id + 1;
  	Limpiar();
}

function guardarModulo() {
	var nomModulo = $("#nomModulo").val();	
	var observacion = $( "#observacion" ).val();
	var desGrupo = $("#desModulo").val();
	
	var aux ="<tr><td>"+incrementoM+"</td><td>"+id+"</td><td>"+nomModulo+"</td><td>"+observacion+"</td><td>"+desGrupo+"</td><td>"+
		"<ul class='icons-list'><li class='text-primary-600' data-toggle='modal' data-target='#newModulo'><a href='#'>"+
		"<i onclick='funcionEditar()'' class='icon-pencil7' data-id="+id+"></i></a></li><li class='text-danger-600'><a href='#'><i class='icon-trash'></i></a>"+
		"</li><li class='text-teal-600'><a href='#'><i class='icon-cog7'></i></a></li></ul></td></tr>";
        	$("#tablaModulo").append(aux);
  	incrementoM = incrementoM + 1;
  	id = id + 1;
  	Limpiar();
}

function guardarPersonal() {
	var nomPersonal = $("#nomPersonal").val();	
	var apePaterno = $( "#apePaterno" ).val();
	var apeMaterno = $("#apeMaterno").val();
	var sexo = $("#sexo").val();
	var cargo = $("#cargo").val();
	
	var aux ="<tr><td>"+incrementoM+"</td><td>"+id+"</td><td>"+nomPersonal+"</td><td>"+apePaterno+"</td><td>"+apeMaterno+"</td><td>"+cargo+
	"</td><td>"+sexo+"</td><td><ul class='icons-list'><li class='text-primary-600' data-toggle='modal' data-target='#newPersonal'><a href='#'>"+
		"<i onclick='funcionEditar()'' class='icon-pencil7' data-id="+id+"></i></a></li><li class='text-danger-600'><a href='#'><i class='icon-trash'></i></a>"+
		"</li><li class='text-teal-600'><a href='#'><i class='icon-cog7'></i></a></li></ul></td></tr>";
        	$("#tablaPersonal").append(aux);
  	incrementoP = incrementoP + 1;
  	id = id + 1;
  	Limpiar();
}

function Limpiar(){
	var nomSistema = $("#nomSistema").val("");	
	var selectGrupo = $( "#sel1 option:selected" ).val("");
	var descripcion = $("#descripcionSistema").val("");
	var nomGrupo = $("#nomGrupo").val("");	
	var selectTrabajador = $( "#sel2 option:selected" ).val("");
	var desGrupo = $("#desGrupo").val("");
	var nomModulo = $("#nomModulo").val("");	
	var observacion = $( "#observacion" ).val("");
	var desGrupo = $("#desModulo").val("");
	var nomPersonal = $("#nomPersonal").val("");	
	var apePaterno = $( "#apePaterno" ).val("");
	var apeMaterno = $("#apeMaterno").val("");
}


    


