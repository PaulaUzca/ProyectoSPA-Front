import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/models/PeliculaDTO';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  peliculasList: Pelicula[] = [];
  userIsLoggedIn: boolean = false;
  user: any;
  constructor(private service: ServiceService) { }

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
}
