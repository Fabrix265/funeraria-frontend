import { Component,OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Servicio } from '../../../core/services/servicio'
import { CommonModule } from '@angular/common'

@Component({
  selector:'app-servicio-detail',
  imports:[CommonModule],
  templateUrl:'./servicio-detail.html',
  styleUrls:['./servicio-detail.css']
})
export class ServicioDetail implements OnInit{

  servicio:any

  constructor(
    private route:ActivatedRoute,
    private servicioService:Servicio
  ){}

  ngOnInit(){

    const id=this.route.snapshot.params['id']

    this.servicioService
      .obtener(id)
      .subscribe(res=>this.servicio=res)

  }

}