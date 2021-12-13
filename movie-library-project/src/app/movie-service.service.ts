import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Movie } from './movie.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  moviesChanged = new Subject<Movie[]>();

  private movies: Movie[] = [];

  movieGridChangedEvent = new Subject<Movie[]>();

  movieChangedEvent = new EventEmitter<Movie[]>();
  maxMovieId: number;

  constructor(private http: HttpClient) {
    this.maxMovieId = this.getMaxId();
  }

  setMovies(newMovies: Movie[]) {
    this.movies = newMovies;
    this.moviesChanged.next(this.movies.slice());
  }

  getMovies() {
    this.http.get('http://localhost:3000/api/movies').subscribe(
      (movies: Movie[]) => {
        // if (movies.length == 0) {
        //   return;
        // }
        this.movies = movies;
        this.maxMovieId = this.getMaxId();
        this.movies.sort((a: Movie, b: Movie) => {
          if (a.title === b.title) {
            return 0;
          }
          return a.title > b.title ? 1 : -1;
        });
        this.movieGridChangedEvent.next(this.movies.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );

    return this.movies.slice();
  }

  getMovie(index: number) {
    return this.movies[index];
  }

  addMovie(movie: Movie) {
    if (!movie) {
      return;
    }
    this.maxMovieId++;
    movie.id = this.maxMovieId.toString();

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{ message: String; movie: Movie }>(
        'http://localhost:3000/api/movies',
        movie,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.movies.push(responseData.movie);
        let movieGridClone = this.movies.slice();
        this.movieGridChangedEvent.next(movieGridClone);
      });

    // this.movies.push(movie);
    // this.moviesChanged.next(this.movies.slice());
  }

  updateMovie(index: number, newMovie: Movie) {
    if (!this.movies[index] || !newMovie) {
      return;
    }
    newMovie.id = this.movies[index].id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(
        'http://localhost:3000/api/movies/' + this.movies[index].id,
        newMovie,
        { headers: headers }
      )
      .subscribe((response: Response) => {
        this.movies[index] = newMovie;
        this.moviesChanged.next(this.movies.slice());
        this.movieGridChangedEvent.next(this.movies.slice());
      });
  }

  deleteMovie(index: number) {
    if (!this.movies[index]) {
      return;
    }
    this.http
      .delete('http://localhost:3000/api/movies/' + this.movies[index].id)
      .subscribe((response: Response) => {
        this.movies.splice(index, 1);
        this.moviesChanged.next(this.movies.slice());
      });
  }

  getMaxId(): number {
    let maxId = 0;

    for (let movie of this.movies) {
      let currentId = parseInt(movie.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}
