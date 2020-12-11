import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Games Lobby';

  constructor(private router: Router) { }

  search(searchTerm: string): void {
    if (searchTerm) {
      this.router.navigate(['/search', searchTerm]);
    }
  }
}
