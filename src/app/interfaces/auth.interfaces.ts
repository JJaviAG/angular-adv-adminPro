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
