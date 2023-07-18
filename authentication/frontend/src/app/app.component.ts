import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from 'keycloak.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: string = '';
  token: string = '';

  constructor(private oauthService: OAuthService) { }

  ngOnInit(): void {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(result => {
        if (result) {
          let identity = this.oauthService.getIdentityClaims();
          this.user = `${identity['given_name']} ${identity['family_name']}`;
          this.token = this.oauthService.getAccessToken();
        }
      });
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }
}
