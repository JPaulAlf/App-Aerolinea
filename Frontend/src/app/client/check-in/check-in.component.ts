import { Component, OnInit } from '@angular/core';
declare function ejecutarAnimacion(): any;
import { ReservaService } from 'src/app/services/reserva.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {

  constructor(
    private reservaService: ReservaService,
    private tokenStorageService: TokenStorageService,
    private router: Router, ) { }


    vuelos: any;

  ngOnInit(): void {
    ejecutarAnimacion();
    const idUser = this.tokenStorageService.getUser().user._id;
    this.reservaService.getCheckIn(idUser).subscribe((data=>{
      data.forEach((reserva: any)=>{
      let llegada=reserva.vuelo_id_1.horario_id.hora_sal
      let fecha=reserva.vuelo_id_1.horario_id.fecha.substring(0, 9);
      fecha+=' '+llegada;
      const horaV1= moment(fecha, 'YYYY-MM-DD h:mm').format('LLL')
      const ahora = moment().add(1, 'days');
        if(moment(ahora).isAfter(horaV1)){
          let vuelo1 = reserva.vuelo_id_1;
          vuelo1.reserva=reserva._id;
          vuelo1.takeoff=horaV1.toString();
          this.vuelos.push(vuelo1);
        }
      //   let llegada2=reserva.vuelo_id_2.horario_id.hora_sal
      // let fecha2=reserva.vuelo_id_12.horario_id.fecha.substring(0, 9);
      // fecha2+=','+llegada2;
      // const horaV2= moment(fecha, 'YYYY-MM-DD,h:mm')
      //   if(moment(ahora).isAfter(horaV2)){
      //     let vuelo2 = reserva.vuelo_id_2;
      //     vuelo2.reserva=reserva._id;
      //     this.vuelos.push(vuelo2);
       // }
      })
    }));
    
  }

}
