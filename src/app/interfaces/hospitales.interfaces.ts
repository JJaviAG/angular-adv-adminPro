import { Hospital } from "../models/hospital.model";

export interface HospitalesUser{
    _id:string,
    nombre:string,
    img:string,
}
export interface ObtenerHospitalesResponse{
    ok:boolean;
    message:Hospital[];
}