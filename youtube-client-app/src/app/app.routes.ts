import { Routes } from '@angular/router';

import { AdminComponent } from './auth/pages/admin/admin.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { authGuard } from './core/guards/login/auth.guard';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { FavoriteComponent } from './favorite/pages/favorite.component';
import { DetailedInformationComponent } from './youtube/pages/detailed-information/detailed-information.component';
import { MainComponent } from './youtube/pages/main/main.component';

export const routes: Routes = [
  { path: 'main', component: MainComponent, canActivate: [authGuard] },
  { path: 'video/:id', component: DetailedInformationComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: 'favorite', component: FavoriteComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
