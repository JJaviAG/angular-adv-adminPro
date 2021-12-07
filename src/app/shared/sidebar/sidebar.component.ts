import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  menuItems:any[]=[];
  constructor(private sidebar:SidebarService,private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.menuItems=this.sidebar.menu;
  }
  public logout(){
    this.usuarioService.logout();
  }

}
