import { Component, OnInit } from '@angular/core';
import { VueloService } from '../../../services/vuelo.service';

@Component({
  selector: 'app-crear-vuelo',
  templateUrl: './crear-vuelo.component.html',
  styleUrls: ['./crear-vuelo.component.css']
})
export class CrearVueloComponent implements OnInit {

  constructor() { }


  listaAviones_Marca (marca:any){

  }

  ngOnInit(): void {
  }

}
