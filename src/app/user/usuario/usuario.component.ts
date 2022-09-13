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
  idUsuario: any;
  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.userIsLoggedIn = this.isUserLogged() != null? true : false; 
    this.getPeliculas();

  }

  isUserLogged(){
    this.idUsuario = localStorage.getItem("idUser");
    return this.idUsuario;
  }

    /** Obtiene las peliculas por id genero, si no hay las obtiene todas */
    getPeliculas(){
      this.service.getAllPeliculasByIdCreador(this.idUsuario).subscribe((peliculas) => {
        this.peliculasList = peliculas;
      })
    }
}
