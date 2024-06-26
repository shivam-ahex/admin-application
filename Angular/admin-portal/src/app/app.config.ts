import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideOAuthClient } from 'angular-oauth2-oidc';

// import { FacebookLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
export const appConfig: ApplicationConfig = {
  providers: [ provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),provideToastr({positionClass: 'toast-top-right',
      preventDuplicates: true,}), provideAnimations(), provideOAuthClient(),





      
      // {
      //   provide: 'SocialAuthServiceConfig',
      //   useValue: {
      //     autoLogin: true,
      //     providers: [
      //       {
      //         id: FacebookLoginProvider.PROVIDER_ID,
      //         provider: new FacebookLoginProvider('317662941411750',{scope: 'email,public_profile'})
      //       }
            
      //     ],
      //     onError: (err) => {
      //       console.error(err);
      //     }
      //   } as SocialAuthServiceConfig
      // }
    ]
};
