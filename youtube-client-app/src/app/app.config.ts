import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import VideosEffects from './store/effects';
import { appStore } from './store/store';
import { ApiInterceptor } from './youtube/services/youtube-api/youtube-api-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(appStore),
    provideEffects(VideosEffects),
    provideHttpClient(withInterceptors([ApiInterceptor])),
  ],
};
