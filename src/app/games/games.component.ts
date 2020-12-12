import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable, EMPTY } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SlideInOutAnimation } from '../shared/animations/animations';
import { Game } from '../shared/model/game.model';
import { GamesService } from './games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  animations: [SlideInOutAnimation]
})
export class GamesComponent implements OnInit {

  games: Game[] = [];
  games$: Observable<Game[]> = EMPTY;

  constructor(
    private gameService: GamesService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.games$ = this.route.paramMap.pipe(
      switchMap(params => {
        const category = params.get('category');
        const searchTerm = params.get('searchTerm');
        if (category) {
          return this.gameService
            .getGamesByCategoryGraphQL(category);
        } else if (searchTerm) {
          return this.gameService.searchGames(searchTerm);
        }
        return EMPTY
      })
    );
  }
}
