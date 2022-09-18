import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestComponent } from './layout/guest/guest.component';
import { PageComponent } from './layout/page/page.component';
import { IndexComponent } from './movies/index/index.component';
import { MovieformComponent } from './movies/movieform/movieform.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UsuarioComponent } from './user/usuario/usuario.component';


const routes: Routes = [

    { 
      path: '', 
      component: PageComponent,
      children: [
        {path: "", component: IndexComponent},
        {path: "index", component: IndexComponent},
        {path: "buscar", component: IndexComponent},
        {path: "agregarPelicula", component: MovieformComponent},
        {path: "usuario", component: UsuarioComponent},
      ]
    },
    {
      path: '',
      component: GuestComponent,
      children: [
        {path: "login", component: LoginComponent},
        {path: "register", component: RegisterComponent},
      ]

    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
