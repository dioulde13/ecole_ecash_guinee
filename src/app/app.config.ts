import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { withInterceptors,provideHttpClient, withFetch} from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DatePipe } from '@angular/common';  // Importer DatePipe
import { tokenInterceptor } from './services/intercepteur/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withHashLocation()),
    provideHttpClient(),
    provideHttpClient(withFetch()),
    provideClientHydration(), 
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    DatePipe,
    { 
      provide: LocationStrategy, 
      useClass: PathLocationStrategy 
    },
  ]
};
