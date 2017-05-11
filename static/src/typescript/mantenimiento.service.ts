declare var BASEURL : string;

export class MantenimientoSistemaService{
    
    private url_mantenimientoService : string = 'http://172.16.2.205:82/apirest/sistemas/';
    
    getSistemas(): JQueryXHR{
        return $.ajax({
            url: this.url_mantenimientoService
        })
    }

    saveSistema(data: Object): JQueryXHR{ 
        return $.ajax({
            url: this.url_mantenimientoService,            
            type: 'POST',
            data: data
        })
    }
    editSistema(pk:number, data: Object): JQueryXHR{ 
        return $.ajax({
            url: `${this.url_mantenimientoService}${pk}/`,            
            type: 'PUT',
            data: data
        })
    }
    deleteSistema(pk: number): JQueryXHR {
        return $.ajax({
            url: `${this.url_mantenimientoService}${pk}/`,
            type: 'DELETE',
        });
    }
}