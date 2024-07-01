import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideOAuthClient } from 'angular-oauth2-oidc';

export const appConfig: ApplicationConfig = {
  providers: [ provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),provideToastr({positionClass: 'toast-top-right',
      preventDuplicates: true,}), provideAnimations(), provideOAuthClient(),
    ]
};
