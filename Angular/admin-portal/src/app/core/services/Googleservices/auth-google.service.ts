import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {
  private oAuthService= inject(OAuthService);
  private router=inject(Router);
  constructor() { 
    this.initConfiguration();
  }
  private initConfiguration(){
    const authConfig: AuthConfig={
    issuer:'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    clientId:'283540103373-rg7ukho05qgobu5ujchnvarkir5fuaq5.apps.googleusercontent.com', // This id should be taken of your Google cloud configuration.
    redirectUri:window.location.origin+'/dashboard', // Redirection url
    scope:'openid profile email', // open id Profile email 
  };
  this.oAuthService.configure(authConfig);
  this.oAuthService.setupAutomaticSilentRefresh();
  this.oAuthService.loadDiscoveryDocumentAndTryLogin();
}
  public login():void{
    this.oAuthService.initImplicitFlow();
  }
}
