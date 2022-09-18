import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Pelicula } from '../models/PeliculaDTO';
import { Usuario } from '../models/UsuarioDTO';
import { Observable } from 'rxjs';
import { Genero } from '../models/GeneroDTO';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }
  URL = 'http://localhost:8080';

  getGeneros(){
    return this.http.get<Genero[]>(`/api/movies/generos`)
  }

  getAllPeliculas(genero: String){
    return this.http.get<Pelicula[]>(`/api/movies/all?genero=${genero}`)
  }

  loginUser(user: Usuario): Observable<any>{
    return this.http.post<Usuario>(`/api/usuario/login`, user);
  }

  registerUser(user: Usuario): Observable<any>{
    return this.http.post<Usuario>(`/api/usuario/registro`, user);
  }

  getAllPeliculasByIdCreador(idUsuario: number){
    return this.http.get<Pelicula[]>(`/api/movies/creador/id/${idUsuario}`);
  }

  addPelicula(pelicula: Pelicula){
    return this.http.post<Pelicula>(`/api/movies/add`, pelicula);
  }

  buscarPelicula(titulo: string){
    return this.http.get<Pelicula[]>(`api/movies/search?titulo=${titulo}`)
  }
}