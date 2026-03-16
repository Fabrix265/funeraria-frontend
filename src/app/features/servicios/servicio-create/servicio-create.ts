import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Servicio } from '../../../core/services/servicio'
import { FormsModule } from '@angular/forms'

@Component({
  selector:'app-servicio-create',
  imports:[FormsModule],
  templateUrl:'./servicio-create.html',
  styleUrls:['./servicio-create.css']
})
export class ServicioCreate{

  form:any={}

  constructor(
    private servicioService:Servicio,
    private router:Router
  ){}

  crear(){

    this.servicioService
      .crear(this.form)
      .subscribe(()=>{

        this.router.navigate(['/servicios'])

      })

  }

}