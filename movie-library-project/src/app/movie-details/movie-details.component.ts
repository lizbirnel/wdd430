import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../movie-service.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie;
  id: number;
  subscription: Subscription;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.movie = this.movieService.getMovie(this.id);
    });
    this.movieService.movieChangedEvent.subscribe((newMovies: Movie[]) => {
      this.movie = newMovies[this.id];
    });
    this.subscription = this.movieService.movieGridChangedEvent.subscribe(
      (moviesGrid: Movie[]) => {
        this.movie = moviesGrid[this.id];
      }
    );
  }

  onEditMovie() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteMovie() {
    this.movieService.deleteMovie(this.id);
    this.router.navigate(['/movies']);
  }
}
