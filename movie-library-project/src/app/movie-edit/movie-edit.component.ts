import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieService } from '../movie-service.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css'],
})
export class MovieEditComponent implements OnInit {
  id: number;
  editMode = false;
  movieForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.movieService.updateMovie(this.id, this.movieForm.value);
    } else {
      this.movieService.addMovie(this.movieForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  private initForm() {
    let movieTitle = '';
    let movieImageUrl = '';
    let movieDescription = '';

    if (this.editMode) {
      const movie = this.movieService.getMovie(this.id);
      movieTitle = movie.title;
      movieImageUrl = movie.imageUrl;
      movieDescription = movie.description;
    }

    this.movieForm = new FormGroup({
      title: new FormControl(movieTitle, Validators.required),
      imageUrl: new FormControl(movieImageUrl, Validators.required),
      description: new FormControl(movieDescription, Validators.required),
    });
  }
}
