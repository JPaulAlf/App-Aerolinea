import { Component, OnInit } from '@angular/core';
declare function ejecutarAnimacion():any;
declare function menuMovil():any;
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
  
}
