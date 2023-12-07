import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { PagenotfoundComponent } from './components/page-not-found/pagenotfound.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: '**', component: PagenotfoundComponent },
];
