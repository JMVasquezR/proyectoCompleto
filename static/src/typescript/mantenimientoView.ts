import {Sistemas} from './mantenimientoInterface';
import {MantenimientoSistemaService} from './mantenimiento.service';

export class modulo_sistema{
    
    private mantenimientosistemaService = new MantenimientoSistemaService();

    constructor(){

       $('.table').on('click', '.botonsaveEditar', (ev) =>{                   
           let aux = ev.currentTarget
           let value = $(aux).data("value")
           this.geteditarSistemas(value)   
       });

       $('.table').on('click', '.eliminarSistema', (ev) =>{                   
           let aux = ev.currentTarget
           let value = $(aux).data("value")
           this.geteliminarSistema(value)   
       });

        this.getobtenerSistemas();

        $('#newSystem').on('click', '#save_sistema',(ev) => {
            let aux = ev.currentTarget
           let value =  $(aux).data("value")
           let  nombre = $("#nom_sistema").val()
           let descripcion =  $("#descripcion_sistema").val()
           console.log( $("#nom_sistema").val())
            this.setguardarSistemas(value,nombre,descripcion);   
        });   
      
    }

    

    getobtenerSistemas(){
        this.mantenimientosistemaService.getSistemas().done((data)=>{            
            for(let entry of data){                
                let aux =`<tr><td>---</td><td>${entry.id}</td><td>${entry.nombre}</td><td>${entry.descripcion}</td><td>---</td><td><ul class="icons-list">
                <li class="text-primary-600" data-toggle="modal" data-target="#newSystem"><a class="botonsaveEditar" name="sit" data-value="${entry.id}" data-id="1"><i  class="icon-pencil7" >
                </i></a></li><li class="text-danger-600"><a data-value="${entry.id}" class="eliminarSistema"><i class="icon-trash"></i></a></li><li class="text-teal-600"><a><i class="icon-cog7"></i></a></li></ul></td></tr>`;
                $("#tablaSistema").append(aux);
            }
        })
 }

   setguardarSistemas(value : number, nombre : string, descripcion : string){	
        let select_grupo = $( "#sel1 option:selected" ).val(); 
        var data; 
       if(nombre == "") {
           data = null;
        }
        else{
            data={
                nombre: nombre,
                descripcion:  descripcion,
                sigla:'',
                fecha_inicio:'',
                fecha_fin:'',
            }
        }

        if(data==null){
           this.mantenimientosistemaService.saveSistema(data).done((resaponse) =>{
                console.log(resaponse);
            }).fail((response)=>{
            console.log(response); 
            }); 
        }else{
            console.log("aq");
          this.mantenimientosistemaService.editSistema(value,data).done((resaponse) =>{
                console.log(resaponse);
            }).fail((response)=>{
            console.log(response); 
            });
        }
    }

 geteditarSistemas(id: number){
        this.mantenimientosistemaService.getSistemas().done((data)=>{
            let aux = id;
            for(let entry of data){
                if(entry.id == aux)
                    $("#nom_sistema").val(entry.nombre);
                    $("#descripcion_sistema").val(entry.nombre);
            }
        })
    }   

    geteliminarSistema(id : number){
        this.mantenimientosistemaService.deleteSistema(id).done((data)=>{
                console.log(data);
            }).fail((response)=>{
            console.log(response); 
        })
    }
} 

new modulo_sistema()


