import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/UsuarioDTO';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
      confirmPassword:['',Validators.required],
    })
  }

  register(){
    var user = this.form.value as Usuario;
    this.service.registerUser(user)
    .subscribe(
      (usuario) => {
        if(usuario){
          localStorage.setItem('user', JSON.stringify(usuario));
          // TODO aqui falta que se espere un ratico para cargar el localstorage
          this.router.navigate(["index",'']);
        }},
        (error) =>{
          this.errorMsg = error.message;
        }
    );
  }

  goLogin(){

    this.router.navigate(["login"]);

  }
}
