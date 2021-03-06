
export interface SGrupo{
    id : number;
    nombre : string;
    descripcion : string;
    jefe_grupo : SPersonal;
}


interface SPersonal{
    id_personal : number;
    nombre : string;
    ap_paterno : string;
    ap_materno : string;
    cargo : SCargo;
    sexo : string;
}

interface SCargo{
    id_cargo : number;
    nombre_cargo : string;
    descripcion : string;
}

interface SModulo {
    id_modulo : number;
    nombre_modulo : string;
    descripcion : string;
    observacion : string;
}
