
import { Component, OnInit, Input } from '@angular/core';
import { Persona } from 'src/app/entidades/persona';
import { Service } from '../servicios/service';


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']

})
export class TablaComponent implements OnInit {
  personas: Persona[] = [];

 
  constructor(private servicio: Service) {
  }

  ngOnInit() {
    this.servicio.observar$.subscribe(()=>{
       this.getAll();
    });
    
    this.getAll();
  }



  getAll() {
    this.servicio.getAll().subscribe((data) => {
      this.personas = data;
    }
    );
  }

  delete(id: number) {
    const opcion = confirm('Eliminar el registro?' );

    if (opcion == true) {   

      this.servicio.delete(id).subscribe((data) => {
        alert('Registro eliminado');
      });
    }
  }

  onPreUpdate(persona: Persona) {
    this.servicio.personaActual = Object.assign({}, persona);
  }
  
  agregar() {
    this.servicio.personaActual.id = 0;
  }

}