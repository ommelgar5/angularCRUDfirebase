import { Component, OnInit } from '@angular/core';
import { HeroeService } from '../../services/heroe.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando: boolean;

  constructor( private heroeService: HeroeService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.heroeService.getHeroes().subscribe( heroes => {
      this.heroes = heroes;
      this.cargando = false;
     });
  }

  borrar(heroe: HeroeModel, indice: number){

    // El Swal.fire() retorna un promesa
    Swal.fire({
      icon: 'question',
      title:'¿Está seguro?',
      text: `Está seguro de eliminar a ${ heroe.nombre }`,
      showConfirmButton: true,
      showCancelButton: true,
      allowOutsideClick: false
    })
    .then( respuesta => {
      if(respuesta.value){
        this.heroes.splice(indice, 1);
          this.heroeService.borrarHeroe(heroe.id)
                .subscribe();
      }
    });
  }

}
