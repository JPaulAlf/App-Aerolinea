import { Component, OnInit, Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { styles } from './mapstyles';
import { Router , ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AeropuertoService } from 'src/app/services/aeropuerto.service';
import { waitForAsync } from '@angular/core/testing';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-editar-aeropuerto',
  templateUrl: './editar-aeropuerto.component.html',
  styleUrls: ['./editar-aeropuerto.component.css']
})
export class EditarAeropuertoComponent implements OnInit {
  
  private map!: google.maps.Map
  constructor( private toastr:ToastrService, private aeropuertoS: AeropuertoService, private router: Router, private aRouter: ActivatedRoute) {
    this.id = this.aRouter.snapshot.paramMap.get('id')+'';
    this.obtenerAeropuerto();
   }


  ae:any={};
  lat:string=''; lon:string=''; id:string='';
  //formulario
  aeropForm= new FormGroup({
    nombre: new FormControl("", [Validators.required]),
    pais: new FormControl('', Validators.required),
    ciudad: new FormControl('', Validators.required),
    latitud: new FormControl('', Validators.required),
    longitud: new FormControl('', Validators.required),descripcion: new FormControl('', Validators.required),
    estado: new FormControl("", [Validators.required]),
    _id: new FormControl("",)
  });

  submitForm(){
    if (this.aeropForm.valid) {
      this.aeropuertoS.update(this.ae._id,this.aeropForm.value).subscribe((data) => {
        this.router.navigate(['admin/airport/overview-airport']);
      });
    }
  }
  async obtenerAeropuerto() {
    
      this.aeropuertoS.getById(this.id).subscribe((data) => {
        delete data.__v;
        this.ae = data;
        this.aeropForm.setValue(this.ae);
        this.lat=data.latitud;
        this.lon=data.longitud;
        (async () => { 
          // Do something before delay
          console.log('before delay')
  
          await new Promise(f => setTimeout(f, 6000));

          this.mapa();
          // Do something after
          console.log('after delay')
      })();
        
      });
  }
  ngOnInit(): void {
  
  }
  mapa(){
    let loader = new Loader({
      apiKey: 'AIzaSyBrSzQLopheNl98oKL3xPgWCdQMK03ZPgA'
    })
    
    loader.load().then(() => {

      
      var informacion = new google.maps.InfoWindow({

      });
      console.log(this.lat+' '+this.lon)
      var location = { lat: +this.lat, lng: +this.lon };
      console.log(location)
      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: location,
        zoom: 6,
        mapTypeControl: false,
        styles: styles
      })

      const marker = new google.maps.Marker({
        map: this.map,
      });
      this.map.setCenter(location)
        marker.setPosition(location)
        this.lat = location.lat.toString();
        this.lon = location.lng.toString();
       
        var textoMensaje = '<h4>You are here!</h4>' +
          '<p><b>LNG: </b>' + location.lng + '</p>' +
          '<p><b>LAT: </b>' + location.lat + '</p>';

        informacion.setContent(textoMensaje);

        marker.setIcon('../../../../assets/images/pin.png');

        marker.addListener('click', () => {
          informacion.open(this.map, marker);
         
        });

      this.map.addListener("click", (mapsMouseEvent: any) => {

        let lngLat = JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2);
        location = JSON.parse(lngLat);

        this.map.setCenter(location)
        marker.setPosition(location)
        
        this.lat = location.lat.toString();
        this.lon = location.lng.toString();
        
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

}
