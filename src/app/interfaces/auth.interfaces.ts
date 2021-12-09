import { Usuario } from "../models/usuario.model";

export interface CrearRequest {
    nombre:string;
    email:string;
    password:string;
    rewritePass:string;
    terminos:boolean;
}
export interface loginRequest{
    email:string;
    password:string;
    remember:boolean;
}
export interface ActualizarUsuarioRequest{
    nombre:string;
    email:string;
    role:string;
}
export interface ObtenerUsuariosResponse{
    Resultados:Usuario[];
    total:number;
}
export interface BuscarResponse{
    ok:boolean;
    Resultados:Usuario[];
}
