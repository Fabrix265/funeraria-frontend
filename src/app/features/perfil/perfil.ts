import { Component } from '@angular/core'
import { UserService } from '../../core/services/user'
import { FormsModule } from '@angular/forms';

@Component({
  selector:'app-perfil',
  imports: [FormsModule],
  templateUrl:'./perfil.html'
})
export class Perfil{

  username=''
  password=''

  constructor(private userService:UserService){}

  guardar(){

    this.userService
      .actualizarPerfil({
        username:this.username,
        password:this.password
      })
      .subscribe()

  }

}