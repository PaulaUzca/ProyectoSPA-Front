import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Genero } from './models/GeneroDTO';
import { Usuario } from './models/UsuarioDTO';
import { ServiceService } from './services/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Movie';
  generosList: Genero[] = [];
  userLoggedIn: boolean = false;
  usuario: Usuario | undefined;

  constructor(
    private router: Router,
    private service: ServiceService){}

  ngOnInit(): void {
    this.isUserLogged();
    this.service.getGeneros().subscribe((generos) => {
      this.generosList = generos;
      localStorage.setItem('generos', JSON.stringify(this.generosList));
    });

    this.Inicio();
  }

  isUserLogged(){
    console.log(localStorage.getItem("user"))
    this.usuario = JSON.parse(localStorage.getItem("user") || '{}');
    console.log(this.usuario);
    this.userLoggedIn = this.usuario?.id ? true : false;
    console.log(this.userLoggedIn);
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
    this.isUserLogged();
  }
}
