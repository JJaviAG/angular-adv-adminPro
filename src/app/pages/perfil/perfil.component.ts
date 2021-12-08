import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActualizarUsuarioRequest } from 'src/app/interfaces/auth.interfaces';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-perfil',
	templateUrl: './perfil.component.html',
	styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
	public perfilForm: FormGroup;
	public usuario: Usuario;
	public imagenSubir:File;
	public imgTemp:any;
	constructor(private fb: FormBuilder, private usuarioService: UsuarioService,private uploadService:FileUploadService) {
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
			Swal.fire("Correcto","Cambios actualizados","success");

		},(err)=>{
			Swal.fire("Error",err.error.msg,"error")
		})
	}
	public cambiarImagen(file:File){
		console.log(file);
		this.imagenSubir=file;
		if (!file) {
			return this.imgTemp=null;
		}
		const reader=new FileReader();
		const url64=reader.readAsDataURL(file);
		reader.onloadend=()=>{
			console.log(reader.result);
			this.imgTemp=reader.result;
		}
	}
	public actualizarImagen(){
		this.uploadService.actualizarFoto(this.imagenSubir,'usuarios',this.usuario.id).subscribe((resp:any)=>{
			console.log(resp.nombreArchivo);
			this.usuario.img=resp.nombreArchivo;
			Swal.fire("Success","Cambios actualizados","success");
		},(err)=>{
			Swal.fire("Error","Cambios actualizados","error");

		})
	}

}
