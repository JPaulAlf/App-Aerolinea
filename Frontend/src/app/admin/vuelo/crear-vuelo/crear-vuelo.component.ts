import { Component, OnInit } from '@angular/core';
import { VueloService } from '../../../services/vuelo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-vuelo',
  templateUrl: './crear-vuelo.component.html',
  styleUrls: ['./crear-vuelo.component.css'],
})
export class CrearVueloComponent implements OnInit {
  constructor(private vueloService: VueloService) {}

  //Arreglos que llenan las tablas, segun la seleccion
  aviones: any = [];
  rutas: any = [];
  horarios: any = [];

  //Plan B, si no sirven el seteo automatico
  _idAvion: any = null;
  _idRuta: any = null;
  _idHorario: any = null;

  avionSeleccionado: string = 'Airplane not selected!';
  rutaSeleccionado: string = 'Route not selected!';
  horarioSeleccionado: string = 'Schedule not selected!';

  //Serviran con seteo automatico?
  componentesForm = new FormGroup({
    _idAvion: new FormControl('', Validators.required),
    _idRuta: new FormControl('', Validators.required),
    _idHorario: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  //Boton de creacion final del VUELO
  submitForm() {}

  //Contenido de las tablas segun seleccion
  // Llaman al GET y se filtran aca con un IF
  listaAviones_Marca(marca: string) {}
  listaRutas() {}
  listaRuta_Horario(ruta: string) {}

  //Botones de seleccion de tablas
  //LLenan el campo por si decide eso el usuario, enviar esas
  //variables a la DB
  selectAvion(id: string) {
    this._idAvion = id;
  }
  selectRuta(id: string) {
    this._idRuta = id;
  }
  selectHorario(id: string) {
    this._idHorario = id;
  }
}
