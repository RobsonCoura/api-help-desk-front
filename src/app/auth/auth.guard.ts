import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'  // Define que este guard é provido a nível de aplicação.
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,  // Injeta o serviço de autenticação.
    private router: Router  // Injeta o serviço de roteamento.
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,  // O snapshot da rota atual.
    state: RouterStateSnapshot  // O estado atual do roteador.
  ): boolean {
    let authenticated = this.authService.isAuthenticated();  // Verifica se o usuário está autenticado.

    if (authenticated) {
      return true;  // Permite a navegação se autenticado.
    } else {
      this.router.navigate(['login']);  // Redireciona para a página de login se não autenticado.
      return false;  // Impede a navegação se não autenticado.
    }
  }

}
