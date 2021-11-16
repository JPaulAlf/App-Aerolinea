import { Component, OnInit } from '@angular/core';
declare function navMovil():any;
declare function counterActivate():any;
declare function closeNav():any;
@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
 
  }

  ngAfterViewInit(): void{

    navMovil();
    counterActivate();
  }

  close(){
    closeNav();
  }

}

