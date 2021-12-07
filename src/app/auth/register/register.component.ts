import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FORM_ERRORS } from 'src/app/app-const';
import { CrearRequest } from 'src/app/interfaces/auth.interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'
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
	},{
		validators:this.passwordIguales("password","rewritePass")
	});
	constructor(private fb: FormBuilder,private usuarioService:UsuarioService,private router:Router) { }
	public formErrors: string[] = [];
	ngOnInit(): void {
		return;
	}
	public crearUsuario() {

		this.formSubmitted = true;
		console.log(this.registerForm);
		
		if(!this.formErrors.length && this.registerForm.invalid){
			return;
		}
		let req:CrearRequest=this.registerForm.value;
		this.usuarioService.crearUsuario(req).subscribe(response=>{
			this.router.navigateByUrl('/');
			
		},(err)=>{
			Swal.fire("Error",err.error.message,"error");
		});
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
		this.formErrors=this.formErrors.reduce((acc,item)=>{
			if(!acc.includes(item)){
				acc.push(item);
			}
			return acc;
		},[])
		return this.formErrors;
	}
	public passwordIguales(formControlnamePass:string,formControlnameRewrite:string){
		return (formGroup:FormGroup)=>{
			const pass1=formGroup.get(formControlnamePass);
			const pass2=formGroup.get(formControlnameRewrite);
			if(pass1.value===pass2.value){
				return pass2.setErrors(null);
			}else{
				return pass2.setErrors({noCoinciden:true});
			}
		}
	}

}
