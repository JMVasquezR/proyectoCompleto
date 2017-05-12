import { Sistemas } from './mantenimientoInterface';
import { MantenimientoSistemaService } from './mantenimiento.service';
import { MantenimientoGrupoService } from './mantenimientoGrupoService';
import * as utils from './utils';
import { modulo_grupo } from './mantenimientoGrupoView';

declare var $: any;
export class modulo_sistema {

    private mantenimientosistemaService = new MantenimientoSistemaService();
    private mantenimientogrupoService = new MantenimientoGrupoService();

    private localJsonRules: Object = {
        nom_sistema: {
            maxlength: 20
        },
        descripcion_sistema: {
            maxlength: 40
        },
        sel1: {
            maxlength: 1
        }
    };

    private form_sistema_validate: any;

    constructor() {
        // new modulo_grupo()
        this.form_sistema_validate = $('#form_sistema').validate(utils.validateForm(this.localJsonRules));
        let a = this.form_sistema_validate.valid();
        new modulo_grupo();

        this.getobtenerSistemas();

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
            let auxGyE = $(".botonEditarSistema").attr('data-id')
            let serialArray = $("#form_sistema").serializeArray();
            let error = 0
            let objeto = utils.formToObject(utils.serializeForm('form_sistema'));
            debugger
            if (auxGyE == null) { auxGyE = "0" }
            $("#save_sistema").attr("data-dismiss", "-1");
            $.each(objeto, function (i: any, field: any) {
                if (field.value == "") {
                    $('.requerido').addClass("alertaDatos");
                    error = 1
                }
                else { }
            });
            if (error == 0) {
                $("#save_sistema").attr("data-dismiss", "modal");
                utils.alert_confirmG(() => {
                    this.setguardarSistemas(auxGyE, value, objeto.nom_sistema, objeto.descripcion_sistema, objeto.sel1, objeto.check_activo);
                });
                $('.requerido').removeClass("alertaDatos");
            }
        });

        $('#sistema').on('click', '#newSistema', (ev: JQueryEventObject) => {
            $(".botonEditarSistema").attr('data-id', 0)
            $("#nom_sistema").val("")
            $("#descripcion_sistema").val("")
            $("#sel1 ").val("-1");
            $("#nom_sistema-error").css("display", "none");
            $("#descripcion_sistema-error").css("display", "none");
            $("#sel1-error").css("display", "none");
            new modulo_grupo();
        });
    }

    /*Modulo sistemas*/
    getobtenerSistemas() {
        this.mantenimientosistemaService.getSistemas().done((dataS) => {
            let auxT = "";
            this.mantenimientogrupoService.getGrupo().done((dataG) => {
                for (let entryS of dataS) {
                    auxT += `<tr><td>${entryS.id}</td><td>${entryS.nombre}</td><td>${entryS.descripcion}</td><td>`
                    for (let entryG of dataG) {
                        if (entryS.grupo == entryG.id) {
                            auxT += `${entryG.nombre}</td><td>`
                        }
                    }
                    if (entryS.estado) { auxT += `Activo` } else { auxT += `Desactivado` }
                    auxT += `</td><td><ul class="icons-list"><li class="text-primary-600" data-toggle="modal" data-target="#newSystem"><a class="botonEditarSistema" 
                name="sit" data-value="${entryS.id}" data-id="1" data-select="${entryS.grupo}"><i  class="icon-pencil7" ></i></a></li><li class="text-danger-600"><a data-value="${entryS.id}" class="eliminarSistema">
                <i class="icon-trash"></i></a></li><li class="text-teal-600"><a><i class="icon-cog7"></i></a></li></ul></td></tr>`;
                }
                $("#tablaSistema").html(auxT);
            })
        })
    }

    setguardarSistemas(tipo: string, value: number, nombre: string, descripcion: string, grupo: string, activo: number) {
        let select_grupo = $("#sel1 option:selected").val();
        let data = {
            nombre: nombre,
            descripcion: descripcion,
            estado: activo,
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
            this.mantenimientosistemaService.editSistema(value, data).done((resaponse) => {
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
}



new modulo_sistema()


