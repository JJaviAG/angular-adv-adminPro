import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // const promesa = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve("hola mundo");
    //   } else {
    //     reject("error en la promesa");
    //   }
    // });

    // promesa.then((response) => {
    //   console.log(response);

    // }).catch((err)=>{
    //   console.log(err+ " error inesperado");

    // })
    // console.log("fin init");
    this.getUsuarios().then((res)=>{
      console.log(res);
      
    });
  }
  getUsuarios() {
    const promesa = new Promise(resolve => {
      fetch('https://reqres.in/api/users?page=2')
        .then((response) => response.json()).then(body =>resolve(body.data));

    });
    return promesa;
  }
}
