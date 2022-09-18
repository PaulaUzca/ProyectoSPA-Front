import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Genero } from '../../models/GeneroDTO';
import { Usuario } from '../../models/UsuarioDTO';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  title = 'Movie';
  generosList: Genero[] = [];
  userLoggedIn: boolean = false;
  usuario: Usuario | undefined;

  busqueda: string = "";
  constructor(
    private router: Router,
    private service: ServiceService,
    private snackBar: MatSnackBar,
    ){}

  ngOnInit(): void {
    this.isUserLogged();
    this.service.getGeneros().subscribe((generos) => {
      this.generosList = generos;
      localStorage.setItem('generos', JSON.stringify(this.generosList));
    });

    this.Inicio();
  }

  // Buscar pelicula ingresada por el usuario
  buscarPelicula(){
    this.router.navigate([""], { queryParams: { titulo: this.busqueda } });
  }

  isUserLogged(){
    this.usuario = JSON.parse(localStorage.getItem("user") || '{}');
    this.userLoggedIn = this.usuario?.id ? true : false;
  }

  Registro(){
    this.router.navigate(["register"]);
  }

  LogIn(){
    this.router.navigate(["login"]);
  }

  Inicio(){
    this.router.navigate(["index", '']);
  }

  UsuarioPeliculas(){
    this.router.navigate(["usuario"]);
  }
  
  AgregarMuvi(){
    this.router.navigate(["agregarPelicula"]);
  }

  LogOut(){
    localStorage.setItem('user', '{}');
    this.openSnackBar("Hasta pronto!", '');
    this.isUserLogged();
  }

    /** Abirir un mensajito de dialogo */
    openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}
