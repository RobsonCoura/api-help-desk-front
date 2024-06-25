// Importa Component e OnInit do pacote '@angular/core'
import { Component, OnInit } from '@angular/core';

// Declaração do componente HomeComponent
@Component({
  // Seleciona o seletor CSS para o componente
  selector: 'app-home',
  // Define o arquivo HTML de template para o componente
  templateUrl: './home.component.html',
  // Define o arquivo de estilos CSS para o componente
  styleUrls: ['./home.component.css']
})
// Classe HomeComponent que implementa a interface OnInit
export class HomeComponent implements OnInit {

  // Construtor do componente HomeComponent
  constructor() { }

  // Método do ciclo de vida OnInit que é executado quando o componente é inicializado
  ngOnInit(): void {
  }

}
