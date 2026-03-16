import { Component,OnInit } from '@angular/core'
import { PersonaService } from '../../../core/services/persona'
import { CommonModule } from '@angular/common';

@Component({
  selector:'app-fallecidos',
  imports:[CommonModule],
  templateUrl:'./fallecidos.html'
})
export class Fallecidos implements OnInit{

  fallecidos:any[]=[]

  constructor(private service:PersonaService){}

  ngOnInit(){

    this.service.listarFallecidos()
      .subscribe(res=>this.fallecidos=res)

  }

}