import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ObtenerHospitalesResponse } from '../interfaces/hospitales.interfaces';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http:HttpClient) { }
  get getToken(){
		return localStorage.getItem('token');
	}
    get getHeaders(){
		return {
			headers: {
				'x-token': this.getToken,
			}
		}
	}
  GetHospitales(){
		return this.http.get<ObtenerHospitalesResponse>(environment.base_url+"/hospitales",this.getHeaders).pipe(
      map(
        (response:ObtenerHospitalesResponse)=>{
          return response.message;
    })
    );
	}
}
