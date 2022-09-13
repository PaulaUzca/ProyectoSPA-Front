import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Genero } from './models/GeneroDTO';
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

  constructor(
    private router: Router,
    private service: ServiceService){}

  ngOnInit(): void {
    this.userLoggedIn = this.isUserLogged() != null? true : false;
    this.service.getGeneros().subscribe((generos) => {
      this.generosList = generos;
    });
    this.Inicio();
  }

  isUserLogged(){
    return localStorage.getItem("idUser")
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
}
