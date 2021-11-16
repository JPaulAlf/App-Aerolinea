import { Component, OnInit } from '@angular/core';
declare function ejecutarAnimacion(): any;
import { ToastrService } from 'ngx-toastr';
import { AeropuertoService } from 'src/app/services/aeropuerto.service';
import { AvionService } from 'src/app/services/avion.service';
import { VueloService } from 'src/app/services/vuelo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RutaService } from 'src/app/services/ruta.service';

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
    private usuarioService: UsuarioService
  ) {}

  _rutasDescuento: any = [];
  p: any = 1;

  ngOnInit(): void {
    ejecutarAnimacion();
    this.rutasDescuento();
  }

  rutasDescuento() {
    this._rutaService.get().subscribe((data) => {
      for (const item of data) {
        if (item.descuento != 0) {
          item.duracion = item.precio_trayecto; //utilizo este campo para guardar el precio real
          item.precio_trayecto =
            item.precio_trayecto - item.precio_trayecto * item.descuento;
          item.descuento = item.descuento * 100;
          this._rutasDescuento.push(item);
        }
      }
    });
  }
}
