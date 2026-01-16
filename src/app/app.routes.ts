import { Routes } from '@angular/router';
import { CandidatesManagerComponent } from './components/candidates-manager/candidates-manager.component';
import { CandidateDetailComponent } from './components/candidate-detail/candidate-detail.component';

export const routes: Routes = [
  { path: '', component: CandidatesManagerComponent },
  { path: 'candidate/:id', component: CandidateDetailComponent },
  { path: '**', redirectTo: '' } 
];
