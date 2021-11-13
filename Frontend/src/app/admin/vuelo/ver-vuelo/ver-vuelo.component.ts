import { Component, OnInit } from '@angular/core';
import { VueloService } from '../../../services/vuelo.service';

@Component({
  selector: 'app-ver-vuelo',
  templateUrl: './ver-vuelo.component.html',
  styleUrls: ['./ver-vuelo.component.css'],
})
export class VerVueloComponent implements OnInit {
  constructor(private vueloService: VueloService) { }
  vuelos: any = [];

  ngOnInit(): void {
    this.vueloService.get().subscribe((vuelo) => {
      for (const item of vuelo) {
        var date = new Date(item.horario_id.fecha);
        item.horario_id.fecha = date.toLocaleString();
      }
      var vuelosAuxiliares = [];
      for (const item of vuelo) {
        if (item.estado == 1) {
          vuelosAuxiliares.push(item);
        }
      }

      this.vuelos = vuelosAuxiliares;
    });
  }

  updateState(id: string): void {
    if (confirm('Are you sure about delete this flight?')) {
      var desactivo = {"estado":0};
      this.vueloService.editState(id, desactivo).subscribe((res: any) => {
        this.vueloService.get().subscribe((vuelo) => {
          for (const item of vuelo) {
            var date = new Date(item.horario_id.fecha);
            item.horario_id.fecha = date.toLocaleString();
          }
          var vuelosAuxiliares = [];
          for (const item of vuelo) {
            if (item.estado == 1) {
              vuelosAuxiliares.push(item);
            }
          }
          this.vuelos = vuelosAuxiliares;
        });
      });
    }
  }

  delete(id: string): void {
    if (confirm('Are you sure about delete this flight?')) {
      this.vueloService.delete(id).subscribe((res: any) => {
        this.vuelos = this.vuelos.filter((post: any) => post._id !== id);
      });
    }
  }

}
