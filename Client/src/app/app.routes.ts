import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { PagenotfoundComponent } from './components/page-not-found/pagenotfound.component';

export const routes: Routes = [
  { path: '', redirectTo: '/main-component', pathMatch: 'full' },
  { path: 'main-component', component: MainComponent },
  { path: '**', component: PagenotfoundComponent },
];