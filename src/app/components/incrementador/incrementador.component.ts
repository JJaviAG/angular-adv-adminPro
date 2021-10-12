import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  @Input('valor') public progress: number=0;
  @Input() public btnClass: string = "btn-primary";
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  public changeProgress(value: number) {
    if (this.progress >= 100 && value >= 0) {
      this.valorSalida.emit(100);
      return;
    }
    if (this.progress <= 0 && value <= 0) {
      this.valorSalida.emit(0);
      return;
    }
    this.progress += value;
    this.valorSalida.emit(this.progress);

  }
  constructor() { }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`
  }
  public onChange(newValue: number) {
    if (newValue > 100) {
      newValue=100;
    } else if (newValue < 0) {
      newValue=0;
    } else {
      this.valorSalida.emit(newValue);
    }
    
  }
}
