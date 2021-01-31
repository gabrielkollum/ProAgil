import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {


  eventos : any = [
    {
      EventoId: 1,
      Tema: 'Angular',
      Local: 'Belo Horizonte'
    },
    {
      EventoId: 2,
      Tema: 'Dotnet',
      Local: 'Rio de Janeiro'
    },
    {
      EventoId: 3,
      Tema: 'Angular e Dotnet',
      Local: 'São Paulo'
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
