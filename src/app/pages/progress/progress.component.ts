import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  public progress: number = 25;
  public progress2: number = 35;

  get getProgress() {
    return `${this.progress}%`;
  }
  get getProgress2() {
    return this.progress2 + '%';
  }
  constructor() { }

  ngOnInit(): void {
  }

}
