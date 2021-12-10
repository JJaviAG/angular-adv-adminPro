import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-modal-imagen',
	templateUrl: './modal-imagen.component.html',
	styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {
	constructor(public modalImagenService: ModalImagenService,private uploadService:FileUploadService) { }
	public imagenSubir: File;
	public imgTemp: any = null;
	ngOnInit(): void {
	}
	cerrarModal() {
		this.imgTemp = null
		this.modalImagenService.cerrarModal();
	}
	public cambiarImagen(file: File) {
		console.log(file);
		this.imagenSubir = file;
		if (!file) {
			return this.imgTemp = null;
		}
		const reader = new FileReader();
		const url64 = reader.readAsDataURL(file);
		reader.onloadend = () => {
			console.log(reader.result);
			this.imgTemp = reader.result;
		}
	}
	public actualizarImagen(){
		const id=this.modalImagenService.id;
		const tipo=this.modalImagenService.tipo;
		this.uploadService.actualizarFoto(this.imagenSubir,tipo,id).subscribe((resp:any)=>{
			console.log(resp.nombreArchivo);
			this.modalImagenService.nuevaImagen.emit(resp.nombreArchivo);
			Swal.fire("Success","Cambios actualizados","success");
			this.cerrarModal();
			
		},(err)=>{
			Swal.fire("Error","Error al cambiar la imagen","error");

		})
	}

}
