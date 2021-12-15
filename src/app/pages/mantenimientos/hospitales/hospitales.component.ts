import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-hospitales',
	templateUrl: './hospitales.component.html',
	styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {
	public hospitales: Hospital[] = [];
	public loading: boolean = true;
	public hospitalesTemp: Hospital[] = [];
	constructor(private hospitalService: HospitalService, private modalImagenService: ModalImagenService, private busquedaService: BusquedasService) { }

	ngOnInit(): void {
		this.callGetHospitales();
		this.modalImagenService.nuevaImagen.pipe(delay(500)).subscribe(img => {
			this.callGetHospitales()
		})
	}
	public callGetHospitales() {
		this.loading = true;
		this.hospitalService.GetHospitales().subscribe((resp: Hospital[]) => {
			this.hospitales = resp;
			this.hospitalesTemp=resp;
			console.log(resp);
			this.loading = false;
		})
	}
	public guardarCambios(hospital: Hospital) {

		this.hospitalService.actualizarHospital(hospital.id, hospital.nombre).subscribe((response: any) => {
			console.log(response);
			Swal.fire("success", "Actualizado con éxito", "success")
		})
	}
	public eliminarHospital(hospital: Hospital) {

		this.hospitalService.BorrarHospital(hospital.id).subscribe((response: any) => {
			console.log(response);
			this.callGetHospitales();
			Swal.fire("success", "Borrado con éxito " + hospital.nombre, "success")
		})
	}
	public async openCrearHospitalForm() {
		const { value: nombre = '' } = await Swal.fire<string>({
			text: "Nombre del nuevo hospital",
			input: 'text',
			inputLabel: 'Nombre',
			inputPlaceholder: 'Nombre del hospital',
			showCancelButton: true
		})

		if (nombre.trim().length > 0) {
			this.hospitalService.crearHospital(nombre).subscribe(resp => {
				this.callGetHospitales();
				console.log(resp);
				Swal.fire("success", "Creado con éxito :" + nombre, "success")
			})
		}
	}
	public abrirModal(hospital: Hospital) {
		console.log(hospital);

		this.modalImagenService.abrirModal('hospitales', hospital.id, hospital.img);

	}
	public buscar(cadena: string) {
		if (cadena.length == 0) {
			this.hospitales = this.hospitalesTemp;
		}
		if (cadena.length < 3) {
			return;
		}
		this.busquedaService.buscar("hospitales", cadena).subscribe((response: any) => {
			console.log(response);
			this.hospitales = response;
		})
	}
}