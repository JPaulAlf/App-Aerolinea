import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-crear-avion',
  templateUrl: './crear-avion.component.html',
  styleUrls: ['./crear-avion.component.css']
})
export class CrearAvionComponent implements OnInit {
public archivos:any=[];
public previsualizacion:string='';


  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }




  obtenerImagen(event:any){

const imagen = event.target.files[0];

this.extraerBase64(imagen).then((imagen: any) =>{
  this.previsualizacion = imagen.base;
  console.log(imagen.base);
});


this.archivos.push(imagen);
  }



extraerBase64 = async($event:any) => new Promise((resolve, reject) => {

try {
  const unsafeImg = window.URL.createObjectURL($event);
  const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
  const reader = new FileReader();
  reader.readAsDataURL($event);
  reader.onload = () => {
    resolve({
      
      base: reader.result

    });
  };
  reader.onerror = error => {
    resolve({
      base: null
    });
    



  }

} catch (error) {
 
}





})


}
