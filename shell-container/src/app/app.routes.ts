import { loadRemoteModule } from '@angular-architects/module-federation'
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'welcome',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'https://welcome-coral.vercel.app/remoteEntry.js',
        exposedModule: './Component',
      }).then((m) => m.AppComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
         remoteEntry: 'https://home-teddy.vercel.app/remoteEntry.js',
        exposedModule: './Component',
      }).then((m) => m.AppComponent),
    loadChildren: () => [
      {
        path: 'clientes',
        loadComponent: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: 'https://cliente-teddyy.vercel.app/remoteEntry.js', 
            exposedModule: './Component',
          }).then((m) => m.AppComponent),
      },
      { path: '', redirectTo: 'clientes', pathMatch: 'full' },
    ]
  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
];
