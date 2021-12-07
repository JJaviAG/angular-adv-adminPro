import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CrearRequest, loginRequest } from '../interfaces/auth.interfaces';
declare const gapi: any;
@Injectable({
	providedIn: 'root'
})
export class UsuarioService {
	public auth2: any;
	constructor(private http: HttpClient, private router: Router,private ngZone:NgZone) {
		this.googleInit();
	}

	validarToken(): Observable<boolean> {
		const token = localStorage.getItem('token') || '';

		return this.http.get(environment.base_url + "/login/renew", {
			headers: {
				'x-token': token
			}
		}).pipe(
			tap((resp: any) => {
				localStorage.setItem('token', resp.token);
			}),
			map(resp => true),
			catchError(error => of(false))
		);
	}

	crearUsuario(request: CrearRequest) {
		return this.http.post(environment.base_url + "/usuarios", request).pipe(tap((res: any) => {
			console.log((res));
			localStorage.setItem("token", res.token)
		}));
	}
	login(request: loginRequest) {
		return this.http.post(environment.base_url + "/login", request).pipe(tap((res: any) => {
			console.log((res));
			localStorage.setItem("token", res.token)
		}));
	}
	loginGoogle(token) {
		return this.http.post(environment.base_url + "/login/google", { token }).pipe(tap((res: any) => {
			console.log((res));
			localStorage.setItem("token", res.token)
		}));
	}
	logout() {
		localStorage.removeItem('token');
		
		let auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut().then( ()=> {
			this.ngZone.run(()=>{
				this.router.navigateByUrl('/login');
			})
		});
	}
	googleInit() {
		return new Promise<void>((resolve,reject)=>{
			gapi.load('auth2', () => {
				this.auth2 = gapi.auth2.init({
					client_id: '38562443443-d59pkke8p7r8b30abues2eut8jfbkn56.apps.googleusercontent.com',
					cookiepolicy: 'single_host_origin',
				});
				resolve();
			});
		})
	}
}
