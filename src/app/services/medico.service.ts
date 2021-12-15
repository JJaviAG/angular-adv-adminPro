import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UpdateMedicoRequest } from '../interfaces/medicos.interfaces';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }
  get getToken() {
    return localStorage.getItem('token');
  }
  get getHeaders() {
    return {
      headers: {
        'x-token': this.getToken,
      }
    }
  }
  GetMedicos() {
    return this.http.get(environment.base_url + "/medicos", this.getHeaders).pipe(
      map(
        (response: any) => {
          console.log("desde el serc", response);

          return response.message;
        })
    );
  }
  crearMedico(medico: Medico) {
    return this.http.post(environment.base_url + "/medicos", medico, this.getHeaders);
  }
  actualizarMedico(req) {
    return this.http.put(environment.base_url + "/medicos/" + req._id, req, this.getHeaders);
  }
  BorrarMedico(id: string) {
    return this.http.delete(environment.base_url + "/medicos/" + id, this.getHeaders);
  }
  getMedicoById(id: string) {
    return this.http.get(environment.base_url + "/medicos/" + id, this.getHeaders).pipe(
      map(
        (response: any) => {
          return response.medico;
        })
    );
  }
}
