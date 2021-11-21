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

  //estos son los arrays que se tienen que llenar para el filtro en el
  //Logica del frontEnd echa
  _vuelosBusqueda_OneWay: any = [];
  _vuelosBusqueda_RoundTrip1: any = [];
  _vuelosBusqueda_RoundTrip2: any = [];

  p: any = 1;

  rutaSeleccionado_OneWay: string = 'Route not selected!';
  horarioSeleccionado_OneWay: string = 'Schedule not selected!';
  idVueloSeleccionado_OneWay: string = 'Flight not selected!';

  rutaSeleccionado1_RoundTrip: string = 'Route not selected!';
  horarioSeleccionado1_RoundTrip: string = 'Schedule not selected!';
  idVueloSeleccionado1_RoundTrip: string = 'Flight not selected!';

  rutaSeleccionado2_RoundTrip: string = 'Route not selected!';
  horarioSeleccionado2_RoundTrip: string = 'Schedule not selected!';
  idVueloSeleccionado2_RoundTrip: string = 'Flight not selected!';

  itemsForm = new FormGroup({
    inicio: new FormControl('', Validators.required),
    destino: new FormControl('', Validators.required),
    fechaInicio: new FormControl('', Validators.required),
    fechaFinal: new FormControl('', Validators.required),

    selectRoundTrip: new FormControl(''),
    selectOneWay: new FormControl(''),
    selectSearch_RoundTrip: new FormControl(''),
    selectSearch_OneWay: new FormControl(''),
    selectFlight_OneWay: new FormControl(''),
    selectFlight1_RoundTrip: new FormControl(''),
    selectFlight2_RoundTrip: new FormControl(''),
  });

  ngOnInit(): void {
    ejecutarAnimacion();
    this._aeropuertoService.get().subscribe((data) => {
      this._aeropuertoInicio = data;
      this._aeropuertoDestino = data;
    });
  }

  buscarVuelo() {
    //Tienen el ID del aeropuerto seleccionado
    var inicio_component = this.itemsForm.get('inicio')?.value;
    var destino = this.itemsForm.get('destino')?.value;

    //De tipo Date
    var fechaInicio = this.itemsForm.get('fechaInicio')?.value;
    var fechaFinal = this.itemsForm.get('fechaFinal')?.value;

    //Tienen un valor TRUE o FALSE, segun fue la seleccion del usuario
    var selectRoundTrip = this.itemsForm.get('selectRoundTrip')?.value;
    var selectOneWay = this.itemsForm.get('selectOneWay')?.value;

    //Si busca un RoundTrip,deben de realizarsen 2 tablas y 2 busquedas
    if (this.itemsForm.get('selectRoundTrip')?.value == true) {
      this.itemsForm.get('selectSearch_RoundTrip')!.setValue(true);
      this.itemsForm.get('selectSearch_OneWay')!.setValue(false);

      //Metodo de busqueda y llenado de las 2 tablas
      // >>>>>> ACA DEBE DE LLENAR LOS ARREGLOS
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
        this._vuelosBusqueda_RoundTrip1 = vuelosAuxiliares.reverse();
        this._vuelosBusqueda_RoundTrip2 = vuelosAuxiliares.reverse();
      });
    }

    //Si busca un OneWay,debe de realizarse 1 tablas y 1 busqueda
    // >>>>>> ACA DEBE DE LLENAR LOS ARREGLOS
    if (
      this.itemsForm.get('selectOneWay')!.value == true &&
      this.itemsForm.get('selectRoundTrip')!.value == false
    ) {
      this.itemsForm.get('selectSearch_OneWay')?.setValue(true);
      this.itemsForm.get('selectSearch_RoundTrip')!.setValue(false);

      //Metodo de busqueda y llenado de 1 tabla
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
        this._vuelosBusqueda_OneWay = vuelosAuxiliares.reverse();
      });
    }

    //En caso que de buscar y no tenga seleccionada ninguna opcion
    if (
      this.itemsForm.get('selectOneWay')!.value == false &&
      this.itemsForm.get('selectRoundTrip')!.value == false
    ) {
      this.toastr.warning('Please select all options first', 'Flight');
    }
  }

  //Esto debe de guardar la reserva en la Base de datos
  formalizarReserva() {}

  seleccion_RoundTrip() {
    this.itemsForm.get('selectRoundTrip')?.setValue(true);
    this.itemsForm.get('selectOneWay')?.setValue(true);

    this.itemsForm.get('selectSearch_OneWay')?.setValue(false);
    this.itemsForm.get('selectFlight_OneWay')!.setValue(false);

    this.rutaSeleccionado_OneWay = 'Route not selected!';
    this.horarioSeleccionado_OneWay = 'Schedule not selected!';
    this.idVueloSeleccionado_OneWay = 'Flight not selected!';
  }
  seleccion_OneWay() {
    this.itemsForm.get('selectOneWay')?.setValue(true);

    this.itemsForm.get('selectRoundTrip')?.setValue(false);
    this.itemsForm.get('selectSearch_RoundTrip')!.setValue(false);
    this.itemsForm.get('selectFlight1_RoundTrip')!.setValue(false);
    this.itemsForm.get('selectFlight2_RoundTrip')!.setValue(false);

    this.rutaSeleccionado1_RoundTrip = 'Route not selected!';
    this.horarioSeleccionado1_RoundTrip = 'Schedule not selected!';
    this.idVueloSeleccionado1_RoundTrip = 'Flight not selected!';

    this.rutaSeleccionado2_RoundTrip = 'Route not selected!';
    this.horarioSeleccionado2_RoundTrip = 'Schedule not selected!';
    this.idVueloSeleccionado2_RoundTrip = 'Flight not selected!';
  }

  SeleccionarVuelo_OneWay(_id: any) {
    if (this.itemsForm.get('selectRoundTrip')?.value == true) {
      this.itemsForm.get('selectSearch_RoundTrip')!.setValue(true);
      this.itemsForm.get('selectFlight1_RoundTrip')?.setValue(true);
      this.itemsForm.get('selectFlight2_RoundTrip')?.setValue(true);

      this.itemsForm.get('selectSearch_OneWay')!.setValue(false);

      this.rutaSeleccionado_OneWay = 'Route not selected!';
      this.horarioSeleccionado_OneWay = 'Schedule not selected!';
      this.idVueloSeleccionado_OneWay = 'Flight not selected!';
    }
    if (
      this.itemsForm.get('selectOneWay')!.value == true &&
      this.itemsForm.get('selectRoundTrip')!.value == false
    ) {
      this.itemsForm.get('selectSearch_OneWay')?.setValue(true);
      this.itemsForm.get('selectFlight_OneWay')?.setValue(true);

      this.itemsForm.get('selectSearch_RoundTrip')!.setValue(false);
      this.itemsForm.get('selectFlight1_RoundTrip')?.setValue(false);
      this.itemsForm.get('selectFlight2_RoundTrip')?.setValue(false);

      this.rutaSeleccionado1_RoundTrip = 'Route not selected!';
      this.horarioSeleccionado1_RoundTrip = 'Schedule not selected!';
      this.idVueloSeleccionado1_RoundTrip = 'Flight not selected!';

      this.rutaSeleccionado2_RoundTrip = 'Route not selected!';
      this.horarioSeleccionado2_RoundTrip = 'Schedule not selected!';
      this.idVueloSeleccionado2_RoundTrip = 'Flight not selected!';
    }
    this.idVueloSeleccionado_OneWay = _id;

    this.vueloService
      .getById(this.idVueloSeleccionado_OneWay)
      .subscribe((data) => {
        //Ruta seleccionada
        this.rutaSeleccionado_OneWay =
          data.ruta_id.inicio.nombre + ' >>> ' + data.ruta_id.destino.nombre;
        //Horario de la ruta seleccionada
        var date = new Date(data.horario_id.fecha);
        data.horario_id.fecha = date.toLocaleDateString();
        this.horarioSeleccionado_OneWay =
          data.horario_id.fecha +
          ' ' +
          data.horario_id.hora_sal +
          ' >>> ' +
          data.hora_lleg;
      });

    // this.listarAsientos_Vuelo();
  }
  SeleccionarVuelo1_RoundTrip(_id: any) {
    if (this.itemsForm.get('selectRoundTrip')?.value == true) {
      this.itemsForm.get('selectSearch_RoundTrip')!.setValue(true);
      this.itemsForm.get('selectFlight1_RoundTrip')?.setValue(true);
      this.itemsForm.get('selectFlight2_RoundTrip')?.setValue(true);

      this.itemsForm.get('selectSearch_OneWay')!.setValue(false);

      this.rutaSeleccionado_OneWay = 'Route not selected!';
      this.horarioSeleccionado_OneWay = 'Schedule not selected!';
      this.idVueloSeleccionado_OneWay = 'Flight not selected!';
    }
    if (
      this.itemsForm.get('selectOneWay')!.value == true &&
      this.itemsForm.get('selectRoundTrip')!.value == false
    ) {
      this.itemsForm.get('selectSearch_OneWay')?.setValue(true);
      this.itemsForm.get('selectFlight_OneWay')?.setValue(true);

      this.itemsForm.get('selectSearch_RoundTrip')!.setValue(false);
      this.itemsForm.get('selectFlight1_RoundTrip')?.setValue(false);
      this.itemsForm.get('selectFlight2_RoundTrip')?.setValue(false);

      this.rutaSeleccionado1_RoundTrip = 'Route not selected!';
      this.horarioSeleccionado1_RoundTrip = 'Schedule not selected!';
      this.idVueloSeleccionado1_RoundTrip = 'Flight not selected!';

      this.rutaSeleccionado2_RoundTrip = 'Route not selected!';
      this.horarioSeleccionado2_RoundTrip = 'Schedule not selected!';
      this.idVueloSeleccionado2_RoundTrip = 'Flight not selected!';
    }
    this.idVueloSeleccionado1_RoundTrip = _id;
    this.vueloService
      .getById(this.idVueloSeleccionado1_RoundTrip)
      .subscribe((data) => {
        //Ruta seleccionada
        this.rutaSeleccionado1_RoundTrip =
          data.ruta_id.inicio.nombre + ' >>> ' + data.ruta_id.destino.nombre;
        //Horario de la ruta seleccionada
        var date = new Date(data.horario_id.fecha);
        data.horario_id.fecha = date.toLocaleDateString();
        this.horarioSeleccionado1_RoundTrip =
          data.horario_id.fecha +
          ' ' +
          data.horario_id.hora_sal +
          ' >>> ' +
          data.hora_lleg;
      });

    // this.listarAsientos_Vuelo();
  }
  SeleccionarVuelo2_RoundTrip(_id: any) {
    if (this.itemsForm.get('selectRoundTrip')?.value == true) {
      this.itemsForm.get('selectSearch_RoundTrip')!.setValue(true);
      this.itemsForm.get('selectFlight1_RoundTrip')?.setValue(true);
      this.itemsForm.get('selectFlight2_RoundTrip')?.setValue(true);

      this.itemsForm.get('selectSearch_OneWay')!.setValue(false);

      this.rutaSeleccionado_OneWay = 'Route not selected!';
      this.horarioSeleccionado_OneWay = 'Schedule not selected!';
      this.idVueloSeleccionado_OneWay = 'Flight not selected!';
    }
    if (
      this.itemsForm.get('selectOneWay')!.value == true &&
      this.itemsForm.get('selectRoundTrip')!.value == false
    ) {
      this.itemsForm.get('selectSearch_OneWay')?.setValue(true);
      this.itemsForm.get('selectFlight_OneWay')?.setValue(true);

      this.itemsForm.get('selectSearch_RoundTrip')!.setValue(false);
      this.itemsForm.get('selectFlight1_RoundTrip')?.setValue(false);
      this.itemsForm.get('selectFlight2_RoundTrip')?.setValue(false);

      this.rutaSeleccionado1_RoundTrip = 'Route not selected!';
      this.horarioSeleccionado1_RoundTrip = 'Schedule not selected!';
      this.idVueloSeleccionado1_RoundTrip = 'Flight not selected!';

      this.rutaSeleccionado2_RoundTrip = 'Route not selected!';
      this.horarioSeleccionado2_RoundTrip = 'Schedule not selected!';
      this.idVueloSeleccionado2_RoundTrip = 'Flight not selected!';
    }
    this.idVueloSeleccionado2_RoundTrip = _id;
    this.vueloService
      .getById(this.idVueloSeleccionado2_RoundTrip)
      .subscribe((data) => {
        //Ruta seleccionada
        this.rutaSeleccionado2_RoundTrip =
          data.ruta_id.inicio.nombre + ' >>> ' + data.ruta_id.destino.nombre;
        //Horario de la ruta seleccionada
        var date = new Date(data.horario_id.fecha);
        data.horario_id.fecha = date.toLocaleDateString();
        this.horarioSeleccionado2_RoundTrip =
          data.horario_id.fecha +
          ' ' +
          data.horario_id.hora_sal +
          ' >>> ' +
          data.hora_lleg;
      });

    // this.listarAsientos_Vuelo();
  }

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  // ////////////////LISTADO DE ASIENTOS DEL AVION////////////////////////////

  // numeroFilas_Vuelo: any = '';
  // asientosVuelo: any = [];
  // asientos: any = [];

  // listarAsientos_Vuelo() {
  //   //reinicia los asientos, si cambia la seleccion del vuelo
  //   this.numeroFilas_Vuelo = '';
  //   this.asientosVuelo = [];
  //   this.asientos = [];

  //   this.vueloService.getById(this.idVueloSeleccionado).subscribe((data) => {
  //     //llena arreglo con el numero de asientos del vuelo
  //     for (let index = 0; index < data.avion_id.cant_af; index++) {
  //       this.asientosVuelo.push({ numFil: index + 1 });
  //     }

  //     //                     ---ASIENTOS----   ---ASIENTOS----
  //     //                            0                1
  //     //ArregloDeArreglos  [ [{ }, { } ,{ }], [{ }, { } ,{ }] ]
  //     //                       0    1     2     0    1     2
  //     var contador = 0;
  //     var asientosAux: any = [];
  //     var asientosFila: any = [];

  //     for (let i = 0; i < data.avion_id.cant_filas; i++) {
  //       for (let j = 0; j < data.avion_id.cant_af; j++) {
  //         asientosFila.push(data.asientos[contador]);
  //         contador++;
  //       }
  //       asientosAux.push(asientosFila);
  //       asientosFila = [];
  //     }

  //     this.asientos = asientosAux;

  //     console.log(this.asientos);
  //   });
  // }
} //fin del componente
