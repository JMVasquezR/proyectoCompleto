import { Sistemas } from './mantenimientoInterface';
import { MantenimientoSistemaService } from './mantenimiento.service';
import { MantenimientoGrupoService } from './mantenimientoGrupoService';
import * as utils from './utils';
import { modulo_grupo } from './mantenimientoGrupoView';

declare var $: any;
export class modulo_sistema {

    private mantenimientosistemaService = new MantenimientoSistemaService();
    private mantenimientogrupoService = new MantenimientoGrupoService();
    private auxGrupo: any = {};

    private localJsonRules: Object = {
  
        nom_sistema: {
            maxlength: 4
        }
    };

private form_local_validate: any;

    constructor() {
        // new modulo_grupo()
        this.form_local_validate = $('#form_sistema').validate(utils.validateForm(this.localJsonRules));
        console.log(this.form_local_validate)
        new modulo_grupo();

        this.getobtenerSistemas();

       

        /*Modulo sistemas*/
        $('.table').on('click', '.botonEditarSistema', (ev: JQueryEventObject) => {
            let aux = ev.currentTarget
            let value = $(aux).data("value")
            $('#save_sistema').attr('data-value', value)
            $(".botonEditarSistema").attr('data-id', 1)
            this.geteditarSistemas(value)
        });

        $('.table').on('click', '.eliminarSistema', (ev: JQueryEventObject) => {
            let aux = ev.currentTarget
            let value = $(aux).data("value")
            utils.alert_confirmE(() => {
                this.geteliminarSistema(value)
            });
        });

        $('#save_sistema').on('click', () => {
            let value = parseInt($('#save_sistema').attr("data-value"))
            let nombre = $("#nom_sistema").val()
            let descripcion = $("#descripcion_sistema").val()
            let auxGyE = $(".botonEditarSistema").attr('data-id')
            let grupo = $('#sel1 option:selected').val();
            let x = $("#form_sistema").serializeArray();
            let error = 0
            if (auxGyE == null) { auxGyE = "0" }
            $("#save_sistema").attr("data-dismiss", "-1");
             
             

            /*$.each(x, function (i: any, field: any) {
                if (field.value == "") {
                    $('.requerido').addClass("alertaDatos");
                    error = 1
                }
                else { console.log(field.value) }
            });
            console.log(error)
            if (error == 0) {
                $("#save_sistema").attr("data-dismiss", "modal");
                utils.alert_confirmG(() => {
                    this.setguardarSistemas(auxGyE, value, nombre, descripcion, grupo);
                });
                $('.requerido').removeClass("alertaDatos");
            }*/
        });

        $('#sistema').on('click', '#newSistema', (ev: JQueryEventObject) => {
            $(".botonEditarSistema").attr('data-id', 0)
            $("#nom_sistema").val("")
            $("#descripcion_sistema").val("")
            $("#sel1 ").val("-1");
            new modulo_grupo();
        });
    }

    /*Modulo sistemas*/
    getobtenerSistemas() {
        this.mantenimientosistemaService.getSistemas().done((dataS) => {
            let aux1, aux3, auxT = "";
            let aux2 = "";
            this.getobtenerGrupo()
            this.mantenimientogrupoService.getGrupo().done((dataG) => {
                for (let entryS of dataS) {
                    aux1 = `<tr><td>${entryS.id}</td><td>${entryS.nombre}</td><td>${entryS.descripcion}</td><td>`
                    for (let entryG of dataG) {
                        if (entryS.grupo == entryG.id) {
                            aux2 = `${entryG.nombre}`
                        }
                    }
                    aux3 = `</td><td><ul class="icons-list"><li class="text-primary-600" data-toggle="modal" data-target="#newSystem"><a class="botonEditarSistema" 
                name="sit" data-value="${entryS.id}" data-id="1" data-select="${entryS.grupo}"><i  class="icon-pencil7" ></i></a></li><li class="text-danger-600"><a data-value="${entryS.id}" class="eliminarSistema">
                <i class="icon-trash"></i></a></li><li class="text-teal-600"><a><i class="icon-cog7"></i></a></li></ul></td></tr>`;
                    auxT += aux1 + aux2 + aux3
                }
                $("#tablaSistema").html(auxT);
            })
        })
    }

    setguardarSistemas(tipo: string, value: number, nombre: string, descripcion: string, grupo: string) {
        let select_grupo = $("#sel1 option:selected").val();
        let data = {
            id: value,
            nombre: nombre,
            descripcion: descripcion,
            sigla: '',
            fecha_inicio: '',
            fecha_fin: '',
            grupo: grupo
        }
        if (tipo == "0") {
            this.mantenimientosistemaService.saveSistema(data).done((resaponse) => {
                utils.showSwalAlert('El sistema fue guardado!', 'Guardado', 'success');
                this.getobtenerSistemas();
            }).fail((response) => {
                utils.showSwalAlert('El sistema no se pudo guardar!', 'Error', 'success');
            });
        } else {
            this.mantenimientosistemaService.editSistema(data.id, data).done((resaponse) => {
                utils.showSwalAlert('El sistema fue editado!', 'Editado', 'success');
                this.getobtenerSistemas();
            }).fail((response) => {
                utils.showSwalAlert('El sistema no se pudo editar!', 'Error', 'success');
            });
        }
    }

    geteditarSistemas(id: number) {
        this.mantenimientosistemaService.getSistemas().done((data) => {
            let aux = id;
            for (let entry of data) {
                if (entry.id == aux) {
                    $("#nom_sistema").val(entry.nombre);
                    $("#descripcion_sistema").val(entry.descripcion);
                    $("#sel1 ").val(entry.grupo);
                }
            }
        })
    }

    geteliminarSistema(id: number) {
        this.mantenimientosistemaService.deleteSistema(id).done((data) => {
            utils.showSwalAlert('El sistema fue eliminado!', 'Eliminado', 'success');
            this.getobtenerSistemas();
        }).fail((response) => {
            utils.showSwalAlert('El sistema no se pudo eliminar!', 'Error', 'success');
        })
    }

    getobtenerGrupo() {
        this.mantenimientogrupoService.getGrupo().done((data) => {
            this.auxGrupo = data
        })
    }
}



new modulo_sistema()


