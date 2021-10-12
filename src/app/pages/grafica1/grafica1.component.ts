import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  public title:string="Ventas";
  public title2:string="Compras";
  public labelsVentas: Label[] = ['Ventas Externas', 'Ventas Tienda', 'Ventas Online'];
  public labelsCompras: Label[] = ['Compras Externas', 'Compras Tienda', 'Compras Online'];
  public comprasValues: MultiDataSet = [
    [500, 300, 200],
  ];
  public ventasValues: MultiDataSet = [
    [100, 950, 50],
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
