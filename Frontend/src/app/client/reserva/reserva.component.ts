import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AeropuertoService } from 'src/app/services/aeropuerto.service';
import { AvionService } from 'src/app/services/avion.service';
import { VueloService } from 'src/app/services/vuelo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RutaService } from 'src/app/services/ruta.service';

declare function ejecutarAnimacion(): any;
declare function counterActivate(): any;

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
})
export class ReservaComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private _aeropuertoService: AeropuertoService,
    private _rutaService: RutaService,
    private vueloService: VueloService,
    private avionService: AvionService,
    private usuarioService: UsuarioService
  ) {}

  _aeropuertoInicio: any = [];
  _aeropuertoDestino: any = [];

  _vuelosBusqueda_Con_Filtro: any = [];
  p: any = 1;

  selectFlight: string = 'False';
  rutaSeleccionado: string = 'Route not selected!';
  horarioSeleccionado: string = 'Schedule not selected!';
  idVueloSeleccionado: string = 'Flight not selected!';

  itemsForm = new FormGroup({
    inicio: new FormControl('', Validators.required),
    destino: new FormControl('', Validators.required),
    fechaInicio: new FormControl('', Validators.required),
    fechaFinal: new FormControl('', Validators.required),
    selectRoundTrip: new FormControl(''),
    selectOneWay: new FormControl(''),
    selectSearchFlight: new FormControl(''),
    //selectFlight: new FormControl(''),
  });

  ngOnInit(): void {
    ejecutarAnimacion();
    this._aeropuertoService.get().subscribe((data) => {
      this._aeropuertoInicio = data;
      this._aeropuertoDestino = data;
    });
  }

  seleccion_RoundTrip() {
    this.itemsForm.get('selectRoundTrip')?.setValue(true);
    this.itemsForm.get('selectOneWay')?.setValue(true);
  }
  seleccion_OneWay() {
    this.itemsForm.get('selectRoundTrip')?.setValue(false);
    this.itemsForm.get('selectOneWay')?.setValue(true);
  }

  buscarVuelo() {
    this.itemsForm.get('selectSearchFlight')?.setValue(true);
    //Busca el vuelo con el filtro de las variables seleccionadas
    this.vuelosConFiltro();
  }

  SeleccionarVuelo(_id: any) {
    //this.itemsForm.get('selectFlight')?.setValue(true);
    this.selectFlight = 'true';
    this.idVueloSeleccionado = _id;
    this.vueloService.getById(this.idVueloSeleccionado).subscribe((data) => {
      //Ruta seleccionada
      this.rutaSeleccionado =
        data.ruta_id.inicio.nombre + ' >>> ' + data.ruta_id.destino.nombre;

      //Horario de la ruta seleccionada
      var date = new Date(data.horario_id.fecha);
      data.horario_id.fecha = date.toLocaleDateString();
      this.horarioSeleccionado =
        data.horario_id.fecha +
        ' ' +
        data.horario_id.hora_sal +
        ' >>> ' +
        data.hora_lleg;
    });

    //Logica de compra de vuelo
    //
    //
    this.listarAsientos_Vuelo();
  }

  vuelosConFiltro() {
    // //Tienen el ID del aeropuerto seleccionado
    // var inicio: any = this.itemsForm.get('inicio');
    // var destino: any = this.itemsForm.get('destino');

    // //De tipo Date
    // var fechaInicio: any = this.itemsForm.get('fechaInicio');
    // var fechaFinal: any = this.itemsForm.get('fechaFinal');

    // //Tienen un valor TRUE o FALSE, segun fue la seleccion del usuario
    // var selectRoundTrip: any = this.itemsForm.get('selectRoundTrip');
    // var selectOneWay: any = this.itemsForm.get('selectOneWay');

    //Metodo temporal, que lista TODOS los vuelos ACTIVOS
    this.vueloService.get().subscribe((vuelo) => {
      for (const item of vuelo) {
        var date = new Date(item.horario_id.fecha);
        //Se da formato a la fecha y se le concatena la hora de salida, para llamar solo 1 campo en el HTML
        item.horario_id.fecha =
          date.toLocaleDateString() + ' ' + item.horario_id.hora_sal;
        item.ruta_id.descuento = item.ruta_id.descuento * 100;
      }
      var vuelosAuxiliares = [];
      for (const item of vuelo) {
        if (item.estado == 1) {
          vuelosAuxiliares.push(item);
        }
      }
      this._vuelosBusqueda_Con_Filtro = vuelosAuxiliares.reverse();
    });
  }

  formalizarReserva() {}



  
////////////////////////////////////////////////////////////


  numeroFilas_Vuelo: any = '';
  asientosVuelo: any = [];
  asientos: any = [];

  listarAsientos_Vuelo() {
    //reinicia los asientos, si cambia la seleccion del vuelo
    this.numeroFilas_Vuelo = '';
    this.asientosVuelo = [];
    this.asientos = [];

    this.vueloService.getById(this.idVueloSeleccionado).subscribe((data) => {
      //llena arreglo con el numero de asientos del vuelo
      for (let index = 0; index < data.avion_id.cant_filas; index++) {
        this.asientosVuelo.push({ numFil: index + 1 });
      }

      //llena arreglo con asientos formateados
      //Estos son los que se imprimen para ser seleccionados
      for (const item of data.asientos) {
        this.asientos.push({
          numFil: item.fil,
          numFil_numAsiento: item.fil + '_' + item.num,
          estado: item.est,
        });
      }

      //                     ---ASIENTOS----   ---ASIENTOS----
      //                            0                1
      //ArregloDeArreglos  [ [{ }, { } ,{ }], [{ }, { } ,{ }] ]
      //                       0    1     2     0    1     2

       for (let i = 0; i < data.avion_id.cant_filas; i++) {
        for (let j = 0; j < data.avion_id.cant_af; j++) {
          
        }
      }






    });
  }
} //fin del componente
