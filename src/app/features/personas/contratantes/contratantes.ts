import { Component,OnInit } from '@angular/core'
import { PersonaService } from '../../../core/services/persona'
import { CommonModule } from '@angular/common';
import { Contratante } from '../../../core/models/contratante.model';

@Component({
  selector:'app-contratantes',
  imports:[CommonModule],
  templateUrl:'./contratantes.html'
})
export class Contratantes implements OnInit{

  contratantes: Contratante[] = [];

  constructor(private service:PersonaService){}

  ngOnInit() {
    this.service.listarContratantes()
      .subscribe({
        next: (res) => {
          this.contratantes = res;
        },
        error: (err) => {
          console.error('Error al obtener contratantes:', err);
        }
      });
  }

}