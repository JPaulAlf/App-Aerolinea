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
    var dataDB=[150, 150, 300, 475, 700, 689, 720, 150, 900, 300, 475, 340];

    new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."],
        datasets: [{
          label: "Last year's income",
          data: dataDB,
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
        responsive: true,
        maintainAspectRatio: false,
      }
    });

 
  }
}
