import { Component,OnInit } from '@angular/core'
import { AtaudService } from '../../../core/services/ataud'
import { CommonModule } from '@angular/common';

@Component({
  selector:'app-ataudes',
  imports:[CommonModule],
  templateUrl:'./ataudes.html'
})
export class Ataudes implements OnInit{

  ataudes:any[]=[]

  constructor(private service:AtaudService){}

  ngOnInit(){
    this.service.listar({})
      .subscribe(res=>this.ataudes=res)
  }

}