import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  requiredError = "Este campo es requerido."
  passwordsMatch = true;
  constructor(private formBuilder: FormBuilder,
    private service: ServiceService,
    private router: Router,
    private snackBar: MatSnackBar

    ) { }
  
  ngOnInit(): void {
    this.buildForm();

    this.form.controls.password.valueChanges.subscribe(() =>{
      if(this.form.controls.confirmPassword.value != '' &&
        this.form.controls.password.value !== this.form.controls.confirmPassword.value){
          this.passwordsMatch = false;
        }
      else{
        this.passwordsMatch = true;
      }
    });

    this.form.controls.confirmPassword.valueChanges.subscribe(() =>{
      if(this.form.controls.confirmPassword.value != '' &&
        this.form.controls.password.value !== this.form.controls.confirmPassword.value){
          this.passwordsMatch = false;
        }
      else{
        this.passwordsMatch = true;
      }
    });
  }



  buildForm(){
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword:['',Validators.required],
    })
  }

  register(){
    if(this.form.valid && this.passwordsMatch){
    var user = this.form.value as Usuario;
    this.service.registerUser(user)
    .subscribe(
      (usuario) => {
        if(usuario){
          localStorage.setItem('user', JSON.stringify(usuario));

          setTimeout('', 3000)
          this.snackBar.open("Bienvenid@" + usuario.username, "", {
            duration: 5000
          });
          this.router.navigate(["index",'']);
        }},
        (error) =>{
          this.errorMsg = error.error.message;
        }
    );
    }
    else{
      this.errorMsg = "Llena el formulario correctamente y vuelve a intentarlo";
    }
  }

  goLogin(){

    this.router.navigate(["login"]);

  }
}
