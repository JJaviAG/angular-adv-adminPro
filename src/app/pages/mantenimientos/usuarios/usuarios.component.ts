import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { ActualizarUsuarioRequest, BuscarResponse, ObtenerUsuariosResponse } from 'src/app/interfaces/auth.interfaces';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit,OnDestroy {
	public usuarios: Usuario[] = [];
	public usuariosTemp: Usuario[] = [];
	public total: number = 0;
	public desde = 0;
	public loading: boolean = true;
	constructor(private usuarioService: UsuarioService, private busquedaService: BusquedasService,private modalImagenService:ModalImagenService) { }
	ngOnDestroy(): void {
		this.modalImagenService.nuevaImagen.unsubscribe();
	}

	ngOnInit(): void {
		this.callGetUsers();
		this.modalImagenService.nuevaImagen.pipe(delay(500) ).subscribe(img=>{
			this.callGetUsers()
		})
	}
	public callGetUsers() {
		this.loading = true;
		this.usuarioService.GetUsuarios(this.desde).subscribe((response: ObtenerUsuariosResponse) => {
			this.total = response.total;
			this.usuarios = response.Resultados;
			this.usuariosTemp = response.Resultados;
			console.log("respuesta", this.usuarios);
			this.loading = false;
		});

	}
	public cambiarPagina(valor: number) {
		this.desde += valor;
		if (this.desde < 0) {
			this.desde = 0;
		} else if (this.desde > this.total) {
			this.desde -= valor;
		}
		this.callGetUsers();

	}
	public buscar(cadena: string) {
		if (cadena.length == 0) {
			this.usuarios = this.usuariosTemp;
		}
		if (cadena.length < 3) {
			return;
		}
		this.busquedaService.buscar("usuarios", cadena).subscribe((response: Usuario[]) => {
			console.log(response);
			this.usuarios = response;
		})
	}
	public eliminarUsuario(usuario: Usuario) {
		if(usuario.id==this.usuarioService.usuario.id){
			Swal.fire("Atención","No puede borrarse a si mismo","warning");
			return; 
		}
		Swal.fire({
			title: '¿Estas Seguro?',
			text: "Borrarás el usuarios",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí'
		}).then((result) => {
			if (result.isConfirmed) {
				this.usuarioService.deleteUser(usuario).subscribe(resp=>{
					Swal.fire(
						'Usuario Borrado',
						`${usuario.nombre} eliminado correctamente`,
					)
					//setTimeout(() =>,1000)
					this.callGetUsers()
					console.log(resp);
				})
			}
		})
		console.log(usuario);

	}
	public cambiarRole(usuario:Usuario){
		
		this.usuarioService.updateUser(usuario).subscribe(resp=>{
			console.log(resp);
			
		})
		console.log(usuario);
		
	}
	public abrirModal(usuario:Usuario){
		console.log(usuario);
		
		this.modalImagenService.abrirModal('usuarios',usuario.id,usuario.img);
	}
}
