import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

declare function ejecutarAnimacion(): any;
declare function menuMovil(): any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    ejecutarAnimacion();
  }
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
      type: 'line',
        data: {
          labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          datasets: [{
            label: "Last year's income",
            data: [150000, 100000, 300000, 475000, 90000, 689000, 720000, 150000, 100000, 300000, 475000, 90000, 689000, 720000],
            backgroundColor: [
              'rgba(105, 0, 132, .2)',
            ],
            borderColor: [
              'rgba(200, 99, 132, .7)',
            ],
            borderWidth: 2
          }
          ]
        },
        options: {
          responsive: true
        }
      });
  }
}
