import { Component, OnInit, AfterViewInit } from '@angular/core';
declare function navMovil():any;
declare function counterActivate():any;
@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
 
  }

  ngAfterViewInit(): void{

    navMovil();
    counterActivate();
  }

}
