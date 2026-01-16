import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { CandidatesService } from '../../services/candidates-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-candidate-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.less']
})
export class CandidateDetailComponent implements OnInit {
  candidate: any = null;
  candidateForm: FormGroup;
  isEditing: boolean = false;

  seniorityOptions = ['Junior', 'Senior'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private candidatesService: CandidatesService,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef
  ) {

    this.candidateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      seniority: ['', Validators.required],
      years: [0, [Validators.required, Validators.min(0)]],
      availability: [false]
    });

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.candidatesService.findOne(id).subscribe({
        next: (data) => {
          this.candidate = data;
          this.cdRef.detectChanges();
        },
        error: (err) => {
          console.error('Error al recuperar el candidato:', err);
          this.snackBar.open('No se pudo cargar la información', 'Cerrar', { duration: 3000 });
          this.backToList();
        }
      });
    }
  }

  deleteCandidate(): void {
    const id = this.route.snapshot.paramMap.get('id');
      if(!confirm('¿Estás seguro de que deseas eliminar este candidato?')) {
        return;
      }

      this.candidatesService.deleteCandidate(String(id)).subscribe({
        next: () => {
          this.snackBar.open('Candidato eliminado exitosamente', 'Cerrar', { duration: 3000 });
          this.backToList();
        },
        error: (err) => {
          console.error('Error al eliminar el candidato:', err);
          this.snackBar.open('No se pudo eliminar el candidato', 'Cerrar', { duration: 3000 });
        }
      });
  }

  backToList(): void {
    this.router.navigate(['/']);
  }

  toggleEdit() {
  this.isEditing = true;
  this.candidateForm.patchValue({
    name: this.candidate.name,
    surname: this.candidate.surname,
    seniority: this.candidate.seniority,     
    years: this.candidate.years,             
    availability: this.candidate.availability 
  });
}

  cancelEdit() {
    this.isEditing = false;
    this.candidateForm.reset();
  }

  updateCandidate() {
    if (this.candidateForm.valid) {
      const id = this.candidate._id;
      const updatedData = this.candidateForm.value;

      this.candidatesService.updateCandidate(id, updatedData).subscribe({
        next: (res) => {
          this.candidate = res;
          this.isEditing = false;
          this.snackBar.open('Candidato actualizado con éxito', 'OK', { duration: 3000 });
        },
        error: (err) => console.error('Error al actualizar:', err)
      });
    }
  }
}