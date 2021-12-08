import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActualizarUsuarioRequest } from 'src/app/interfaces/auth.interfaces';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
	selector: 'app-perfil',
	templateUrl: './perfil.component.html',
	styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
	public perfilForm: FormGroup;
	public usuario: Usuario;
	constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
		//esta var apunta al mismo espacio de memoria que el del servicio por eso se actualiza si le asigno otro objeto perderia la actualizacion por que apuntaria a otro espacio de memoria
		this.usuario = this.usuarioService.usuario;
	}

	ngOnInit(): void {
		this.perfilForm = this.fb.group({
			nombre: [this.usuario.nombre, [Validators.required]],
			email: [this.usuario.email, [Validators.required, Validators.email]],
		})
	}
	public actualizarPerfil() {
		let req: ActualizarUsuarioRequest = this.perfilForm.value;
		this.usuarioService.actualizarUsuario(req).subscribe((resp: any) => {
			console.log("respues act", resp);
			this.usuario.nombre=resp.usuario.nombre;
			this.usuario.email=resp.usuario.email;
		})
	}

}
