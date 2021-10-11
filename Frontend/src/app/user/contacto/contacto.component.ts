import { Component, OnInit,  } from '@angular/core';
declare function ejecutarAnimacion():any;

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor() {  }

  ngOnInit(): void {
    ejecutarAnimacion();
  }
  
}
