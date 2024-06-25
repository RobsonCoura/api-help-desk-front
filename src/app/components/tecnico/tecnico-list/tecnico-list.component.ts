// Importações de módulos e classes do Angular e do Material
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnico } from 'src/app/models/tecnico'; // Importa o modelo Tecnico
import { TecnicoService } from 'src/app/services/tecnico.service';

// Decorador @Component para o componente TecnicoListComponent
@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html', // Arquivo HTML de template
  styleUrls: ['./tecnico-list.component.css'] // Arquivo de estilos CSS
})
export class TecnicoListComponent implements OnInit {

  // Dados de exemplo para a tabela
  ELEMENT_DATA: Tecnico[] = []


  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes']; // Colunas exibidas na tabela
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);  // Fonte de dados da tabela do tipo MatTableDataSource com os dados iniciais ELEMENT_DATA


  @ViewChild(MatPaginator) paginator: MatPaginator; // ViewChild para obter a instância do paginador MatPaginator da visualização
  constructor(
    private service: TecnicoService
  ) { }

  // Método do ciclo de vida OnInit para inicializações adicionais
  ngOnInit(): void {
    this.findAll(); // Chama o método findAll para buscar todos os técnicos
  }

  // Método para buscar todos os técnicos do serviço
  findAll() {
    // Chama o método findAll do serviço, que retorna um Observable
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta; // Armazena a resposta (lista de técnicos) em ELEMENT_DATA
      this.dataSource = new MatTableDataSource<Tecnico>(resposta); // Cria uma nova fonte de dados para a tabela com os técnicos recebidos
      this.dataSource.paginator = this.paginator; // Define o paginador da tabela
    });
  }

  // Método para aplicar filtro na tabela com base no evento de entrada do usuário
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; // Obtém o valor do filtro digitado pelo usuário
    this.dataSource.filter = filterValue.trim().toLowerCase();     // Aplica o filtro à fonte de dados da tabela, convertendo o valor para minúsculas e removendo espaços em branco
  }


}