import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

declare function ejecutarAnimacion(): any;

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
            'rgba(9, 197, 171, .2)',
          ],
          borderColor: [
            'rgba(33, 37, 41, .7)',
          ],
          borderWidth: 2
        }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Valores expresados en miles de dólares',
                fontColor: '#C7C7CC',
                fontSize: 11
              }
            }
          ]
        }
      }
    });

 
  }
}
