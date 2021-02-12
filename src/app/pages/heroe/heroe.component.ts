import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { HeroeModel } from '../../models/heroe.model';
import { HeroeService } from '../../services/heroe.service';

import Swal  from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor(  private heroeService: HeroeService,
                private route: ActivatedRoute ) { }


  ngOnInit(): void {
   const id =  this.route.snapshot.paramMap.get('id');

   if(id !== 'nuevo'){
      this.heroeService.getHeroe(id)
          .subscribe( (heroe: HeroeModel) => {
            this.heroe = heroe;
            this.heroe.id = id;
          });
   }

  }



  guardar(form: NgForm){

    if(form.invalid){
      console.log('Formulario invalido');
      return Object.values( form.controls ).forEach(control => control.markAsTouched());
    }

    Swal.fire({
      icon: 'info',
      title: 'Espere',
      text: 'Guardando informacion',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let respuesta: Observable<any>;

    // console.log(form);
    // console.log(this.heroe);

    if(this.heroe.id ){
      respuesta = this.heroeService.actualizarHeroe(this.heroe);
    }else{
      respuesta = this.heroeService.crearHeroe(this.heroe);

          // .subscribe( httpRespuesta => {
          //   console.log(httpRespuesta);

           /*
           Como retorna un heroe se puede igualar
            this.heroe = httpRespuesta;

            Pero como el JS los objetos se pasan por referencia,
            Eviamos el objeto y se mofifica en el servicio, por ende los cambios
            se ven reflejados en el componente

            */
      }

      respuesta.subscribe( httpRespuesta => {
        Swal.fire({
          icon: 'success',
          title: this.heroe.nombre,
          text: 'Se actualizó correctamente'
        });
      });

    }


}
