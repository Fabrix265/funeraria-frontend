import { Component,OnInit } from '@angular/core'
import { Servicio } from '../../../core/services/servicio'
import { CommonModule } from '@angular/common';

@Component({
  selector:'app-servicio-list',
  imports:[CommonModule],
  templateUrl:'./servicio-list.html'
})
export class ServicioList implements OnInit{

  servicios:any[]=[]

  constructor(private servicioService:Servicio){}

  ngOnInit(){
    this.cargar()
  }

  cargar(){

    this.servicioService
      .listar({})
      .subscribe((res:any)=>{

        this.servicios=res.data

      })

  }

}