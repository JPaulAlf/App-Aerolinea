import { Component, OnInit, Injectable} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AvionService } from 'src/app/services/avion.service';
import { VueloService } from 'src/app/services/vuelo.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { Router, ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
interface IAsientos
  {"fill":Number,
  "num":Number,
  "est": boolean}




@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-escoger-asiento',
  templateUrl: './escoger-asiento.component.html',
  styleUrls: ['./escoger-asiento.component.css']
})
export class EscogerAsientoComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private reservaS: ReservaService,
    private vueloS : VueloService,
    private avionS : AvionService,
    private router: Router,
    private aRouter: ActivatedRoute,
  ) { }


reserva: any={};

avion: any={};
asientos:IAsientos[]=[]
asientosVista:Array<IAsientos[]>=[];
vuelo:any={};
numFilas:number=0;
numAF:number=0;

encabezado:number[]=[];

contador:number=0;

obtenerDatos(){
  this.reserva=this.reservaS.getById(this.aRouter.snapshot.paramMap.get('id') + '');
  this.vuelo=this.reserva.vuelo_id;
  this.avion=this.avionS.getById(this.vuelo.avion_id+"");
  this.numFilas=Number(this.avion.cant_filas);
  this.numAF=Number(this.avion.cant_af);
  this.asientos=this.vuelo.asientos;
}


  ngOnInit(): void {
    this.obtenerDatos();
    this.encabezado = Array(this.numAF).fill(1).map((x, i) => i + 1); 
    let arrayAsi:IAsientos[]=[];
    this.asientos.forEach(asi => {
      if(this.contador>=this.numAF){
        arrayAsi.push(asi);
        this.contador++;
      }else{
        this.asientosVista.push(arrayAsi);
        arrayAsi=[];
        arrayAsi.push(asi)
        this.contador=1;
      }
    });
  }

}
