import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-editar-avion',
  templateUrl: './editar-avion.component.html',
  styleUrls: ['./editar-avion.component.css']
})
export class EditarAvionComponent implements OnInit {
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
