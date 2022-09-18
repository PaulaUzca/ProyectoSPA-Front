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
  currentNavigation: any;
  showCarousel = true;
  // Esperar a que carguen los datos
  wait: boolean = true;
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
    this.currentNavigation = this.route.snapshot.paramMap.get('id');
    this.getPeliculas();
    this.loadListeners();
    this.carousel?.cycle();
  }

  /** Cargar listeners */
  loadListeners(){

    // Escuchar cambios en la url para mostrar peliculas por genero
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart){ 
        var id = event.url.match(/\d+/);
        var nav = id != null? id : '';
        if(this.currentNavigation != nav){
          this.showCarousel = false;
          this.currentNavigation = nav;
          this.getPeliculas();
        }
      }
    });
  }

  /** Obtiene las peliculas por id genero, si no hay las obtiene todas */
  getPeliculas(){
    this.wait = true;
    this.peliculasList = [];
    var id: any = this.currentNavigation;
    this.service.getAllPeliculas(id === null?'': id).subscribe((peliculas) => {
      this.peliculasList = peliculas;
      this.wait = false;
    })
  }

}
