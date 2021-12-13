import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios' | 'medicos' | 'hospitales'): string {
    if (!img) {
      return environment.base_url + "/upload/"+tipo+"/not-found.png";
    } else if (img.includes('https')) {
      return img;
    } else if (img) {
      return environment.base_url + "/upload/"+tipo+"/" + img;
    } else {
      return environment.base_url + "/upload/"+tipo+"/not-found.png";
    }
  }

}
