import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-medico',
	templateUrl: './medico.component.html',
	styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
	public medicoForm: FormGroup;
	public hospitales: Hospital[] = [];
	public hospitalSeleccionado: Hospital;
	public medicoSeleccionado: Medico;
	constructor(private fb: FormBuilder, private hospitalService: HospitalService, private medicoService: MedicoService, private router: Router, private activatedRouter: ActivatedRoute) { }

	ngOnInit(): void {
		this.getHospitales();
		this.activatedRouter.params.subscribe(({ id }) => {
			this.getMedico(id);

		})
		this.medicoForm = this.fb.group({
			nombre: ["", [Validators.required]],
			hospital: ["", [Validators.required]]
		})
		this.medicoForm.get('hospital').valueChanges.subscribe(idHospital => {
			this.hospitalSeleccionado = this.hospitales.find(element => element.id == idHospital);
		})
	}
	public guardarMedico() {
		if (this.medicoSeleccionado) {
			const data = { ...this.medicoForm.value, _id: this.medicoSeleccionado.id };
			this.medicoService.actualizarMedico(data).subscribe(resp => {
				Swal.fire("success", "Actualizado con éxito", 'success');
			})
			return;
		}
		this.medicoService.crearMedico(this.medicoForm.value).subscribe((resp: any) => {
			Swal.fire("success", "Creado con éxito", 'success');
			this.router.navigateByUrl("/dashboard/medico/" + resp.message.id);
		})
	}
	public getHospitales() {
		this.hospitalService.GetHospitales().subscribe((resp: Hospital[]) => {
			this.hospitales = resp;
		})
	}
	public getMedico(id: string) {
		if (id === 'nuevo') {
			return;
		}
		this.medicoService.getMedicoById(id).pipe(delay(100)).subscribe((medico) => {
			console.log(medico);
			if (!medico) {
				this.router.navigateByUrl("/dashboard/medicos");
			}else{

				this.medicoSeleccionado = medico;
				const { nombre, hospital: { _id } } = medico;
				this.medicoForm.setValue({ nombre, hospital: _id })
			}
		})
	}

}
