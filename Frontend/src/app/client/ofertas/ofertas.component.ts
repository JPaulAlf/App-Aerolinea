import { Component, OnInit } from '@angular/core';
declare function ejecutarAnimacion(): any;
import { ToastrService } from 'ngx-toastr';
import { AeropuertoService } from 'src/app/services/aeropuerto.service';
import { AvionService } from 'src/app/services/avion.service';
import { VueloService } from 'src/app/services/vuelo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RutaService } from 'src/app/services/ruta.service';
import { BccrService } from '../../services/bccr.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css'],
})
export class OfertasComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private _aeropuertoService: AeropuertoService,
    private _rutaService: RutaService,
    private vueloService: VueloService,
    private avionService: AvionService,
    private usuarioService: UsuarioService, 
    private bccr: BccrService 
  ) {}

  _rutasDescuento: any = [];
  precioDolar: any = '0';
  esColones: string = 'false';
  p: any = 1;

  ngOnInit(): void {
    ejecutarAnimacion();
    this.bccr.get().subscribe((data: any) => {
      this.precioDolar = data.compra;
      console.log(data);
    });
    this.rutasDescuento();
  }

  rutasDescuento() {
    this._rutaService.get().subscribe((data) => {
      for (const item of data) {
        if (item.descuento != 0) {
          item.duracion = item.precio_trayecto; //utilizo este campo para guardar el precio real
          item.precio_trayecto =
            item.precio_trayecto - item.precio_trayecto * item.descuento;
          item.precio_trayecto = '$' + item.precio_trayecto;
          item.descuento = item.descuento * 100;
          this._rutasDescuento.push(item);
        }
      }
    });
  }

  cambiarMoneda() {
    if (this.esColones == 'false') {
      this.monedaColones();
      this.esColones = 'true';
    } else if (this.esColones == 'true') {
      this.monedaDolares();
      this.esColones = 'false';
    }
  }

  monedaColones() {
    this._rutasDescuento = []; //se limpia el arreglo que carga la tabla en dolares

    this._rutaService.get().subscribe((data) => {
      for (const item of data) {
        if (item.descuento != 0) {
          //Se aplica el descuento al precio, si es que tiene uno.
          item.precio_trayecto =
            item.precio_trayecto - item.precio_trayecto * item.descuento;

          //Conversion a COLONES por medio del API del BCCR
          item.precio_trayecto = new Intl.NumberFormat('de-DE').format(
            item.precio_trayecto * this.precioDolar
          );

          //Se le da el icono que se va mostrar en la tabla
          item.precio_trayecto = '₡' + item.precio_trayecto;

          //Se pasa de decimas a % de 100 el descuento
          item.descuento = item.descuento * 100;

          this._rutasDescuento.push(item);
        }
      }
    });
  }

  monedaDolares() {
    this._rutasDescuento = []; //se limpia el arreglo que carga la tabla en dolares
    this._rutaService.get().subscribe((data) => {
      for (const item of data) {
        if (item.descuento != 0) {
          item.duracion = item.precio_trayecto; //utilizo este campo para guardar el precio real
          item.precio_trayecto =
            item.precio_trayecto - item.precio_trayecto * item.descuento;
          item.precio_trayecto = '$' + item.precio_trayecto;
          item.descuento = item.descuento * 100;
          this._rutasDescuento.push(item);
        }
      }
    });
  }
}
