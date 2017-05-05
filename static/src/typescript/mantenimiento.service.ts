declare var BASEURL : string;

export class MantenimientoSistemaService{
    
    private url_mantenimientoService : string = 'http://192.168.200.123:8080/apirest/sistemas/';
    
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
}