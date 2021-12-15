import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BuscarResponse } from '../interfaces/auth.interfaces';
import { Hospital } from '../models/hospital.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
	providedIn: 'root'
})
export class BusquedasService {

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
	buscar(tipo:'usuarios'|'medicos'| 'hospitales',termino:string) {
		return this.http.get<any>(`${environment.base_url}/busqueda/coleccion/${tipo}/${termino}`,this.getHeaders).pipe(
			map(
				response =>{
					switch (tipo) {
						case 'usuarios':
							return this.mapUsers(response);
							case 'hospitales':
								return this.mapHospitals(response);
						default:
							return [];
					}
				} )
				);
	}
	private mapUsers(res:BuscarResponse){
		return res.Resultados.map((element)=>new Usuario(element.nombre,element.email,null,element.img,element.google,element.role,element.id))
	}
	private mapHospitals(res){
		return res.Resultados.map((element)=>new Hospital(element.id,element.nombre,element.img,element.usuario));
	}
}
