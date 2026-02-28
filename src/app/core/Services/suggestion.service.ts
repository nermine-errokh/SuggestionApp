import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suggestion } from '../../models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  private apiUrl = 'http://localhost:3000/suggestions';

  constructor(private http: HttpClient) {}

  // GET ALL
  getSuggestionsList(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.apiUrl);
  }

  getSuggestionById(id: number) {
  return this.http.get<Suggestion>(
    `${this.apiUrl}/${id}`
  );
}

  
  addSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    return this.http.post<Suggestion>(this.apiUrl, suggestion);
  }

  deleteSuggestion(id: number) {
  return this.http.delete(
    `${this.apiUrl}/${id}`
  );
}
updateSuggestion(id: number, suggestion: Suggestion) {
  return this.http.put(
    `${this.apiUrl}/${id}`,
    suggestion
  );
}

likeSuggestion(id: number) {
  return this.http.post(
    `${this.apiUrl}/${id}/like`,
    {}
  );
}
}