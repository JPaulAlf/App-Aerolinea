import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AvionService } from 'src/app/services/avion.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-avion',
  templateUrl: './crear-avion.component.html',
  styleUrls: ['./crear-avion.component.css']
})
export class CrearAvionComponent implements OnInit {
//variables de formulario
avionForm = new FormGroup({
  modelo: new FormControl('', [Validators.required, Validators.minLength(3)]),
  anho: new FormControl('', [Validators.required, Validators.max(new Date().getFullYear()), Validators.min(1990)]),
  marca: new FormControl('', Validators.required),
  cant_filas: new FormControl('', [Validators.required, Validators.min(5)]), 
  cant_af: new FormControl('', [Validators.required, Validators.min(6)]),
   imagen: new FormControl('', Validators.required),
   estado: new FormControl('', [Validators.required, Validators.min(0)]),
});


public archivos:any=[];
public previsualizacion:string='';


reloadCurrentRoute() {
  const currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
}
//Combo de marcas
listaMarcas=['Ford', 'Ferrari', 'Mazzeratti', 'Lamborgini', 'Deloitte','Toyota'];

  constructor(private sanitizer: DomSanitizer, private avionS: AvionService, private router: Router) { }

  ngOnInit(): void {
  }

submitForm(): void {
  this.avionForm.get('imagen')?.setValue(this.previsualizacion);
  if (this.avionForm.valid) {
    this.avionS.create(this.avionForm.value).subscribe((data) => {
      this.reloadCurrentRoute();
    });
  }
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
