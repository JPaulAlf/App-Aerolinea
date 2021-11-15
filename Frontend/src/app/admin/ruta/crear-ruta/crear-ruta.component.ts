import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {RutaService} from 'src/app/services/ruta.service';
import {AeropuertoService} from 'src/app/services/aeropuerto.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-crear-ruta',
  templateUrl: './crear-ruta.component.html',
  styleUrls: ['./crear-ruta.component.css'],
})
export class CrearRutaComponent implements OnInit {
  constructor(private toastr: ToastrService , private _rutaService: RutaService, private _aeropuertoService: AeropuertoService) {}

  //Listas de los combos
  _aeropuertoInicio: any = [];
  _aeropuertoDestino: any = [];
  rutaForm = new FormGroup({
    inicio: new FormControl('',Validators.required),
    destino: new FormControl('', Validators.required),
    duracion: new FormControl('', Validators.required),
    precio_trayecto: new FormControl('', Validators.required), 
    descuento: new FormControl('', Validators.required),
    horarios: new FormControl(),
  
    
     
  });
  // _aeropuertoInicio = [
  //   {
  //     _id: '1',
  //     nombre: 'Costa Rica',
  //   },
  //   {
  //     _id: '2',
  //     nombre: 'Estados Unidos',
  //   },
  // ];
  // _aeropuertoFinal = [
  //   {
  //     _id: '1',
  //     nombre: 'Costa Rica',
  //   },
  //   {
  //     _id: '2',
  //     nombre: 'Estados Unidos',
  //   },
  // ];
  // //Variables que poseen la seleccion del usuario
  // _aeropuertoInicioSelec: any = '---';
  // _aeropuertoFinalSelec: any = '---';

  // //Lista de horarios fabricados
  _horariosCreados: any = [];
  p_Horario: any = 1;

  // selectChange_Inicio(event: any) {
  //   //Almacena el ID de la seleccion
  //   //Pero primero valida que la seleccion sea diferente  al otro combo
  //   this.validaSeleccionDiferente_Inicio(event.target.value);
  // }
  // selectChange_Final(event: any) {
  //   //Almacena el ID de la seleccion
  //   //Pero primero valida que la seleccion sea diferente  al otro combo
  //   this.validaSeleccionDiferente_Final(event.target.value);
  // }

  // validaSeleccionDiferente_Inicio(valor: any) {
  //   //Este metodo valida que el combo seleccionado
  //   //sea distinto al otro seleccionado
  //   //si ya tuviera una seleccion o no
  //   if (
  //     this._aeropuertoInicioSelec == '---' &&
  //     this._aeropuertoFinalSelec != '---'
  //   ) {
  //     if (this._aeropuertoFinalSelec != valor) {
  //       //Setea el valor debido que es diferente seleccion
  //       this._aeropuertoInicioSelec = valor;
  //     } else {
  //       this.toastr.warning('The selection need to be different', 'Attention');
  //     }
  //   } else if (
  //     this._aeropuertoInicioSelec == '---' &&
  //     this._aeropuertoFinalSelec == '---'
  //   ) {
  //     this._aeropuertoInicioSelec = valor;
  //   } else {
  //     this.toastr.warning('The selection need to be different', 'Attention');
  //   }
  // }
  // validaSeleccionDiferente_Final(valor: any) {
  //   //Este metodo valida que el combo seleccionado
  //   //sea distinto al otro seleccionado
  //   //si ya tuviera una seleccion
  //   if (
  //     this._aeropuertoInicioSelec != '---' &&
  //     this._aeropuertoFinalSelec == '---'
  //   ) {
  //     if (this._aeropuertoInicioSelec != valor) {
  //       //Setea el valor debido que es diferente seleccion
  //       this._aeropuertoFinalSelec = valor;
  //     } else {
  //       this.toastr.warning('The selection need to be different', 'Attention');
  //     }
  //   } else if (
  //     this._aeropuertoInicioSelec == '---' &&
  //     this._aeropuertoFinalSelec == '---'
  //   ) {
  //     this._aeropuertoFinalSelec = valor;
  //   } else {
  //     this.toastr.warning('The selection need to be different', 'Attention');
  //   }
  // }

  borrarHorarioCreado(_id: any) {}

  ngOnInit(): void {

    this._aeropuertoService.get().subscribe( data => {
     this._aeropuertoInicio= data;
     this._aeropuertoDestino = data;
     console.log(data)
    });

  }

  enviar(){

  }
}
