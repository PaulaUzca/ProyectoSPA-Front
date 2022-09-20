import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Pelicula } from '../models/PeliculaDTO';
import { Usuario } from '../models/UsuarioDTO';
import { Observable } from 'rxjs';
import { Genero } from '../models/GeneroDTO';
import { Like } from '../models/LikeDTO';

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

  editPelicula(pelicula: Pelicula){
    return this.http.put<Pelicula>(`/api/movies/edit`, pelicula)
  }

  buscarPelicula(titulo: string){
    return this.http.get<Pelicula[]>(`api/movies/search?titulo=${titulo}`)
  }

  // Si el usuario le dio like a la pelicula
  getUserMuviLike(idUsuario: number, idPelicula: number) {
    return this.http.get<number>(`api/likes/findLike?idUsuario=${idUsuario}&idPelicula=${idPelicula}`)
  }

  // Darle like a una muvi
  likeMuvi(like: Like){
    return this.http.post<Pelicula>(`api/likes`, like)
  }

  // eliminar una muvi
  deletMuvi(idMuvi: number){
    return this.http.delete<boolean>(`api/movies/delete/${idMuvi}`);
  }
  //obtener peliculas likeadas por el usuario

  getLikedMuvis(idUser: number){
    return this.http.get<Pelicula[]>(`api/movies/usuarioLiked/${idUser}`)
  }
}