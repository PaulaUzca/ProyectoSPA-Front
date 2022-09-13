import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
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
          localStorage.setItem('idUser', usuario.id.toString());
          this.router.navigate(["index",'']);
        }},
        (error) =>{
          this.errorMsg = error.message;
        }
    );
  }

  goRegistro(){
    this.router.navigate(["register"]);
  }

}
