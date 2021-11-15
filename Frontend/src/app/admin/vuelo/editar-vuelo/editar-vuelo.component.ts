import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VueloService } from '../../../services/vuelo.service';
import { RutaService } from 'src/app/services/ruta.service';
import { AvionService } from 'src/app/services/avion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-vuelo',
  templateUrl: './editar-vuelo.component.html',
  styleUrls: ['./editar-vuelo.component.css'],
})
export class EditarVueloComponent implements OnInit {
  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private vueloService: VueloService,
    private rutaService: RutaService,
    private avionService: AvionService,
    private toastr: ToastrService
  ) {}
  idURL: any = null;
  _vueloSeleccionado: any = null;
  _asientosAvion: any = [];
  p_asientosAvion: any = 1;

  ngOnInit(): void {
    this.idURL = this.aRoute.snapshot.paramMap.get('id');
    this.toastr.success('ID number:\n' + this.idURL, 'Flight details');
    this.obtengoVuelo(this.idURL);
  }

  obtengoVuelo(id: any) {
    this.vueloService.getById(id).subscribe((item) => {
      var date = new Date(item.horario_id.fecha);
      item.horario_id.fecha = date.toLocaleDateString();
      this._vueloSeleccionado = item;
      this._asientosAvion = item.asientos;
    });
  }
}
