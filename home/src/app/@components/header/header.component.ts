
import { Component } from '@angular/core';
import { SideNavigationComponent } from '../side-navigation/side-navigation.component';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [SideNavigationComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuSelecionado: string = 'clientes';
  isSideNavOpen = false;
  usuarioNome: string = '';

  constructor(private router: Router) {
    this.usuarioNome = window.sessionStorage.getItem('username') as string;
  }

  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
  }

  onSideNavClosed() {
    this.isSideNavOpen = false;
  }

  selectMenu(menu: string) {
    this.menuSelecionado = menu;

    switch(menu) {
      case 'clientes':
        this.router.navigate(['/home/clientes']);
        break;
      case 'clientes-selecionados':
        this.router.navigate(['/home/clientes'], {queryParams: {"selected": true}});
        break;
      case 'sair':
        window.location.href = '/';
        break;
    }
  }

}
