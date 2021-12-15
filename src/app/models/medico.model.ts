import { MedicoUser } from "../interfaces/medicos.interfaces";
import { Hospital } from "./hospital.model";


export class Medico {

    constructor(
        public nombre: string,
        public id?: string,
        public img?: string,
        public usuario?: MedicoUser,
        public hospital?:Hospital) {

    }

}