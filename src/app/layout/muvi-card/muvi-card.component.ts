import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pelicula } from 'src/app/models/PeliculaDTO';

@Component({
  selector: 'app-muvi-card',
  templateUrl: './muvi-card.component.html',
  styleUrls: ['./muvi-card.component.scss']
})
export class MuviCardComponent implements OnInit {
  @Input() muvi!: Pelicula;
  @Input() editar: boolean = false;
  @Output() editarMuvi = new EventEmitter();
  @Output() seeMuvi = new EventEmitter(); 
  constructor() { }

  ngOnInit(): void {
  }

  editEvent(){
    this.editarMuvi.emit({value: this.muvi});
  }

  // only if editar es false
  seeEvent(){
    if(!this.editar){
      this.seeMuvi.emit({value: this.muvi})
    }
  }

}
