import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/UsuarioDTO';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  form: any;
  errorMsg: string = '';
  constructor(private formBuilder: FormBuilder,
    private service: ServiceService,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: [''],
      password: ['', Validators.required],
    })
  }

  login(){
    var user = this.form.value as Usuario;
    this.service.loginUser(user)
    .subscribe(
      (usuario) => {
        if(usuario){
          localStorage.setItem('user', JSON.stringify(usuario));
          // espera un ratico para cargar el localstorage
          setTimeout('', 3000)
          this.openSnackBar("Bienvenid@ " + usuario.username, '');
          this.router.navigate(["",'']);
        }},
        (error) =>{
          this.errorMsg = error.message;
        }
    );
  }

  /** Abirir un mensajito de dialogo */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }

}
