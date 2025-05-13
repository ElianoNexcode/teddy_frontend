
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'welcome';

  nome = new FormControl('');
  router = inject(Router);


  entrar() {
    const nomeUsuario = this.nome.value?.trim();
    if (nomeUsuario) {
     window.sessionStorage.setItem( 'username', nomeUsuario);
       this.router.navigate(['/home/clientes']);
    }
  }
}
