import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CandidatesService } from '../../services/candidates-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidates-manager',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './candidates-manager.component.html',
  styleUrls: ['./candidates-manager.component.less']
})
export class CandidatesManagerComponent implements OnInit {
  candidateForm: FormGroup;
  selectedFile: File | null = null;
  candidates: any[] = [];
  selectedCandidate: any = null;

  constructor(
    private fb: FormBuilder,
    private candidatesService: CandidatesService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {
    
    this.candidateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      file: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.refreshList();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.candidateForm.patchValue({ file: file });
      this.candidateForm.get('file')?.updateValueAndValidity();
    }
  }

  save() {
    if (this.candidateForm.valid && this.selectedFile) {
      const { name, surname } = this.candidateForm.value;
      
      this.candidatesService.uploadCandidate(this.selectedFile, name, surname)
        .subscribe({
          next: (nuevoCandidato) => {

            this.candidates = [...this.candidates, nuevoCandidato];
            this.candidateForm.reset();
            this.selectedFile = null;
            this.refreshList();
        },
        error: (err) => console.error('Error al guardar:', err)
      });
    }
  }

  refreshList() {
    this.candidatesService.findAll().subscribe(data => {
      this.candidates = data;
      this.cdRef.detectChanges();
    });
  }

  verDetalle(id: string) {
    this.router.navigate(['/candidate', id]);
  }

}