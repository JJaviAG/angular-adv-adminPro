import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-medicos',
	templateUrl: './medicos.component.html',
	styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
	public medicos: Medico[] = [];
	public medicosTemp:Medico[]=[];
	public loading: boolean = true;
	constructor(private medicoService: MedicoService, private modalImagenService: ModalImagenService,private busquedaService:BusquedasService) { }

	ngOnInit(): void {
		this.callGetMedicos();
		this.modalImagenService.nuevaImagen.pipe(delay(500)).subscribe(img => {
			this.callGetMedicos();
		})
	}
	public callGetMedicos() {
		this.loading = true;
		this.medicoService.GetMedicos().subscribe(resp => {
			console.log(resp);
			this.medicos = resp;
			this.medicosTemp=resp
			this.loading = false;
		})
	}
	public abrirModal(hospital: Medico) {
		console.log(hospital);
		this.modalImagenService.abrirModal('medicos', hospital.id, hospital.img);
	}
	public actualizarMedico(medico: Medico) {
		this.medicoService.actualizarMedico(medico).subscribe(resp => {
			this.callGetMedicos();
			console.log(resp);
		})
	}
	public buscar(cadena: string) {
		if (cadena.length == 0) {
			this.medicos = this.medicosTemp;
		}
		if (cadena.length < 3) {
			return;
		}
		this.busquedaService.buscar("hospitales", cadena).subscribe((response: any) => {
			console.log(response);
			this.medicos = response;
		})
	}
	public eliminarMedico(medico:Medico){
		this.medicoService.BorrarMedico(medico.id).subscribe(resp=>{
			Swal.fire("Success","Borrado con éxito","success");
			this.callGetMedicos();
		})
	}

}
