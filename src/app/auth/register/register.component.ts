import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FORM_ERRORS } from 'src/app/app-const';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	public formSubmitted: boolean = false;
	public registerForm: FormGroup = this.fb.group({
		nombre: ['', [Validators.minLength(3), Validators.required]],
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required],
		rewritePass: ['', Validators.required],
		terminos: [false, Validators.required]
	});
	//prueba de yo que se
	constructor(private fb: FormBuilder) { }
	public formErrors: string[] = [];
	ngOnInit(): void {
		return;
	}
	public crearUsuario() {
		this.formSubmitted = true;
	}
	public validarCampos(): string[] {
		this.formErrors = [];
		const validaCampo = (formControlname: string, errorConnector: string) => {
			if (this.registerForm.get(formControlname).invalid && this.formSubmitted) {
				this.formErrors.push(FORM_ERRORS[errorConnector]);
			}
			if ((formControlname == "password" || formControlname == "rewritePass") && this.formSubmitted) {
				let pass1 = this.registerForm.get("password").value;
				let pass2 = this.registerForm.get("rewritePass").value;
				if(pass1 !== pass2 && this.formSubmitted){
					this.formErrors.push(FORM_ERRORS.PASS_NO_COINCIDEN)
				}
			}
		}
		if (!this.registerForm.get("terminos").value && this.formSubmitted) {
			this.formErrors.push(FORM_ERRORS.TERMINOS);
		}
		validaCampo("nombre", "NOMBRE");
		validaCampo("email", "EMAIL");
		validaCampo("password", "PASSWORD");
		validaCampo("rewritePass", "REWRITE_PASS");

		return this.formErrors;
	}
	// public validaPass(){
	// 	let pass1=this.registerForm.get("password").value;
	// 	let pass2=this.registerForm.get("rewritePass").value;

	// 	return (pass1!==pass2 && this.formSubmitted?true:false);
	// }

}
