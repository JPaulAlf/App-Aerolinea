import { Component, OnInit } from '@angular/core';
import { VueloService } from '../../../services/vuelo.service';

@Component({
  selector: 'app-ver-vuelo',
  templateUrl: './ver-vuelo.component.html',
  styleUrls: ['./ver-vuelo.component.css'],
})
export class VerVueloComponent implements OnInit {
  constructor(private vueloService: VueloService) {}
  vuelos: any = [];

  ngOnInit(): void {
    this.vueloService.get().subscribe((vuelo) => {
      this.vuelos = vuelo;
    });
  }

  delete(id: string): void {
    if (confirm('Are you sure about delete this flight?')) {
      this.vueloService.delete(id).subscribe((res: any) => {
        this.vuelos = this.vuelos.filter((post: any) => post._id !== id);
      });
    }
  }
}
