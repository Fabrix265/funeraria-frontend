import { Component,OnInit } from '@angular/core'
import { UserService } from '../../../core/services/user'
import { CommonModule } from '@angular/common';
import { User } from '../../../core/models/user.model';

@Component({
  selector:'app-usuarios-list',
  imports:[CommonModule],
  templateUrl:'./usuarios-list.html'
})
export class UsuariosList implements OnInit{

  usuarios: User[] = [];

  constructor(private service:UserService){}

  ngOnInit() {
    this.service.listar().subscribe({
      next: (res) => {
        this.usuarios = res;
      },
      error: (err) => console.error('Error al cargar usuarios', err)
    });
  }

}