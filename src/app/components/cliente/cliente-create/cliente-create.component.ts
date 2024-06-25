import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

// Decorador Component indicando que é um componente Angular
@Component({
  selector: 'app-cliente-create', // Seletor usado nos templates HTML
  templateUrl: './cliente-create.component.html', // Arquivo de template para o componente
  styleUrls: ['./cliente-create.component.css'] // Folhas de estilo para o componente
})
export class ClienteCreateComponent implements OnInit {

  // Objeto que representa os dados do cliente a ser criado
  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  // Controles de formulário para nome, cpf, email e senha
  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: ClienteService, // Serviço para interação com dados de clientes
    private toast: ToastrService, // Serviço para notificações/toasts
    private router: Router, // Serviço para navegação
  ) { }

  ngOnInit(): void {
    // Hook de ciclo de vida, lógica de inicialização pode ser colocada aqui
  }

  create(): void {
    this.service.create(this.cliente).subscribe(() => {
      this.toast.success('Cliente cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['clientes'])
    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.massage);
        });
      } else {
        this.toast.error(ex.error.massage);
      }
    })
  }

  // Adiciona ou remove um perfil do cliente
  addPerfil(perfil: any): void {
    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    } else {
      this.cliente.perfis.push(perfil);
    }
  }

  // Método para verificar se todos os campos do formulário são válidos
  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }
}
