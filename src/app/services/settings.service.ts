import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  
  private  linkTheme=document.querySelector('#theme');


  constructor() { 

    let theme=localStorage.getItem("tema") || "./assets/css/colors/default-dark.css";
    this.linkTheme?.setAttribute("href",theme);

  }
  public changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute("href", url);
    localStorage.setItem("tema", url);
    this.checkCurrentTheme();
  }
  checkCurrentTheme(): void {
    const links=document.querySelectorAll('.selector');
    links?.forEach((element:Element)=>{
      element.classList.remove("working");
      const btnTheme=element.getAttribute('data-theme') || "";
      const btnThemeUrl=`./assets/css/colors/${btnTheme}.css`;
      const currentTheme= this.linkTheme?.getAttribute('href');
      if(btnThemeUrl===currentTheme){
        element.classList.add("working");
      }
    })
  }

}
