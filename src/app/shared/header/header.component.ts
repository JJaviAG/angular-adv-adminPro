import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styles: [
	]
})
export class HeaderComponent implements OnInit {
	public usuario:Usuario;
	constructor(private usuarioService: UsuarioService) {
		
	}

	ngOnInit(): void {
		this.usuario=this.usuarioService.usuario;
	}
	public logout() {
		this.usuarioService.logout();
	}

}
