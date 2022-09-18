import { Component, Input, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { Pelicula } from 'src/app/models/PeliculaDTO';
import { ServiceService } from 'src/app/services/service.service';
import { EditMuviFormComponent } from './edit-muvi-form/edit-muvi-form.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  peliculasList: Pelicula[] = [];
  userIsLoggedIn: boolean = false;
  user: any;
  constructor(private service: ServiceService,
    private modalService: NgbModal,
    private config: NgbModalConfig) {
      config.backdrop = 'static';
      config.keyboard = false;
     }


  ngOnInit(): void {
    this.userIsLoggedIn = this.isUserLogged();
    this.getPeliculas();

  }

  isUserLogged(){
    this.user = JSON.parse(localStorage.getItem("user")  || '{}');
    return this.user?.id;
  }

  /** Obtiene las peliculas por id creador*/
  getPeliculas(){
    this.service.getAllPeliculasByIdCreador(this.user?.id).subscribe((peliculas) => {
      this.peliculasList = peliculas;
    })
  }

    open() {
      const modalRef = this.modalService.open(EditMuviFormComponent);
      modalRef.componentInstance.name = 'World';
    }
}
