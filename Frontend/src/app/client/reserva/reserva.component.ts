import { Component, OnInit, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AeropuertoService } from 'src/app/services/aeropuerto.service';
import { AvionService } from 'src/app/services/avion.service';
import { VueloService } from 'src/app/services/vuelo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RutaService } from 'src/app/services/ruta.service';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import {  } from 'ngx-pagination';
import * as moment from 'moment';

declare function ejecutarAnimacion(): any;
declare function counterActivate(): any;

@Injectable({
  providedIn: 'root',
})
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


  public payPalConfig ? : IPayPalConfig;

  public precioVuelo: number = 0;

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'AZDqbElOkBrfsd2QEdl46_NdvVakAiyN4AJwCWsdbX6bbos-f5ZfTCso-857ulBqaAq0CN-AyHHivwxD',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: '9.99',
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: '9.99'
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'USD',
                        value: '9.99',
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details: any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);

        },
        onError: err => {
            console.log('OnError', err);
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        },
    };
}

  _aeropuertoInicio: any = [];
  _aeropuertoDestino: any = [];
  tipoBusqueda:any = null;
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
    this.initConfig();
    this._aeropuertoService.get().subscribe((data) => {
      this._aeropuertoInicio = data;
      this._aeropuertoDestino = data;
    });
  }
 
  buscarVuelo() { 
    this._vuelosBusqueda_OneWay = [];
    this._vuelosBusqueda_RoundTrip1 = [];
    this._vuelosBusqueda_RoundTrip2 = [];
    this.itemsForm.get('selectSearch_OneWay')?.setValue(false);
    this.itemsForm.get('selectSearch_RoundTrip')!.setValue(false);
    this.itemsForm.get('selectFlight_OneWay')?.setValue(false);
    this.itemsForm.get('selectFlight1_RoundTrip')?.setValue(false);
    this.itemsForm.get('selectFlight2_RoundTrip')?.setValue(false);
    this.rutaSeleccionado_OneWay = 'Route not selected!';
    this.horarioSeleccionado_OneWay = 'Schedule not selected!';
    this.idVueloSeleccionado_OneWay = 'Flight not selected!';
  
    this.rutaSeleccionado1_RoundTrip = 'Route not selected!';
    this.horarioSeleccionado1_RoundTrip = 'Schedule not selected!';
    this.idVueloSeleccionado1_RoundTrip = 'Flight not selected!';
  
    this.rutaSeleccionado2_RoundTrip = 'Route not selected!';
    this.horarioSeleccionado2_RoundTrip = 'Schedule not selected!';
    this.idVueloSeleccionado2_RoundTrip = 'Flight not selected!';
    if (this.itemsForm.get("selectOneWay")?.value && !this.itemsForm.get("selectRoundTrip")?.value) {
      //ONE_WAY

      if (this.itemsForm.get("inicio")?.valid && this.itemsForm.get("destino")?.valid && this.itemsForm.get("fechaInicio")?.valid) {
        //Realizar filtro

        this.vueloService.get().subscribe((data) => {

          for (var vuelo of data) {
            if (vuelo.estado == 1) {
              var busqueda = this.itemsForm.value
              var fecha = new Date(vuelo.horario_id.fecha).toLocaleDateString();
              vuelo.horario_id.fecha = moment(fecha, 'D/M/YYYY')
                .add(1, 'days') //fecha inicio
                .format('D/M/YYYY');




              var fechaForm = new Date(busqueda.fechaInicio).toLocaleDateString();
              var auxFechaInicio = moment(fechaForm, 'D/M/YYYY')
                .add(1, 'days') //fecha incio Búsqueda
                .format('D/M/YYYY');


              if (vuelo.ruta_id.inicio._id == busqueda.inicio._id
                && vuelo.ruta_id.destino._id == busqueda.destino._id
                && vuelo.horario_id.fecha == auxFechaInicio) {

                vuelo.horario_id.fecha = vuelo.horario_id.fecha + " " + vuelo.horario_id.hora_sal
                this._vuelosBusqueda_OneWay.push(vuelo);
              }


            }
          }
          this.itemsForm.get('selectSearch_OneWay')?.setValue(true);
          
        })





       
        //Abre modal
       

      } else {
        //rechazar y mostrar mensaje en modal 
        this.toastr.error("Form Invalid", "Error")
      }
    } else {
      if (this.itemsForm.get("selectOneWay")?.value && this.itemsForm.get("selectRoundTrip")?.value) {
        //ROUND_TRIP
        if (this.itemsForm.get("inicio")?.valid
          && this.itemsForm.get("destino")?.valid
          && this.itemsForm.get("fechaInicio")?.valid
          && this.itemsForm.get("fechaFinal")?.valid) {
          //Realizar filtro

          this.vueloService.get().subscribe((data) => {

            for (var vuelo of data) {
              if (vuelo.estado == 1) {


                var busqueda = this.itemsForm.value
                var fecha = new Date(vuelo.horario_id.fecha).toLocaleDateString();
                vuelo.horario_id.fecha = moment(fecha, 'D/M/YYYY')
                  .add(1, 'days') //fecha inicio
                  .format('D/M/YYYY');




                var fechaInicio = new Date(busqueda.fechaInicio).toLocaleDateString();
                var auxFechaInicio = moment(fechaInicio, 'D/M/YYYY')
                  .add(1, 'days')               //fecha incio Búsqueda
                  .format('D/M/YYYY');


                var fechaDestino = new Date(busqueda.fechaFinal).toLocaleDateString();
                var auxFechaDestino = moment(fechaDestino, 'D/M/YYYY')
                  .add(1, 'days') //fecha incio Búsqueda
                  .format('D/M/YYYY');



                if (vuelo.ruta_id.inicio._id == busqueda.inicio._id
                  && vuelo.ruta_id.destino._id == busqueda.destino._id
                  && vuelo.horario_id.fecha == auxFechaInicio) {

                  vuelo.horario_id.fecha = vuelo.horario_id.fecha + " " + vuelo.horario_id.hora_sal
                  vuelo.ruta_id.descuento = vuelo.ruta_id.descuento * 100;
                  this._vuelosBusqueda_RoundTrip1.push(vuelo);
                }

                if (vuelo.ruta_id.inicio._id == busqueda.destino._id
                  && vuelo.ruta_id.destino._id == busqueda.inicio._id
                  && vuelo.horario_id.fecha == auxFechaDestino) {
                  vuelo.horario_id.fecha = vuelo.horario_id.fecha + " " + vuelo.horario_id.hora_sal
                  vuelo.ruta_id.descuento = vuelo.ruta_id.descuento * 100;
                  this._vuelosBusqueda_RoundTrip2.push(vuelo);

                }

              }
            }
            this.itemsForm.get('selectSearch_RoundTrip')!.setValue(true);
          })




         

          //Abre modal
        

        } else {
          //rechazar y mostrar mensaje en modal
          this.toastr.error("Form Invalid", "Error")
        }
      } else {
        this.toastr.error("Please select one way or round trip before of request", "Error")
      }
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
        
       data.horario_id.fecha = moment(data.horario_id.fecha, 'D/M/YYYY')
          .add(1, 'days') //fecha incio Búsqueda
          .format('D/M/YYYY');
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
        data.horario_id.fecha = moment(data.horario_id.fecha, 'D/M/YYYY')
        .add(1, 'days') //fecha incio Búsqueda
        .format('D/M/YYYY');
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
        data.horario_id.fecha = moment(data.horario_id.fecha, 'D/M/YYYY')
        .add(1, 'days') //fecha incio Búsqueda
        .format('D/M/YYYY');
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
