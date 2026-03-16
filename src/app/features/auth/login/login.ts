import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Auth } from '../../../core/services/auth'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';

@Component({
  selector:'app-login',
  imports:[FormsModule, CommonModule],
  templateUrl:'./login.html',
  styleUrls:['./login.css']
})
export class Login{

  username=''
  password=''
  error=''

  constructor(
    private auth:Auth,
    private router:Router
  ){}

  login(){

    this.auth.login(this.username,this.password)
      .subscribe({

        next:(res:any)=>{

          this.auth.guardarToken(res.access_token)

          const payload = JSON.parse(atob(res.access_token.split('.')[1]))

          localStorage.setItem('cargo',payload.cargo)

          this.router.navigate(['/dashboard'])

        },

        error:()=>{
          this.error='Credenciales incorrectas'
        }

      })

  }

}