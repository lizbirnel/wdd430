import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../movie-service.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.css'],
})
export class MovieGridComponent implements OnInit, OnDestroy {
  movies: Movie[];
  subscription: Subscription;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.movies = this.movieService.getMovies();
    this.movieService.movieChangedEvent.subscribe((newMovies: Movie[]) => {
      this.movies = newMovies;
    });
    this.subscription = this.movieService.movieGridChangedEvent.subscribe(
      (moviesGrid: Movie[]) => {
        this.movies = moviesGrid;
      }
    );
  }

  onNewMovie() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
