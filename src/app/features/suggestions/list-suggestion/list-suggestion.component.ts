import { Component } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { ActivatedRoute } from '@angular/router';
import { SuggestionService } from '../../../core/Services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrl: './list-suggestion.component.css'
})
export class ListSuggestionComponent {
favorites: Suggestion[] = [];
searchText: string = '';
suggestions: Suggestion[]=[];

constructor(private suggestionService:SuggestionService){}
ngOnInit(): void {
  this.suggestionService.getSuggestionsList()
    .subscribe((data: Suggestion[]) => {
      this.suggestions = data;
    });
  }
  likeSuggestion(s: Suggestion) {
    this.suggestionService.likeSuggestion(s.id)
      .subscribe(() => {
        s.nbLikes = (s.nbLikes ?? 0) + 1;
      });
  }

addToFavorites(s: Suggestion) {
  if (!this.favorites.includes(s)) {
    this.favorites.push(s);
  }
}

filteredSuggestions() {
  return this.suggestions.filter(s =>
    s.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
    s.category.toLowerCase().includes(this.searchText.toLowerCase())
  );
}
deleteSuggestion(id: number): void {
  this.suggestionService.deleteSuggestion(id)
    .subscribe(() => {
      this.suggestions = this.suggestions.filter(s => s.id !== id);
    });
}


}
