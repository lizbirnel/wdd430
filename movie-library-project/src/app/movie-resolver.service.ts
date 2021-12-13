import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MovieService } from './movie-service.service';
import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieResolverService implements Resolve<Movie[]> {
  constructor(private movieService: MovieService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Movie[] | Observable<Movie[]> | Promise<Movie[]> {
    const movies = this.movieService.getMovies();
    return movies;
  }
}
