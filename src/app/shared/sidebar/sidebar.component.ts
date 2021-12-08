import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  public menuItems:any[]=[];
  public usuario:Usuario;
  constructor(private sidebar:SidebarService,private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.menuItems=this.sidebar.menu;
    this.usuario=this.usuarioService.usuario;
  }
  public logout(){
    this.usuarioService.logout();
  }

}
