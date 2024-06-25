import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {


  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []

  // Definição dos controles de formulário com validações
  prioridade: FormControl = new FormControl(null, [Validators.required])
  status: FormControl = new FormControl(null, [Validators.required])
  titulo: FormControl = new FormControl(null, [Validators.required])
  observacoes: FormControl = new FormControl(null, [Validators.required])
  tecnico: FormControl = new FormControl(null, [Validators.required])
  cliente: FormControl = new FormControl(null, [Validators.required])

  // Construtor do componente
  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toastService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  // Método do ciclo de vida do Angular que é chamado após a inicialização do componente
  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
  }

  // Método para busca um chamado pelo seu ID
  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  // Cadastra um novo chamado
  update(): void {
    this.chamadoService.update(this.chamado).subscribe(
      resposta => {
        this.toastService.success('Chamado atualizado com sucesso!', 'Atualizar chamado');
        this.router.navigate(['chamados']);
      },
      ex => {
        this.toastService.error(ex.error.error, 'Erro ao criar chamado');
      }
    );
  }

  // Busca por todos os clientes
  findAllClientes(): void {
    this.clienteService.findAll().subscribe(
      resposta => {
        this.clientes = resposta;
      }
    );
  }

  // Busca por todos os técnicos
  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(
      resposta => {
        this.tecnicos = resposta;
      }
    );
  }

  // Método para validar se todos os campos do formulário são válidos
  validaCampos(): boolean {
    return this.prioridade.valid && this.status.valid &&
      this.titulo.valid && this.observacoes.valid &&
      this.tecnico.valid && this.cliente.valid
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
}

