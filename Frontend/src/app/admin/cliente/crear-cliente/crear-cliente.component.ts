import { Component, Injectable, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Loader } from '@googlemaps/js-api-loader';
import { styles } from './mapstyles';
import { Router } from '@angular/router';
import { forEach } from 'lodash';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})


export class CrearClienteComponent implements OnInit {
  private map!: google.maps.Map
  lat: string = '';
  lng: string = '';
  public archivos: any = [];
  public previsualizacion: string = '';
  usuarioForm = new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    apellidos: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    fech_nacimiento: new FormControl('', Validators.required), 
    tel_trabajo: new FormControl('', Validators.required),
    tel_celular: new FormControl('', Validators.required),
    usuario: new FormControl('', Validators.required),
    contrasenna1: new FormControl('', Validators.required),
    contrasenna2: new FormControl('', Validators.required),
    imagen: new FormControl(),
    sennas: new FormControl('', Validators.required),
    direccion: new FormControl()
    
     
  });
  constructor(private sanitizer: DomSanitizer, private toastr:ToastrService, private _usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyBrSzQLopheNl98oKL3xPgWCdQMK03ZPgA'
    })
    loader.load().then(() => {

      console.log('loaded gmaps')
      var informacion = new google.maps.InfoWindow({

      });

      var location = { lat: 9.996182, lng: -84.210243 };

      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: location,
        zoom: 6,
        mapTypeControl: false,
        styles: styles
      })

      const marker = new google.maps.Marker({
        map: this.map,
      });

      this.map.addListener("click", (mapsMouseEvent: any) => {

        let lngLat = JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2);
        location = JSON.parse(lngLat);

        this.map.setCenter(location)
        marker.setPosition(location)
        this.lat = location.lat.toString();
        this.lng = location.lng.toString();
        console.log(this.lng)
        var textoMensaje = '<h4>You are here!</h4>' +
          '<p><b>LNG: </b>' + location.lng + '</p>' +
          '<p><b>LAT: </b>' + location.lat + '</p>';

        informacion.setContent(textoMensaje);

        marker.setIcon('../../../../assets/images/pin.png');

        marker.addListener('click', () => {
          informacion.open(this.map, marker);
         
        });

      });

    });
  }
  

enviar() {
if (this.previsualizacion=="") {
  this.toastr.error('Please choose an image for the customer','Error');
  return;
}
if (this.lat == "" && this.lng == "") {
  this.toastr.error('Please choose an location for the customer','Error');
  return
}






  this.usuarioForm.get('imagen')?.setValue(this.previsualizacion);
 
 //se construye el objeto dirección
  const direccion = {
    sennas:this.usuarioForm.get('sennas')?.value,
    latitud: this.lat,
    longitud:this. lng
  }
  this.usuarioForm.get('direccion')?.setValue(direccion)
  if (this.usuarioForm.valid) {
    //se setea el objeto dirección
    const usuario = this.usuarioForm.value
    
    this._usuarioService.create(usuario).subscribe((data) => {
      this.toastr.success('User creaded','Success');
   });
  }else{
    this.toastr.error('Form invalid','Error');

    }
    
   
  }




  obtenerImagen(event: any) {
    const imagen = event.target.files[0];
    this.extraerBase64(imagen).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen.base);
    }); 
    this.archivos.push(imagen);
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
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
    } catch (error) { }
  })
}
