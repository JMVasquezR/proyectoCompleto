declare var BASEURL : string;

export class MantenimientoGrupoService{

    private url_mantenimientogrupoService : string ='http://172.16.2.205:82/apirest/grupo/';

    getGrupo(): JQueryXHR{
        return $.ajax({
            url: this.url_mantenimientogrupoService
        })
    }

    saveGrupo(data: Object): JQueryXHR{ 
        return $.ajax({
            url: this.url_mantenimientogrupoService,            
            type: 'POST',
            data: data
        })
    }
    editGrupo(pk:number, data: Object): JQueryXHR{ 
        return $.ajax({
            url: `${this.url_mantenimientogrupoService}${pk}/`,            
            type: 'PUT',
            data: data
        })
    }
    deleteGrupo(pk: number): JQueryXHR {
        return $.ajax({
            url: `${this.url_mantenimientogrupoService}${pk}/`,
            type: 'DELETE',
        });
    }
}