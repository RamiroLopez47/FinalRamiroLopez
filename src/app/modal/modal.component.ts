
import { TablaComponent } from './../tabla/tabla.component';
import { Service } from './../servicios/service';
import { Persona } from './../entidades/persona';
import { Component, OnInit, ElementRef, ViewChild, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ValidatorFn, ValidationErrors, } from '@angular/forms'
import { EventEmitter } from 'protractor';
import { dirname } from 'path';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {

  persona: FormGroup;
  usuario: Persona = {};
  tabla: TablaComponent;
  constructor(public servicio: Service, private formBuilder: FormBuilder) {

    this.persona = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl('', { validators: [Validators.required, Validators.pattern('[a-zA-Z ]*'),Validators.minLength(2)] }),
      'apellido': new FormControl('', { validators: [Validators.required,Validators.pattern('[a-zA-Z ]*'),Validators.minLength(2)] }),
      'edad': new FormControl(0, { validators: [Validators.required,Validators.pattern('[0-9]*'),Validators.maxLength(2)] }),
      'dni': new FormControl(0, { validators: [Validators.required,Validators.pattern('[0-9]*'),Validators.maxLength(9)] }),
    });
  }

  @ViewChild('btnClose', { static: true }) btnClose: ElementRef


  ngOnInit() {
    
  }


  getOne(id: number) {
    this.servicio.getOne(id).subscribe(data => {
      this.usuario = data;
    });
  }

  save() {  
    if (this.servicio.personaActual.id == 0) {
      this.usuario = this.persona.value;
      this.add();
    }
    else {
      this.usuario = this.persona.value;      
      this.update(this.servicio.personaActual.id);
    }
  }

  add() {
    this.servicio.post(this.usuario).subscribe(data => {      
    this.usuario = data;  
    });
  }

  update(id: number) {
    
    this.servicio.put(id, this.usuario).subscribe(data => {
      this.usuario = data;

    });
    
  }

  onReset(personaFG: FormGroup) {
    personaFG.reset();
    this.btnClose.nativeElement.click();
  }



}
