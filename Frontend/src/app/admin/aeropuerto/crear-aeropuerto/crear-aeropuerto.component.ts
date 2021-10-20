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
