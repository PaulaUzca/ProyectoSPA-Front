import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Route, Router } from '@angular/router';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Pelicula } from 'src/app/models/PeliculaDTO';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [NgbCarouselConfig],
})
export class IndexComponent implements OnInit {
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
    ) { 
      config.interval = 10000;
      config.wrap = false;
      config.keyboard = false;
      config.pauseOnHover = false;
    }

  ngOnInit(): void {
    this.carousel?.cycle();
    this.getPeliculas('');

    // Escuchar la ruta para hacer las busquedas
    this.route.queryParams.subscribe((r) => {
      console.log(r)
      if(r['titulo']){
        this.getPeliculaByTitulo(r["titulo"]);
        this.showCarousel = false;
      }

      else{

        if(r['idgenero']){
          this.getPeliculas(r['idgenero']);
          this.showCarousel = false;
        }
      }
    });
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

}
