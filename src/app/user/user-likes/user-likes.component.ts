import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pelicula } from 'src/app/models/PeliculaDTO';
import { ViewMuviComponent } from 'src/app/movies/view-muvi/view-muvi.component';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-user-likes',
  templateUrl: './user-likes.component.html',
  styleUrls: ['./user-likes.component.scss']
})
export class UserLikesComponent implements OnInit {
  peliculasList: Pelicula[] = [];
  userIsLoggedIn: boolean = false;
  user: any;
  wait: boolean = false;
  muvisFound = true;

  constructor(
    private service: ServiceService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.userIsLoggedIn = this.isUserLogged();
    this.getPeliculasLikedByUser();
  }
  isUserLogged(){
    this.user = JSON.parse(localStorage.getItem("user")  || '{}');
    return this.user?.id;
  }

    /** Obtiene las peliculas por id creador*/
    getPeliculasLikedByUser(){
      this.wait = true;
      this.service.getLikedMuvis(this.user?.id).subscribe((peliculas: Pelicula[]) => {
        this.peliculasList = peliculas;
        this.wait = false;
        if(this.peliculasList){
          this.muvisFound = true
        }
        else{
          this.muvisFound = false
        }
      });
    }


    // Abrir vista de la película
  openSee(event: any){
    let pelicula = event.value;
    const dialogRef = this.dialog.open(ViewMuviComponent, {
      height: "550px",
      panelClass: 'dialog-container-custom',
      data: {pelicula: pelicula}
    });

  }

}
