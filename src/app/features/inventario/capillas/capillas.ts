import { Component,OnInit } from '@angular/core'
import { CapillaService } from '../../../core/services/capilla'
import { CommonModule } from '@angular/common';

@Component({
  selector:'app-capillas',
  imports:[CommonModule],
  templateUrl:'./capillas.html'
})
export class Capillas implements OnInit{

  capillas:any[]=[]

  constructor(private service:CapillaService){}

  ngOnInit(){

    this.service.listar()
      .subscribe(res=>this.capillas=res)

  }

}