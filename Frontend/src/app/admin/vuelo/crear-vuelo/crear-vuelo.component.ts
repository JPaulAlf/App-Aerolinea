import { Injectable, Component, OnInit } from '@angular/core';
import { VueloService } from '../../../services/vuelo.service';
import { RutaService } from 'src/app/services/ruta.service';
import { AvionService } from 'src/app/services/avion.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-crear-vuelo',
  templateUrl: './crear-vuelo.component.html',
  styleUrls: ['./crear-vuelo.component.css'],
})
export class CrearVueloComponent implements OnInit {
  constructor(
    private vueloService: VueloService,
    private rutaService: RutaService,
    private avionService: AvionService
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
  submitForm() {
    if (
      this.avionSeleccionado != 'Airplane not selected!' &&
      this.rutaSeleccionado != 'Route not selected!' &&
      this.horarioSeleccionado != 'Schedule not selected!'
    ) {
      //Aca va el metodo de guardar en la base de datos
    } else {
      alert('Please check if you selected all the information needed!');
    }
  }

  //Contenido de las tablas segun seleccion
  // Llaman al GET y se filtran aca con un IF
  listaAviones_Marca(marca: string) {
    var avionMarca: any = [];
    this.avionService.get().subscribe((avion) => {
      for (const item of avion) {
        if (item.marca == marca) {
          avionMarca.push(item);
        }
      }
      this.aviones = avionMarca;
    });
  }
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
    this.avionService.getById(id).subscribe((avion) => {
      this.avionSeleccionado = avion.marca + ' ' + avion.modelo;
    });
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

  ////////////////////// SELECT ITEM //////////////////////////////
  mySelect = '1';
  selectedValue: any;
  MarcasAviones = [
    {
      id: 1,
      name: 'Airbus',
    },
    {
      id: 2,
      name: 'Boeing',
    },
  ];
  getDropDownText(id: any, object: any) {
    const selObj = _.filter(object, function (o) {
      return _.includes(id, o.id);
    });
    return selObj;
  }
  selectChange(event:any) {
    this.mySelect=event.target.value;
    this.selectedValue = this.getDropDownText(this.mySelect, this.MarcasAviones)[0].name;
    this.listaAviones_Marca(this.selectedValue);
  }



}
