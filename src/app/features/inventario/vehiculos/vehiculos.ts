import { Component,OnInit } from '@angular/core'
import { VehiculoService } from '../../../core/services/vehiculo'
import { CommonModule } from '@angular/common';

@Component({
  selector:'app-vehiculos',
  imports:[CommonModule],
  templateUrl:'./vehiculos.html'
})
export class Vehiculos implements OnInit{

  vehiculos:any[]=[]

  constructor(private service:VehiculoService){}

  ngOnInit(){

    this.service.listar()
      .subscribe(res=>this.vehiculos=res)

  }

}