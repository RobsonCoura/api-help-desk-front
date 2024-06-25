// Importações de módulos necessários para o componente
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

// Definição do componente Angular
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Inicialização das credenciais do usuário
  creds: Credenciais = {
    email: '',
    senha: ''
  };

  // Controle de formulário para o campo de email com validação de email
  email = new FormControl(null, Validators.email);
  // Controle de formulário para o campo de senha com validação de tamanho mínimo
  senha = new FormControl(null, Validators.minLength(3));

  // Injeção de serviços necessários no componente
  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Método do ciclo de vida OnInit para inicializações adicionais, se necessário
  }

  // Método para realizar o login do usuário
  logar() {
    this.service.authenticate(this.creds).subscribe(
      resposta => {
        // Caso o login seja bem-sucedido, realiza o processamento
        this.service.successfulLogin(resposta.headers.get('Authorization').substring(7));
        this.router.navigate(['']);  // Navega para a rota principal após o login
      },
      () => {
        // Em caso de erro no login, exibe uma mensagem de erro ao usuário
        this.toast.error('Usuário e/ou senha inválidos');
      }
    );
  }

  // Verifica se os campos de email e senha são válidos para habilitar o botão de login
  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }
}
