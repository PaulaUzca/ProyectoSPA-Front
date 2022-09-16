import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './movies/index/index.component';
import { MovieformComponent } from './movies/movieform/movieform.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UsuarioComponent } from './user/usuario/usuario.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "usuario", component: UsuarioComponent},
  {path: "index/:id", component: IndexComponent},
  {path: "agregarPelicula", component: MovieformComponent}
 // {path: '', redirectTo: 'index', component: LandingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
