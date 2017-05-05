import {Sistemas} from './mantenimientoInterface';
import {MantenimientoSistemaService} from './mantenimiento.service';

export class modulo_sistema{
    
    private mantenimientosistemaService = new MantenimientoSistemaService();

    constructor(){

        this.getobtenerSistemas();

        $('#save_sistema').on('click', () => {
             
            this.setguardarSistemas();                   
        });

       
        
    }

    getobtenerSistemas(){
        this.mantenimientosistemaService.getSistemas().done((data)=>{            
            for(let entry of data){                
                let aux =`<tr><td>---</td><td>${entry.id}</td><td>${entry.nombre}</td><td>${entry.descripcion}</td><td>---</td><td><ul class="icons-list">
                <li class="text-primary-600" data-toggle="modal" data-target="#newSystem"><a name="sit" data-value="${entry.id}"><i  class="icon-pencil7" >
                </i></a></li><li class="text-danger-600"><a><i class="icon-trash"></i></a></li><li class="text-teal-600"><a><i class="icon-cog7"></i></a></li></ul></td></tr>`;
        	    $("#tablaSistema").append(aux);
            }
            /*para sacar el id del boton de la tabla*/
             $('table a[name="sit"').off();
             $('table a[name="sit"]').on('click',(ev)=>{
            
            let aux = ev.currentTarget
             console.log($(aux).data("value"));
        });
        })
    }

   setguardarSistemas(){	
        let select_grupo = $( "#sel1 option:selected" ).val();  
        var data={
            nombre: $("#nom_sistema").val(),
            descripcion:  $("#descripcion_sistema").val(),
            sigla:'asa',
            fecha_inicio:'01/01/2010',
            fecha_fin:'01/01/2010',
        }
        console.log(data);
        this.mantenimientosistemaService.saveSistema(data).done((resaponse) =>{
            console.log(resaponse);
        }).fail((response)=>{
           console.log(response); 
        });        
    }

    geteditarSistemas(id: number){
        this.mantenimientosistemaService.getSistemas().done((data)=>{
            for(let entry of data){
                let aux = entry.id
                console.log(aux);
            }
        })
    }

} 

new modulo_sistema()


