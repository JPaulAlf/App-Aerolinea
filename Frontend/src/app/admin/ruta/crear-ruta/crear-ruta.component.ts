import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-ruta',
  templateUrl: './crear-ruta.component.html',
  styleUrls: ['./crear-ruta.component.css'],
})
export class CrearRutaComponent implements OnInit {
  constructor(private toastr: ToastrService) {}

  //Listas de los combos
  //_aeropuertoInicio: any = [];
  //_aeropuertoFinal: any = [];
  _aeropuertoInicio = [
    {
      _id: '1',
      nombre: 'Costa Rica',
    },
    {
      _id: '2',
      nombre: 'Estados Unidos',
    },
  ];
  _aeropuertoFinal = [
    {
      _id: '1',
      nombre: 'Costa Rica',
    },
    {
      _id: '2',
      nombre: 'Estados Unidos',
    },
  ];
  //Variables que poseen la seleccion del usuario
  _aeropuertoInicioSelec: any = '---';
  _aeropuertoFinalSelec: any = '---';

  //Lista de horarios fabricados
  _horariosCreados: any = [];
  p_Horario: any = 1;

  selectChange_Inicio(event: any) {
    //Almacena el ID de la seleccion
    //Pero primero valida que la seleccion sea diferente  al otro combo
    this.validaSeleccionDiferente_Inicio(event.target.value);
  }
  selectChange_Final(event: any) {
    //Almacena el ID de la seleccion
    //Pero primero valida que la seleccion sea diferente  al otro combo
    this.validaSeleccionDiferente_Final(event.target.value);
  }

  validaSeleccionDiferente_Inicio(valor: any) {
    //Este metodo valida que el combo seleccionado
    //sea distinto al otro seleccionado
    //si ya tuviera una seleccion o no
    if (
      this._aeropuertoInicioSelec == '---' &&
      this._aeropuertoFinalSelec != '---'
    ) {
      if (this._aeropuertoFinalSelec != valor) {
        //Setea el valor debido que es diferente seleccion
        this._aeropuertoInicioSelec = valor;
      } else {
        this.toastr.warning('The selection need to be different', 'Attention');
      }
    } else if (
      this._aeropuertoInicioSelec == '---' &&
      this._aeropuertoFinalSelec == '---'
    ) {
      this._aeropuertoInicioSelec = valor;
    } else {
      this.toastr.warning('The selection need to be different', 'Attention');
    }
  }
  validaSeleccionDiferente_Final(valor: any) {
    //Este metodo valida que el combo seleccionado
    //sea distinto al otro seleccionado
    //si ya tuviera una seleccion
    if (
      this._aeropuertoInicioSelec != '---' &&
      this._aeropuertoFinalSelec == '---'
    ) {
      if (this._aeropuertoInicioSelec != valor) {
        //Setea el valor debido que es diferente seleccion
        this._aeropuertoFinalSelec = valor;
      } else {
        this.toastr.warning('The selection need to be different', 'Attention');
      }
    } else if (
      this._aeropuertoInicioSelec == '---' &&
      this._aeropuertoFinalSelec == '---'
    ) {
      this._aeropuertoFinalSelec = valor;
    } else {
      this.toastr.warning('The selection need to be different', 'Attention');
    }
  }

  borrarHorarioCreado(_id: any) {}

  ngOnInit(): void {}
}
