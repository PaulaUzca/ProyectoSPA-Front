import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import {HttpClientModule} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { UsuarioComponent } from './user/usuario/usuario.component';
import { IndexComponent } from './movies/index/index.component';
import { RatingComponent } from './movies/rating/rating.component';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'
import { MatInputModule } from '@angular/material/input';
import { MovieformComponent } from './movies/movieform/movieform.component';
import { MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { GuestComponent } from './layout/guest/guest.component';
import { PageComponent } from './layout/page/page.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { EditMuviFormComponent } from './user/usuario/edit-muvi-form/edit-muvi-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StarRating, StarRatingComponent, StarRatingConfig, StarRatingModule } from 'angular-star-rating';
import { MuviCardComponent } from './layout/muvi-card/muvi-card.component';
import { ViewMuviComponent } from './movies/view-muvi/view-muvi.component';
import { UserLikesComponent } from './user/user-likes/user-likes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsuarioComponent,
    IndexComponent,
    RatingComponent,
    MovieformComponent,
    GuestComponent,
    PageComponent,
    EditMuviFormComponent,
    MuviCardComponent,
    ViewMuviComponent,
    UserLikesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    HttpClientModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    NgbModule,
    StarRatingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
