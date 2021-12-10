import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  private _ocultarModal: boolean = true;
  public tipo: 'usuarios' | 'medicos' | 'hospitales';
  public id: string;
  public img: string;
  public nuevaImagen:EventEmitter<string>=new EventEmitter<string>();
  get getOcultarModal() {
    return this._ocultarModal;
  }
  constructor() { }
  abrirModal(tipo: 'usuarios' | 'medicos' | 'hospitales', id: string, img?: string) {
    this._ocultarModal = false;
    this.tipo=tipo;
    this.img=img;
    this.id=id;
    if(img?.includes('https')){
      this.img=img;
    }else {
      this.img=`${environment.base_url}/upload/${tipo}/${img}`;
    }
  }
  cerrarModal() {
    this._ocultarModal = true;
  }
}
