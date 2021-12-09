import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ActualizarUsuarioRequest, CrearRequest, loginRequest, ObtenerUsuariosResponse } from '../interfaces/auth.interfaces';
import { Usuario } from '../models/usuario.model';
declare const gapi: any;
@Injectable({
	providedIn: 'root'
})
export class UsuarioService {
	public auth2: any;
	public usuario:Usuario;
	constructor(private http: HttpClient, private router: Router,private ngZone:NgZone) {
		this.googleInit();
	}
	get getToken(){
		return localStorage.getItem('token');
	}
	get getUserId(){
		return this.usuario.id;
	}
	get getHeaders(){
		return {
			headers: {
				'x-token': this.getToken,
			}
		}
	}
	validarToken(): Observable<boolean> {
		const token = this.getToken;

		return this.http.get(environment.base_url + "/login/renew", {
			headers: {
				'x-token': token
			}
		}).pipe(
			map((resp: any) => {
				const {email,google,nombre,role,img='',id}=resp.usuario;
				this.usuario=new Usuario(nombre,email,'',img,google,role,id)
				localStorage.setItem('token', resp.token);
				return true;
			}),
			catchError(error => of(false))
		);
	}

	crearUsuario(request: CrearRequest) {
		return this.http.post(environment.base_url + "/usuarios", request).pipe(tap((res: any) => {
			console.log((res));
			localStorage.setItem("token", res.token)
		}));
	}
	actualizarUsuario(request:ActualizarUsuarioRequest){
		request.role="USER_ROLE";
		return this.http.put(`${environment.base_url}/usuarios/${this.getUserId}`,request, {
			headers: {
				'x-token': this.getToken,
			}
		});
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
	GetUsuarios(inicio:number=0){
		return this.http.get<ObtenerUsuariosResponse>(environment.base_url+"/usuarios?desde="+inicio,this.getHeaders).pipe(
			map(resp=>{
				const usuarios=resp.Resultados.map(user=> new Usuario(user.nombre,user.email,null,user.img,user.google,user.role,user.id))
				console.log(resp);
				resp.Resultados=usuarios;
				return resp;
		}));
	}
}
