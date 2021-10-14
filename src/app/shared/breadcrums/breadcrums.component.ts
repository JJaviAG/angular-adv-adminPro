import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: [
  ]
})
export class BreadcrumsComponent implements OnInit,OnDestroy {
  public titulo:string="";
  public tituloSubs$!:Subscription;

  constructor(private router:Router) { 
    this.tituloSubs$=this.getRouteParams().subscribe(
      ({titulo})=>{//extaer la propiedad titulo del objeto que me llega {titulo} podria ser tambien data y usar data.titulo
        this.titulo=titulo;
      }
    );
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  public getRouteParams(){
    return this.router.events.pipe(
      filter((event):event is ActivationEnd=>event instanceof ActivationEnd),
      filter((event:ActivationEnd)=>event.snapshot.firstChild===null),
      map((event:ActivationEnd) => event.snapshot.data),
    )
  }

  ngOnInit(): void {
  }

}

