import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  imagemLargura = 50;
  imagemMargem = 20;
  eventosFiltrados: Evento[];
  eventos : Evento[];
  mostrarImagem: boolean = false;
  modalRef: BsModalRef;
  
  _filtroLista = '';

  get filtroLista(): string {
    return this._filtroLista;
  }

  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEvento(this.filtroLista) : this.eventos;
  }


  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getEventos();
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  filtrarEvento(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  alterarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  getEventos() {
   this.eventoService.getAllEvento().subscribe(
     (_eventos: Evento[]) => {
       this.eventos = _eventos;
       console.log(_eventos);
     }, error => {
       console.log(error);
     });
  }

}
