import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginRequest } from 'src/app/interfaces/auth.interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
declare const gapi: any;
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	public auth2: any;
	public loginForm: FormGroup = this.fb.group({
		email: [localStorage.getItem("email") || '', [Validators.required, Validators.email]],
		password: ['', Validators.required],
		remember: [false],
	});
	constructor(private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService, private ngZone: NgZone) { }

	ngOnInit(): void {
		this.renderButton();
	}
	public login() {
		let req: loginRequest = this.loginForm.value;
		this.usuarioService.login(req).subscribe((response) => {
			console.log(response);
			if (req.remember) {
				localStorage.setItem("email", req.email);
			} else {
				localStorage.removeItem("email");
			}

			this.router.navigateByUrl('/');
		}, (err) => {

			Swal.fire("Error", err.error.message, "error")
		})
		this.router.navigateByUrl("/");
	}

	public renderButton() {
		gapi.signin2.render('my-signin2', {
			'scope': 'profile email',
			'width': 240,
			'height': 50,
			'longtitle': true,
			'theme': 'dark',
		});
		this.startApp();
	}
	async startApp() {
		await this.usuarioService.googleInit();
		this.auth2=this.usuarioService.auth2;
		this.attachSignin(document.getElementById('my-signin2'));
		
	};
	public attachSignin(element) {
		this.auth2.attachClickHandler(element, {},
			(googleUser) => {
				const idTokenGoogle = googleUser.getAuthResponse().id_token;
				console.log(idTokenGoogle);
				this.usuarioService.loginGoogle(idTokenGoogle).subscribe(() => {
					this.ngZone.run(() => {
						this.router.navigateByUrl('/');
					})
				});

			}, (error) => {
				alert(JSON.stringify(error, undefined, 2));
			});
	}
}
