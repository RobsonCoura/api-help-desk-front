import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

// Decorador Component indicando que é um componente Angular
@Component({
  selector: 'app-tecnico-create', // Seletor usado nos templates HTML
  templateUrl: './tecnico-create.component.html', // Arquivo de template para o componente
  styleUrls: ['./tecnico-create.component.css'] // Folhas de estilo para o componente
})
export class TecnicoCreateComponent implements OnInit {

  // Objeto que representa os dados do técnico a ser criado
  tecnico: Tecnico = {
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
    private service: TecnicoService, // Serviço para interação com dados de técnicos
    private toast: ToastrService, // Serviço para notificações/toasts
    private router: Router, // Serviço para navegação
  ) { }

  ngOnInit(): void {
    // Hook de ciclo de vida, lógica de inicialização pode ser colocada aqui
  }

  create(): void {
    this.service.create(this.tecnico).subscribe(() => {
      this.toast.success('Técnico cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['tecnicos'])
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

  // Adiciona ou remove um perfil do técnico
  addPerfil(perfil: any): void {
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    } else {
      this.tecnico.perfis.push(perfil);
    }
  }

  // Método para verificar se todos os campos do formulário são válidos
  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }
}
