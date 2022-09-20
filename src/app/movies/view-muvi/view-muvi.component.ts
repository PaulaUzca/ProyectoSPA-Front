import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { read } from '@popperjs/core';
import { Like } from 'src/app/models/LikeDTO';
import { Pelicula } from 'src/app/models/PeliculaDTO';
import { Usuario } from 'src/app/models/UsuarioDTO';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-view-muvi',
  templateUrl: './view-muvi.component.html',
  styleUrls: ['./view-muvi.component.scss']
})
export class ViewMuviComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private service: ServiceService,
  private snackBar: MatSnackBar,
  private router: Router,
  ) { }

  muvi!: Pelicula;
  user!: Usuario;
  userRate: number = 0; 
  readOnly: boolean = true;
  sameUser: boolean = false;
  notloggedIn: boolean = false;

  userReviewed : boolean = false;
  editMode: boolean = false;

  showEdit: boolean = false;

  ngOnInit(): void {
    this.user =  JSON.parse(localStorage.getItem("user") || '{}')
    if(!this.user.id){
      this.notloggedIn = true;
    }
    this.muvi = this.data?.pelicula
    this.editMode = this.data?.editMode

    if(this.user.id == this.muvi.idCreador){
      this.sameUser = true;
      this.readOnly = true;
    }
    else{
      this.getMuviLike();
    }
  }


  getMuviLike(){
    this.service.getUserMuviLike(this.user.id, this.muvi.id).subscribe((response) => {
      if(response != null){
        this.userRate = response;
        this.readOnly = true;
      }
      else{
        this.readOnly = false;
      }
    });
  }

  likeMuvi(){
    var like : Like = {id: '', idUsuario: this.user.id,
     idPelicula:  this.muvi.id, hearts: this.userRate};
    this.service.likeMuvi(like).subscribe((muviUpdate) => {
      this.muvi = muviUpdate;
      this.readOnly = true;
      this.snackBar.open("Gracias por tu review!", "", {
        duration: 3000
      });
      this.userReviewed = true;
    });
  }

  showEditForm(){
    this.showEdit = true;
  }

 closeEditForm(event: any){
  if(event.value){
    this.showEdit = false
  }
 }
}

