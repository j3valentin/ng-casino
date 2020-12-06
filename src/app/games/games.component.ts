import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { SlideInOutAnimation } from '../shared/animations/animations';

import { Game } from '../shared/model/game.model';
import { GamesService } from './games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: [ './games.component.scss' ],
  animations: [ SlideInOutAnimation ]
})
export class GamesComponent implements OnInit, OnDestroy {

  games: Game[] = [];

  unsubscribe: Subject<void> = new Subject();

  constructor(
    private gameService: GamesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    let categorySlug = this.route.snapshot.params.category;

    this.router.events.pipe(
      filter((res: any) => res != null && res.url && res.navigationTrigger != null),
      map((res: any) => res != null ? res.url.replace('/', '') : categorySlug),
      switchMap(res => this.gameService.getGamesByCategory(res)),
      takeUntil(this.unsubscribe)
    )
      .subscribe((gamesResponse: any) =>
        this.games = gamesResponse
      );

    this.gameService.getGamesByCategory(categorySlug)
      .subscribe((gamesResponse: Game[]) => {
        this.games = gamesResponse;
        console.log(gamesResponse);
      });
  }


  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
