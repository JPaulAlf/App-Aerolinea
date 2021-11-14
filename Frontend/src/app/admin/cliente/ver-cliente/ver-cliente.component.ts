import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-ver-cliente',
  templateUrl: './ver-cliente.component.html',
  styleUrls: ['./ver-cliente.component.css']
})
export class VerClienteComponent implements OnInit {
  usuarios: any = [];
  constructor(private _usuarioService: UsuarioService, private toastr:ToastrService) {





   }

  ngOnInit(): void {
    this.obtenerUsuarios(); 
  }
  obtenerUsuarios() {

    this._usuarioService.get().subscribe(data => {

      console.log(data);
      this.usuarios = data;
    }, err => {

      console.log(err);

    });

  }
  eliminarUsuario(id:any, usuario:any) {

    if (usuario.estado == 1) {
      usuario.estado = 0;
    }else{
      usuario.estado = 1;
    }
    this._usuarioService.editState(id, usuario).subscribe(data => {


      if (usuario.estado == 1) {
        this.toastr.success('The state of user was changed','User enabled');
      }else{
        this.toastr.error('The state of user was changed','User disabled');
      }
     
     
      this.obtenerUsuarios();
    }, err => {

      console.log(err);

    });
  }
}
