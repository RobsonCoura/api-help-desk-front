import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard'; // Importa o guarda de autenticação
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';
import { ChamadoCreateComponent } from './components/chamado/chamado-create/chamado-create.component';
import { ChamadoUpdateComponent } from './components/chamado/chamado-update/chamado-update.component';
import { ChamadoReadComponent } from './components/chamado/chamado-read/chamado-read.component';

// Definição das rotas da aplicação
const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Rota para o componente de login

  // Rota principal, associada ao componente NavComponent e protegida pelo AuthGuard
  {
    path: '', // Define o caminho da rota como vazio, indicando a rota raiz.
    component: NavComponent, // Associa o componente NavComponent a este caminho da rota.
    canActivate: [AuthGuard], // Protege a rota usando o AuthGuard
    children: [
      { path: 'home', component: HomeComponent }, // Rota filha para o componente Home
      { path: 'tecnicos', component: TecnicoListComponent }, // Rota filha para o componente TecnicoListComponent
      { path: 'tecnicos/create', component: TecnicoCreateComponent }, // Rota filha para o componente TecnicoListComponent
      { path: 'tecnicos/update/:id', component: TecnicoUpdateComponent },
      { path: 'tecnicos/delete/:id', component: TecnicoDeleteComponent },

      { path: 'clientes', component: ClienteListComponent }, // Rota filha para o componente TecnicoListComponent
      { path: 'clientes/create', component: ClienteCreateComponent }, // Rota filha para o componente TecnicoListComponent
      { path: 'clientes/update/:id', component: ClienteUpdateComponent },
      { path: 'clientes/delete/:id', component: ClienteDeleteComponent },

      { path: 'chamados', component: ChamadoListComponent},
      { path: 'chamados/create', component: ChamadoCreateComponent},
      { path: 'chamados/update/:id', component: ChamadoUpdateComponent},
      { path: 'chamados/read/:id', component: ChamadoReadComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configuração do módulo de roteamento com as rotas definidas
  exports: [RouterModule] // Exporta o módulo de roteamento para ser utilizado na aplicação
})
export class AppRoutingModule { }
