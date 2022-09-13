import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Route, Router } from '@angular/router';
import { Pelicula } from 'src/app/models/PeliculaDTO';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  peliculasList: Pelicula[] = [];
  currentNavigation: any;

  constructor(private service: ServiceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.currentNavigation = this.route.snapshot.paramMap.get('id');
    this.getPeliculas();
    this.loadListeners();
  }

  loadListeners(){
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if(this.currentNavigation !== event.id){
          this.currentNavigation = event.id;
          this.getPeliculas();
        }
      }
    });
  }

  /** Obtiene las peliculas por id genero, si no hay las obtiene todas */
  getPeliculas(){
    var id: any = this.currentNavigation;
    this.service.getAllPeliculas(id === null?'': id).subscribe((peliculas) => {
      this.peliculasList = peliculas;
    })
  }

}
