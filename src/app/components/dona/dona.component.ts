import { Component, Input, OnInit } from '@angular/core';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent implements OnInit {
  @Input('cabeceras') public doughnutChartLabels: Label[] = ['label', 'label', 'label'];
  @Input('dataValues') public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];
  @Input() title: string = "";
  colors: Color[] = [{
    backgroundColor: ['lightblue', 'red', 'purple'],
  }];
  constructor() { }

  ngOnInit(): void {
  }

}
