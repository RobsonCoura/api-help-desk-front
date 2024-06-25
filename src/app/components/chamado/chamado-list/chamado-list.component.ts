import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  // Dados de exemplo para a tabela
  ELEMENT_DATA: Chamado[] = []
  FILTERED_DATA: Chamado[] = []


  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes']; // Colunas exibidas na tabela
  dataSource = new _MatTableDataSource<Chamado>(this.ELEMENT_DATA);  // Fonte de dados da tabela do tipo MatTableDataSource com os dados iniciais ELEMENT_DATA


  @ViewChild(MatPaginator) paginator: MatPaginator; // ViewChild para obter a instância do paginador MatPaginator da visualizaçãoF

  constructor(
    private service: ChamadoService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  // Método para buscar um lista de chamados
  findAll(): void {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Chamado>(resposta);
      this.dataSource.paginator = this.paginator;
    });
  }

  // Método para aplicar filtro na tabela com base no evento de entrada do usuário
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; // Obtém o valor do filtro digitado pelo usuário
    this.dataSource.filter = filterValue.trim().toLowerCase();     // Aplica o filtro à fonte de dados da tabela, convertendo o valor para minúsculas e removendo espaços em branco
  }

  // Método que retorna a descrição do status com base no valor passado
  retornaStatus(status: any): string {
    if (status == '0') {
      return 'ABERTO';
    } else if (status == '1') {
      return 'EM ANDAMENTO';
    } else {
      return 'ENCERRADO';
    }
  }

  // Método que retorna a descrição do status com base no valor passado
  retornaPrioridade(prioridade: any): string {
    if (prioridade == '0') {
      return 'BAIXA';
    } else if (prioridade == '1') {
      return 'MÉDIA';
    } else {
      return 'ALTA';
    }
  }

  orderByStatus(status: any): void {
    let list: Chamado[] = []
    this.ELEMENT_DATA.forEach(element => {
      if (element.status == status)
        list.push(element)
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Chamado>(list);
    this.dataSource.paginator = this.paginator;
  }

}