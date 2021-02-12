import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { delay, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroeService {

  /*

    La terminacion en la URL .json es propio de la API REST de firebase

  */

  private url = 'https://loginapp-49cbc-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }



  crearHeroe( heroe: HeroeModel ){
    // Retorna el ID del Heroe agregado
    return this.http.post(`${ this.url }/heroes.json`, heroe )
            .pipe( map( (httpRespuesta: any) => {
              heroe.id = httpRespuesta.name;
              return heroe;
            }));
  }



  actualizarHeroe( heroe: HeroeModel) {

    /*
    Si se envia a Firebase la propieda ID se genera una propiedad id
    por eso se elimina antes de enviar la data a la actualización
    */

    // Rompemos la referencia del objeto
    const heroeTemp = { ...heroe };
    delete heroeTemp.id;

    // Retorna el objeto actualizado
    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTemp);

  }

  borrarHeroe(id: string){
    return this.http.delete(`${ this.url }/heroes/${ id }.json`);
  }



  getHeroe(id: string ){
    return this.http.get(`${ this.url }/heroes/${ id }.json`);
  }


  /*
  map( this.crearAreglo ) -> el primer argumento que recibe map() es pasado al callback
                              es igual a map( (respuesta) => this.crearAreglo(respuesta));

  delay(ms) Retardo en mostrar la informacion
  */
  getHeroes(){
    return this.http.get(`${ this.url }/heroes.json`)
            .pipe( map(this.crearAreglo),
                   delay(500));

  }




  private crearAreglo( heroesObj: object ){

    /*

    Cada objeto es retornado de esta forma
    -MTJumwco-LrlfZxsvND : {
      nombre: "Iroman"
      poder: "Dinero"
      vivo: false
    }

    */

    let heroes: HeroeModel[] = [];

    if( heroesObj === null ) return [];

    // Obtener las llave del objeto
    Object.keys( heroesObj ).forEach( key => {

      // la propiedad id no esta definida
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });

    return heroes;
  }

}
