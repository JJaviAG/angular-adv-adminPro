export interface MedicoUser{
    _id:string,
    nombre:string,
    img:string,
}
export interface UpdateMedicoRequest{
    id:string;
    nombre:string;
    idHospital:string;
}