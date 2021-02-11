import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';
import { defineLocale, ptBrLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
defineLocale('pt-br', ptBrLocale);


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  
  titulo = 'Eventos';
  imagemLargura = 50;
  imagemMargem = 20;
  eventosFiltrados: Evento[];
  eventos : Evento[];
  evento : Evento;
  mostrarImagem: boolean = false;
  registerForm: FormGroup;
  operacao = '';
  message: string;
  
  _filtroLista= '';

  get filtroLista(): string {
    return this._filtroLista;
  }

  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEvento(this.filtroLista) : this.eventos;
  }


  constructor(
    private toastr: ToastrService,
    private eventoService: EventoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService
    ) { 
      this.localeService.use('pt-br')
    }

  ngOnInit() {
    this.validation();
    this.getEventos();
  }

  deleteEvento(evento: Evento, template: any){
    this.message = `tem certeza que deseja excluir o evento: ${evento.tema} de código: ${evento.id} ?`;
    this.evento = evento;
    this.openModal(template);
  }

  confirmarDelete(template: any){
    this.eventoService.deletarEvento(this.evento.id).subscribe(
      () => {
      template.hide();
      this.toastr.success('Evento excluído com sucesso!', '', {timeOut: 2000});
      this.getEventos();
      }, error =>{
        this.toastr.error(`Erro ao deletar ${error}`, '', {timeOut: 2000});
       console.error(error)
    }
    );    
    
  }


  editarEvento(_evento: Evento,template: any){
    this.operacao = 'put';
    this.evento = _evento;
    this.openModal(template);
    this.registerForm.patchValue(this.evento);

  }

  novoEvento(template:any){
    this.operacao = 'post';
    this.openModal(template);
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
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

  validation(){
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      img: ['', Validators.required],
      qtdPessoas: ['',[Validators.required, Validators.max(10000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]

    });
  }

  salvarAlteracao(template: any){
    if(this.registerForm.valid){

      if(this.operacao === 'put'){
      this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
      this.eventoService.putEvento(this.evento).subscribe(
       () => {
         template.hide();
         this.toastr.success('Operação realizada com sucesso!', '', {timeOut: 2000});
         this.getEventos();
       }, error => {
        this.toastr.error(`Erro ao atualizar evento:  ${error}`, '', {timeOut: 2000});
         console.log(error);
       }
       );
      } else{
        this.evento = Object.assign({}, this.registerForm.value);
        this.eventoService.postEvento(this.evento).subscribe(
         (novoEvento: Evento) => {
           console.log(novoEvento);
           template.hide();
           this.toastr.success('Operação realizada com sucesso!', '', {timeOut: 2000});
           this.getEventos();
         }, error => {
          this.toastr.error(`Erro ao criar evento:  ${error}`, '', {timeOut: 2000});
           console.log(error);
         }
         );

      }
    }

  }

  getEventos() {
   this.eventoService.getAllEvento().subscribe(
     (_eventos: Evento[]) => {
       this.eventos = _eventos;
       this.eventosFiltrados = this.eventos;
     }, error => {
      this.toastr.error(`Erro ao tentar carregar eventos:  ${error}`, '', {timeOut: 2000});
     });
  }

}
