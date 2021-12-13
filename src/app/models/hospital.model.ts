import { HospitalesUser } from "../interfaces/hospitales.interfaces";
import { Usuario } from "./usuario.model";

export class Hospital{

    constructor(public _id:string,nombre:string,img?:string,usuario?:HospitalesUser){

    }
  
}