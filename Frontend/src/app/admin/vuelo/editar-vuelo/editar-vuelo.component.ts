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
  _avionSeleccionado: any = null;

  ngOnInit(): void {
    this.idURL = this.aRoute.snapshot.paramMap.get('id');
    this.toastr.error('ID>>' + this.idURL, 'Id obtenido');
  }

  obtengoVuelo(){

  }

  

}
