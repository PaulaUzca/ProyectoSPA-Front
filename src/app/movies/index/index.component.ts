import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationStart, Route, Router } from '@angular/router';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Pelicula } from 'src/app/models/PeliculaDTO';
import { ServiceService } from 'src/app/services/service.service';
import { LoginComponent } from 'src/app/user/login/login.component';
import { EditMuviFormComponent } from 'src/app/user/usuario/edit-muvi-form/edit-muvi-form.component';
import { ViewMuviComponent } from '../view-muvi/view-muvi.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [NgbCarouselConfig],
})
export class IndexComponent implements OnInit, OnChanges{
  @ViewChild('carousel', {static : true}) carousel: NgbCarousel | undefined;
  peliculasList: Pelicula[] = [];
  showCarousel = true;
  // Esperar a que carguen los datos
  wait: boolean = true;
  muvisFound = true;
  constructor(private service: ServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private config: NgbCarouselConfig,
    public dialog: MatDialog,
    ) { 
      config.interval = 10000;
      config.wrap = false;
      config.keyboard = false;
      config.pauseOnHover = false;
    }

  ngOnInit(): void {
    this.carousel?.cycle();

    // Escuchar la ruta para hacer las busquedas
    this.route.queryParams.subscribe((r) => {
      if(r['titulo']){
        this.getPeliculaByTitulo(r["titulo"]);
        this.showCarousel = false;
      }
      else{
        if(r['idgenero']){
          this.getPeliculas(r['idgenero']);
          this.showCarousel = false;
        }
        else{
          this.getPeliculas('');
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }


  /** Obtiene las peliculas por id genero, si no hay las obtiene todas */
  getPeliculas(id: string){
    this.wait = true;
    this.peliculasList = [];
    this.service.getAllPeliculas(id).subscribe((peliculas) => {
      this.peliculasList = peliculas;
      this.wait = false;
      if(this.peliculasList){
        this.muvisFound = true
      }
      else{
        this.muvisFound = false

      }
    })
  }

  getPeliculaByTitulo(titulo: string){
    this.wait = true;
    this.peliculasList = [];
    this.service.buscarPelicula(titulo).subscribe((peliculas) => {
      this.peliculasList = peliculas;
      this.wait = false;
      if(this.peliculasList){
        this.muvisFound = true
      }
      else{
        this.muvisFound = false
      }
    })
  }

  // Abrir vista de la película
  openView(event: any){
    console.log(event)
    let pelicula = event.value;
    const dialogRef = this.dialog.open(ViewMuviComponent, {
      height: "550px",
      panelClass: 'dialog-container-custom',
      data: {pelicula: pelicula}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.state){
        pelicula = result.pelicula;
        let muviInList =this.peliculasList.filter(p => p.id == pelicula.id)[0];
        this.peliculasList[this.peliculasList.indexOf(muviInList)] = pelicula;
      }else{
        if(result.login){
          this.LogIn();
        }
      }
    });

  }

  LogIn(){
    this.router.navigate(["login"]);
  }

}
