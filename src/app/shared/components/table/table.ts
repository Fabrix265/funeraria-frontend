import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common';

@Component({
  selector:'app-table',
  imports: [CommonModule],
  templateUrl:'./table.html',
  styleUrls:['./table.css']
})
export class Table {

  @Input() columns:string[]=[]
  @Input() data:any[]=[]

}