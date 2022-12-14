import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pelicula } from 'src/app/models/PeliculaDTO';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-edit-muvi-form',
  templateUrl: './edit-muvi-form.component.html',
  styleUrls: ['./edit-muvi-form.component.scss']
})
export class EditMuviFormComponent implements OnInit {
  @Output() goback = new EventEmitter(); 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private service: ServiceService,
    private snackBar: MatSnackBar) { }

  generosList: any[] = [];
  form: any;
  requiredError: string = "Este campo es requerido."
  placeholderImg: string = "https://i.imgur.com/ur4H4Cp.png";
  imagenURL : string = "";

  ngOnInit(): void {
    this.generosList = JSON.parse(localStorage.getItem('generos') || '{}');
    this.buildForm();
    this.form.patchValue(this.data?.pelicula);
  }


  /** Abirir un mensajito de dialogo */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  // volver a la vista
  goBack(){
    this.goback.emit({value: true});
  }
  
  /** Construir el formulario */
  buildForm(){
    this.form = this.formBuilder.group({
      id: [''],
      titulo: ['', Validators.required],
      estreno: [''],
      descripcion: [''],
      imageURL: ['', Validators.required],
      idGenero: [null, Validators.required],
      nombreGenero: null,
      idCreador: [null, Validators.required],
      nombreCreador: null,
      stars: ['', Validators.required],
    });
  }
}
