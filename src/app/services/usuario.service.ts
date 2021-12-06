import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrearRequest } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  crearUsuario(request:CrearRequest){
    return this.http.post(environment.base_url+"/usuarios",request);
  }
}
