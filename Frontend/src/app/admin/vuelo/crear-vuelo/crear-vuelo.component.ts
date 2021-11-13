import { Component, OnInit } from '@angular/core';
import { VueloService } from '../../../services/vuelo.service';
import { RutaService } from 'src/app/services/ruta.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-vuelo',
  templateUrl: './crear-vuelo.component.html',
  styleUrls: ['./crear-vuelo.component.css'],
})
export class CrearVueloComponent implements OnInit {
  constructor(
    private vueloService: VueloService,
    private rutaService: RutaService
  ) {}

  //Arreglos que llenan las tablas, segun la seleccion
  //del usuario
  aviones: any = [];
  rutas: any = [];
  horarios: any = [];

  //Campos que se van ingresar en la BD
  _idAvion: any = null;
  _idRuta: any = null;
  _idHorario: any = null;

  //Contenido de etiquetas, para hacerlas que cambien dinamicamente
  //segun la seleccion del usuario
  avionSeleccionado: string = 'Airplane not selected!';
  rutaSeleccionado: string = 'Route not selected!';
  horarioSeleccionado: string = 'Schedule not selected!';

  ngOnInit(): void {
    this.listaRutas();
  }

  //Boton de creacion final del VUELO
  submitForm() {}

  //Contenido de las tablas segun seleccion
  // Llaman al GET y se filtran aca con un IF
  listaAviones_Marca(marca: string) {}
  listaRutas() {
    this.rutaService.get().subscribe((ruta) => {
      this.rutas = ruta;
    });
  }
  listaRuta_Horario(rutaID: any) {
    this.rutaService.getById(rutaID).subscribe((ruta) => {
      for (const item of ruta.horarios) {
        var date = new Date(item.fecha);
        item.fecha = date.toLocaleDateString();
      }
      this.horarios = ruta.horarios;
    });
  }

  //Botones de seleccion de tablas
  //LLenan el campo por si decide eso el usuario, enviar esas
  //variables a la DB
  selectAvion(id: string) {
    this._idAvion = id;
  }

  selectRuta(id: string) {
    this._idRuta = id;
    this.rutaService.getById(id).subscribe((ruta) => {
      this.rutaSeleccionado =
        ruta.inicio.nombre + ' >>> ' + ruta.destino.nombre;
    });
    this.listaRuta_Horario(id);
  }

  selectHorario(id: string) {
    this._idHorario = id;
    this.rutaService.getById(this._idRuta).subscribe((ruta) => {
      for (const item of ruta.horarios) {
        var date = new Date(item.fecha);
        item.fecha = date.toLocaleDateString();
      }
      for (const item of ruta.horarios) {
        if (item._id == id) {
          this.horarioSeleccionado = item.fecha + ' at ' + item.hora_sal;
        }
      }
    });
  }
}
