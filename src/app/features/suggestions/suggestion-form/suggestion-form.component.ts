import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {

  suggestionForm!: FormGroup;
  id!: number;
  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  constructor(private fb: FormBuilder, private router: Router,private suggestionService:SuggestionService,private actR: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.suggestionForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[A-Z][a-zA-Z]*$')
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(30)
      ]],
      category: ['', Validators.required],
      date: [{ value: new Date(), disabled: true }],
      status: [{ value: 'en attente', disabled: true }]
    });
    this.id = this.actR.snapshot.params['id'];

    if (this.id) {
      this.suggestionService.getSuggestionById(this.id)
        .subscribe(data => {
          this.suggestionForm.patchValue(data);
        });
    }

  }

onSubmit(): void {

  if (this.suggestionForm.valid) {

    const formData = this.suggestionForm.getRawValue();

    if (this.id) {
      // UPDATE
      this.suggestionService.updateSuggestion(this.id, formData)
        .subscribe(() => {
          this.router.navigate(['/suggestions']);
        });
    } else {
      // ADD
      this.suggestionService.addSuggestion(formData)
        .subscribe(() => {
          this.router.navigate(['/suggestions']);
        });
    }

  }
}
}

  
