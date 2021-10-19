import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { styles } from './mapstyles';
@Component({
  selector: 'app-crear-aeropuerto',
  templateUrl: './crear-aeropuerto.component.html',
  styleUrls: ['./crear-aeropuerto.component.css']
})
export class CrearAeropuertoComponent implements OnInit {
  private map!: google.maps.Map
  

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyBrSzQLopheNl98oKL3xPgWCdQMK03ZPgA'
    })

    loader.load().then(() => {
      console.log('loaded gmaps')

      const location = { lat: 51.233334, lng: 	6.783333 }

      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: location,
        zoom: 6,
        styles: styles
      })

      const marker = new google.maps.Marker({
        position: location,
        map: this.map,
      });
    })
  }

}
