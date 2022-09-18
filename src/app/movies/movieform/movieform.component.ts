import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import { Pelicula } from 'src/app/models/PeliculaDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movieform',
  templateUrl: './movieform.component.html',
  styleUrls: ['./movieform.component.scss']
})
export class MovieformComponent implements OnInit {

  generosList: any[] = [];

  imageToShow: string = "";
  imagenURL : string = "";
  placeholderImg: string = "https://i.imgur.com/ur4H4Cp.png";
  image404: boolean = false;

  form: any;
  requiredError: string = "Este campo es requerido."
  user: any;

  constructor(private http:HttpClient,
    private formBuilder: FormBuilder,
    private service: ServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.user =  JSON.parse(localStorage.getItem("user") || '{}')
    this.generosList = JSON.parse(localStorage.getItem('generos') || '{}');
    this.buildForm();
  }
  /** Cargar los listeners de los campo */
  loadListeners(){
    this.form.controls.imageURL.valueChanges.subscribe(() =>{
      if(this.imageToShow === this.placeholderImg){
        this.image404 = true;
      }
      else{
        this.image404 = false;
      }
    })
  }

  /** Crear registro de pelicula*/
  agregarMuvi(){
    if(!this.image404){
      var pelicula = this.form.value as Pelicula
      this.service.addPelicula(pelicula).subscribe((response) =>{
        this.openSnackBar("Pelicula creada con éxito!", "OK");
      },
      error =>{
        this.openSnackBar(error.message + " :c", "OK");
      });
    }
  }


  /** Abirir un mensajito de dialogo */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  /** Construir el formulario */
  buildForm(){
    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      estreno: [''],
      descripcion: [''],
      imageURL: ['', Validators.required],
      idGenero: [null, Validators.required],
      nombreGenero: null,
      idCreador: [this.user?.id, Validators.required],
      nombreCreador: null,
    });
  }

  LogIn(){
    this.router.navigate(["login"]);
  }

}
