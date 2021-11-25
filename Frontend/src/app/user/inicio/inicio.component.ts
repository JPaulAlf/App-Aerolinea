import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AeropuertoService } from 'src/app/services/aeropuerto.service';
import { AvionService } from 'src/app/services/avion.service';
import { VueloService } from 'src/app/services/vuelo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RutaService } from 'src/app/services/ruta.service';
import * as moment from 'moment';

declare function ejecutarAnimacion(): any;
declare function counterActivate(): any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private _aeropuertoService: AeropuertoService,
    private _rutaService: RutaService,
    private vueloService: VueloService,
    private avionService: AvionService,
    private usuarioService: UsuarioService, 
  ) {}

  _aeropuertoInicio: any = [];
  _aeropuertoDestino: any = [];
  _rutasDescuento: any = [];
  _vuelosBusqueda: any = [];
  v_NumRutas: any = "---";
  v_NumAviones: any = "---";
  v_NumClientes: any = "---";
  v_NumVuelos: any = "---";

  itemsForm = new FormGroup({
    inicio: new FormControl('', Validators.required),
    destino: new FormControl('', Validators.required),
    fechaInicio: new FormControl('', Validators.required),
    fechaFinal: new FormControl('', Validators.required),
    selectRoundTrip: new FormControl(''),
    selectOneWay: new FormControl(''),
  });

  ngOnInit(): void {
    ejecutarAnimacion();

    this._aeropuertoService.get().subscribe((data) => {
      this._aeropuertoInicio = data;
      this._aeropuertoDestino = data;
    });
    this.rutasDescuento();
    this.contar_NumeroRutas();
    this.contar_NumeroAviones();
    this.contar_NumeroClientes();
    this.contar_NumeroVuelos();
  }

  buscarVuelo() {
    
    if (this.itemsForm.get("selectOneWay")?.value && !this.itemsForm.get("selectRoundTrip")?.value) {
      //ONE_WAY
     
        if (this.itemsForm.get("inicio")?.valid && this.itemsForm.get("destino")?.valid && this.itemsForm.get("fechaInicio")?.valid) {
           //Realizar filtro
         const busqueda = this.itemsForm.value
          this.vueloService.get().subscribe((data) => {

            for (var vuelo of data) {
             
          var fecha = new Date(vuelo.horario_id.fecha).toLocaleDateString();
         
          
          
  
          
         
          vuelo.horario_id.fecha = moment(fecha, 'D/M/YYYY') //fecha inicio
            .add(1, 'days')
            
            .format('D/M/YYYY');
           


            console.log(vuelo.horario_id.fecha, busqueda.fechaInicio)
        
            if (vuelo.ruta_id.inicio._id == busqueda.inicio._id 
              && vuelo.ruta_id.destino._id == busqueda.destino._id 
              && vuelo.horario_id.fecha == busqueda.fechaInicio) {
              
                


            }
             
              
            }


          })






           //Abre modal
          let modal: HTMLElement = document.getElementsByName('modal')[0] as HTMLElement;
          modal.click();

        }else{
          //rechazar y mostrar mensaje en modal 
          this.toastr.error("Form Invalid", "Error")
        }
    }else{
      if (this.itemsForm.get("selectOneWay")?.value && this.itemsForm.get("selectRoundTrip")?.value) {
        //ROUND_TRIP
        if (this.itemsForm.get("inicio")?.valid && this.itemsForm.get("destino")?.valid && this.itemsForm.get("fechaInicio")?.valid && this.itemsForm.get("fechaFinal")?.valid) {
          //Realizar filtro







           //Abre modal
          let modal: HTMLElement = document.getElementsByName('modal')[0] as HTMLElement;
          modal.click();
          
        }else{
          //rechazar y mostrar mensaje en modal
          this.toastr.error("Form Invalid", "Error")
        }
      }else{
        this.toastr.error("Please select one way or round trip before of request", "Error")
      }
    }





  }



  seleccion_RoundTrip() {
    this.itemsForm.get('selectRoundTrip')?.setValue(true);
    this.itemsForm.get('selectOneWay')?.setValue(true);
  }
  seleccion_OneWay() {
    this.itemsForm.get('selectRoundTrip')?.setValue(false);
    this.itemsForm.get('selectOneWay')?.setValue(true);
  }
  rutasDescuento(){
    this._rutaService.get().subscribe((data) => {
      for(const item of data){
        if(item.descuento!=0){
          item.descuento= item.descuento*100;
          if(this._rutasDescuento.length<7){
            this._rutasDescuento.push(item);
          }
        }
      }
    });
  }
  contar_NumeroRutas() {
    this._rutaService.get().subscribe((item) => {
      var cantidad:any=0
      for (const i of item) {
        cantidad++;
      }
      this.v_NumRutas = cantidad;
    });
  }
  contar_NumeroAviones() {
    this.avionService.get().subscribe((item) => {
      var cantidad:any=0
      for (const i of item) {
        cantidad++;
      }
      this.v_NumAviones = cantidad;
    });
  }
  contar_NumeroClientes() {
    this.usuarioService.get().subscribe((item) => {
      var cantidad:any=0
      for (const i of item) {
        cantidad++;
      }
      this.v_NumClientes = cantidad;
    });
  }
  contar_NumeroVuelos() {
    this.vueloService.getSencillo().subscribe((item) => {
      var cantidad:any=0
      for (const i of item) {
        if(i.estado==1){
          cantidad++;
        }
      }
      this.v_NumVuelos = cantidad;
    });
  }




}
