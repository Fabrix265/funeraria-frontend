import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector:'app-confirm-dialog',
  templateUrl:'./confirm-dialog.html',
  styleUrls:['./confirm-dialog.css']
})
export class ConfirmDialog {

  @Input() mensaje:string='¿Estás seguro?'

  @Output() confirmar=new EventEmitter()
  @Output() cancelar=new EventEmitter()

}