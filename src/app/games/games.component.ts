import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { SlideInOutAnimation } from '../shared/animations/animations';

import { Game } from '../shared/model/game.model';
import { GamesService } from './games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  animations: [SlideInOutAnimation]
})
export class GamesComponent implements OnInit, OnDestroy {

  games: Game[] = [];

  unsubscribe: Subject<void> = new Subject();

  constructor(
    private gameService: GamesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const categorySlug = this.route.snapshot.params.category;
    if (categorySlug) {
      this.loadGamesByCategory(categorySlug);
    } else {
      this.loadGamesBySearchTerm(this.route.snapshot.params.searchTerm);
    }
  }

  loadGamesByCategory(categorySlug: string): void {
    this.router.events.pipe(
      filter((res: any) => res != null && res.url && res.navigationTrigger != null),
      map((res: any) => res != null ? res.url.replace('/', '') : categorySlug),
      switchMap(res => this.gameService.getGamesByCategory(res)),
      takeUntil(this.unsubscribe)
    ).subscribe((games: any) => this.games = games);

    this.gameService.getGamesByCategory(categorySlug)
      .subscribe((games: Game[]) => this.games = games);
  }

  loadGamesBySearchTerm(searchTerm: string): void {
    this.gameService.searchGames(searchTerm)
      .subscribe((games: Game[]) => this.games = games);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
