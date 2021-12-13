import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieGridComponent } from './movie-grid/movie-grid.component';
import { MovieResolverService } from './movie-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  {
    path: 'movies',
    component: MovieGridComponent,
  },
  { path: 'movies/new', component: MovieEditComponent },
  {
    path: 'movies/:id',
    component: MovieDetailsComponent,
    resolve: [MovieResolverService],
  },
  {
    path: 'movies/:id/edit',
    component: MovieEditComponent,
    resolve: [MovieResolverService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
