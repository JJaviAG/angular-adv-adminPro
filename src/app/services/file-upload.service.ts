import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class FileUploadService {

	constructor(private http: HttpClient) { }
	// COMO SE HARIA EN JAVASCRIPT
	// async actualizarFoto(archivo: File, tipo: 'usuarios' | 'medicos' | 'hospitales', id: string) {
	// 	try {
	// 		const url = `${environment.base_url}/upload/${tipo}/${id}`;
	// 		const formData = new FormData();
	// 		formData.append('img', archivo);

	// 		const resp = await fetch(url, {
	// 			method: 'PUT',
	// 			headers: {
	// 				'x-token': localStorage.getItem('token') || ''
	// 			},
	// 			body: formData,
	// 		});
	// 		console.log("respuesta fetch upload", resp);
	
	// 		return resp.json();
	// 	} catch (error) {
	// 		console.log(error);

	// 		return false;
	// 	}
	// }
	actualizarFoto(archivo: File, tipo: 'usuarios' | 'medicos' | 'hospitales', id: string) {
		const url = `${environment.base_url}/upload/${tipo}/${id}`;
		const formData = new FormData();
		formData.append('img', archivo)

		return this.http.put(url, formData, {
			headers: {
				'x-token': localStorage.getItem('token') || ''
			}
		})

	}
}

