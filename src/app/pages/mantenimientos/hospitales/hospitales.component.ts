import { Component, OnInit } from '@angular/core';
import { ObtenerHospitalesResponse } from 'src/app/interfaces/hospitales.interfaces';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {
  public hospitales:Hospital[]=[];
  public loading:boolean=true;
  constructor(private hospitalService:HospitalService) { }
  
  ngOnInit(): void {
    this.callGetHospitales();
  }
  public callGetHospitales(){
    this.loading=true;
    this.hospitalService.GetHospitales().subscribe((resp:Hospital[])=>{
      this.hospitales=resp;
      console.log(resp);
      this.loading=false;
    })
  }
}
