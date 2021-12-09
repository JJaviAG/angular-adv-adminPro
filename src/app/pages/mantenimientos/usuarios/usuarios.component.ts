import { Component, OnInit } from '@angular/core';
import { BuscarResponse, ObtenerUsuariosResponse } from 'src/app/interfaces/auth.interfaces';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
	public usuarios: Usuario[] = [];
	public usuariosTemp: Usuario[] = [];
	public total: number = 0;
	public desde = 0;
	public loading:boolean=true;
	constructor(private usuarioService: UsuarioService,private busquedaService: BusquedasService) { }

	ngOnInit(): void {
		this.callGetUsers();
	}
	public callGetUsers() {
		this.loading=true;
		this.usuarioService.GetUsuarios(this.desde).subscribe((response: ObtenerUsuariosResponse) => {
			this.total = response.total;
			this.usuarios = response.Resultados;
			this.usuariosTemp=response.Resultados;
			console.log("respuesta", this.usuarios);
			this.loading=false;
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
	public buscar(cadena:string){
		if (cadena.length ==0) {
			this.usuarios=this.usuariosTemp;
		}
		if(cadena.length<3){
			return;
		}
		this.busquedaService.buscar("usuarios",cadena).subscribe((response:Usuario[])=>{
			console.log(response);
			this.usuarios=response;
		})
		
		
	}
}
