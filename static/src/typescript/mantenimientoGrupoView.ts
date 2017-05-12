import { SGrupo } from './mantenimientoGrupoInterface';
import { MantenimientoGrupoService } from './mantenimientoGrupoService';
import { MantenimientoSistemaService } from './mantenimiento.service';
import { modulo_sistema } from './mantenimientoView';
import * as utils from './utils';

declare var $: any;
export class modulo_grupo {

    private mantenimientoGrupo_services = new MantenimientoGrupoService();
    private mantenimientoSistemas_services = new MantenimientoSistemaService();

    private localJsonRules: Object = {
        nomGrupo: {
            maxlength: 10
        },
        desGrupo: {
            maxlength: 40
        },
    };

    private form_grupo_validate: any;

    constructor() {
        // new modulo_sistema();
        this.form_grupo_validate = $('#formgGrupo').validate(utils.validateForm(this.localJsonRules));

        this.getobtenerGrupo();

        this.getDataCombo();

        $('#save_grupo').on('click', () => {
            let value = parseInt($('#save_grupo').attr("data-value"))
            let auxGyE = $(".botonEditarGrupo").attr('data-id')
            let serialArray = $("#formGrupo").serializeArray();
            let objeto = utils.formToObject(utils.serializeForm('formGrupo'));
            let error = 0
            if (auxGyE == null) { auxGyE = "0" }
            $("#save_grupo").attr("data-dismiss", "-1");
            $.each(serialArray, function (i: any, field: any) {
                if (field.value == "") {
                    $('.requeridoG').addClass("alertaDatos");
                    error = 1
                }
                else { console.log(field.value) }
            });
            if (error == 0) {
                $("#save_grupo").attr("data-dismiss", "modal");
                utils.alert_confirmG(() => {
                    this.setguardarGrupo(auxGyE, value, objeto.nomGrupo, objeto.desGrupo);
                });
                $('.requeridoG').removeClass("alertaDatos");
            }
        });

        $('.table').on('click', '.eliminarGrupo', (ev: JQueryEventObject) => {
            let aux = ev.currentTarget
            let value = $(aux).data("value")
            utils.alert_confirmE(() => {
                this.geteliminarSistema(value)
            });
        });

        $('#grupo').on('click', '#newSistema', (ev: JQueryEventObject) => {
            $(".botonEditarGrupo").attr('data-id', 0)
            $("#nomGrupo").val("")
            $("#desGrupo").val("")
        });

        $('.table').on('click', '.botonEditarGrupo', (ev: JQueryEventObject) => {
            let aux = ev.currentTarget
            let value = $(aux).data("value")
            $('#save_grupo').attr('data-value', value)
            $(".botonEditarGrupo").attr('data-id', 1)
            this.geteditarSistemas(value)
        });

        $('#grupo').on('click', '#newGrupo', (ev: JQueryEventObject) => {
            $(".botonEditarGrupo").attr('data-id', 0)
            $("#nomGrupo").val("")
            $("#desGrupo").val("")
        });
    }

    getobtenerGrupo() {
        this.mantenimientoGrupo_services.getGrupo().done((data) => {
            let aux = "";
            for (let entry of data) {
                aux += `<tr><td>${entry.id}</td><td>${entry.nombre}</td><td>${entry.descripcion}</td><td>---</td><td><ul class="icons-list">
                <li class="text-primary-600" data-toggle="modal" data-target="#newGroup"><a class="botonEditarGrupo" name="sit" data-value="${entry.id}" data-id="0"><i  class="icon-pencil7" >
                </i></a></li><li class="text-danger-600"><a data-value="${entry.id}" class="eliminarGrupo"><i class="icon-trash"></i></a></li><li class="text-teal-600"><a><i class="icon-cog7"></i></a></li></ul></td></tr>`;
            }
            $("#tablaGrupo").html(aux);
        })
    }

    setguardarGrupo(tipo: string, value: number, nombre: string, descripcion: string) {

        let select_grupo = $("#sel1 option:selected").val();
        let data = {
            id: value,
            nombre: nombre,
            descripcion: descripcion,
            jefe_grupo: ''
        }
        console.log(tipo);
        if (tipo == "0") {
            this.mantenimientoGrupo_services.saveGrupo(data).done((resaponse) => {
                utils.showSwalAlert('El grupo fue guardado!', 'Guardado', 'success');
                this.getobtenerGrupo();
            }).fail((response) => {
                utils.showSwalAlert('El grupo no se pudo guardar!', 'Error', 'success');
            });
        } else {
            this.mantenimientoGrupo_services.editGrupo(data.id, data).done((resaponse) => {
                utils.showSwalAlert('El grupo fue editado!', 'Editado', 'success');
                this.getobtenerGrupo();
            }).fail((response) => {
                utils.showSwalAlert('El grupo no se pudo editar!', 'Error', 'success');
            });
        }
    }

    getDataCombo() {
        this.mantenimientoGrupo_services.getGrupo().done((data) => {
            let aux = "";
            aux = `<option value="" class="requerido">Selecione</option>`
            for (let entry of data) {
                aux += `<option value="${entry.id}" label="${entry.nombre}"></option>`
            }
            $("#sel1").html(aux);
        })
    }

    geteditarSistemas(id: number) {
        this.mantenimientoGrupo_services.getGrupo().done((data) => {
            let aux = id;
            for (let entry of data) {
                if (entry.id == aux) {
                    $("#nomGrupo").val(entry.nombre);
                    $("#desGrupo").val(entry.descripcion);
                }
            }
        })
    }

    geteliminarSistema(id: number) {
        this.mantenimientoSistemas_services.getSistemas().done((dataS) => {
            if (dataS == "") {
                this.mantenimientoGrupo_services.deleteGrupo(id).done((data) => {
                    utils.showSwalAlert('El grupo fue eliminado!', 'Eliminado', 'success');
                    this.getobtenerGrupo();
                }).fail((response) => {
                    utils.showSwalAlert('El grupo no se pudo eliminar!', 'Error', 'success');
                });
            }
            else {
                for (let entyS of dataS) {
                    if (entyS.grupo == id) {
                        utils.showSwalAlert('Grupo se encuentra enlazado con un Sistema!', 'Advertencia', 'success');
                        break;
                    } else {
                        this.mantenimientoGrupo_services.deleteGrupo(id).done((data) => {
                            utils.showSwalAlert('El grupo fue eliminado!', 'Eliminado', 'success');
                            this.getobtenerGrupo();
                        }).fail((response) => {
                            utils.showSwalAlert('El grupo no se pudo eliminar!', 'Error', 'success');
                        });
                    }
                }
            }

        });
    }
}

