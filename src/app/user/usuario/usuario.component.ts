import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { Pelicula } from 'src/app/models/PeliculaDTO';
import { ServiceService } from 'src/app/services/service.service';
import { EditMuviFormComponent } from './edit-muvi-form/edit-muvi-form.component';
import {MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewMuviComponent } from 'src/app/movies/view-muvi/view-muvi.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit, OnChanges {
  peliculasList: Pelicula[] = [];
  userIsLoggedIn: boolean = false;
  user: any;
  wait: boolean = false;

  muvisFound = true;

  constructor(private service: ServiceService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {
     }

  ngOnInit(): void {
    this.userIsLoggedIn = this.isUserLogged();
    this.getPeliculas();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  isUserLogged(){
    this.user = JSON.parse(localStorage.getItem("user")  || '{}');
    return this.user?.id;
  }

  /** Obtiene las peliculas por id creador*/
  getPeliculas(){
    this.wait = true;
    this.service.getAllPeliculasByIdCreador(this.user?.id).subscribe((peliculas) => {
      this.peliculasList = peliculas;
      this.wait = false;
      if(this.peliculasList){
        this.muvisFound = true
      }
      else{
        this.muvisFound = false

      }
    })
  }


  
  openEdit(event: any) {
    let pelicula = event.value;
    const dialogRef = this.dialog.open(ViewMuviComponent, {
      panelClass: 'dialog-container-custom-edit',
      data: {pelicula: pelicula, editMode: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.state){
        // Editar pelicula
        if(result.edit){
        this.editarMuvi(result.pelicula)
        }

        // Eliminar pelicula
        if(result.delete){
          this.deleteMuvi(result.pelicula.id)
        }
    }
    });
  }

  // Eliminar pelicula
  deleteMuvi(idPelicula: number){
    this.service.deletMuvi(idPelicula).subscribe((response) => {
      if(response){
        this.snackBar.open("Pelicula eliminada con éxito", "OK", {
          duration: 3000
        });
        let muviInList =this.peliculasList.filter(p => p.id == idPelicula)[0];
        this.peliculasList.splice(this.peliculasList.indexOf(muviInList), 1);
      }
      else{
        this.snackBar.open("No ha sido posible elimar la pelicula", "OK", {
          duration: 3000
        });
      }
    },
    error => {
      this.snackBar.open(error.message, "OK", {
        duration: 3000
      });
    })
  }

  // Editar pelicula
  editarMuvi(pelicula: Pelicula){
    this.service.editPelicula(pelicula).subscribe((response) => {
      if(response){
        this.snackBar.open("Pelicula editada con éxito :)", "OK", {
          duration: 3000
        });
        let muviInList =this.peliculasList.filter(p => p.id == response.id)[0];
        this.peliculasList[this.peliculasList.indexOf(muviInList)] = response;
        //this.getPeliculas(); No es necesario recargar todo!
      }
      else{
        this.snackBar.open("No ha sido posible editar la pelicula :C", "OK", {
          duration: 3000
        });
      }
    },
    error => {
      this.snackBar.open(error.message + " :c", "OK", {
        duration: 3000
      });
    });
  }
}
