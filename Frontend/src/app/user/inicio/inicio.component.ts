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

  buscarVuelo() {}



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
