import { HospitalesUser } from "../interfaces/hospitales.interfaces";

export class Hospital {

    constructor(public id: string, public nombre: string, public img?: string, public usuario?: HospitalesUser) {

    }

}