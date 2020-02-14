import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../entidades/persona';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Service {


  miUrl: string = 'http://localhost:9001/api/v1/nuevabd/';


  constructor(private http: HttpClient) { }

  public personaActual: Persona = { id: 0 };

  private _obs$ = new Subject<void>();

  get observar$() {
    return this._obs$;
  }

  getAll(): Observable<Persona[]> {
    try {
      
    return this.http.get<Persona[]>(this.miUrl);
    } catch (error) {
      
      (error => console.log('HTTP Error en GETALL', error));
    }
  }
  getOne(id: number): Observable<Persona> {
    try {
       return this.http.get<Persona>(this.miUrl + id);
    } catch (error) {      
      (error => console.log('HTTP Error en GETONE', error));
    }
   
  }
  delete(id: number): Observable<any> {
    try {

      return this.http.delete(this.miUrl + id).pipe(
        tap(() => {
          this._obs$.next();
        })
      );
    } catch (error) {

      (error => console.log('HTTP Error en DELETE', error));
    }
  }
  post(persona: Persona): Observable<Persona> {
    try {
      return this.http.post<Persona>(this.miUrl, persona).pipe(
        tap(() => {
          this._obs$.next();
        })
      );
    }
    catch (error) {
      (error => console.log('HTTP Error en POST', error));

    }



  }
  put(id: number, persona: Persona): Observable<Persona> {
    try {
      return this.http.put<Persona>(this.miUrl + id, persona).pipe(
        tap(() => {
          this._obs$.next();
        })
      );
    } catch (error) {

      (error => console.log('HTTP Error en PUT', error));
    }


  }

}
