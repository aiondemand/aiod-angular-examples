# Frontend

## About
This project demonstrates how to use authenticate against AIoD. Namely:
* How to get the credentials your application needs to be able to authenticate.
* How to install libraries you need to authenticate against AIoD Keycloak instances.
* How to use these libraries in your Angular project.

## Use Authentication againts Keycloak in your code
### Install necessary libraries
```bash
npm i angular-oauth2-oidc --save
```

More information about the library can be found [here](https://www.npmjs.com/package/angular-oauth2-oidc).

### Prepare configuration file and get credentials
For the library to work, you have to provide a configuration file. In this file you'll provide information about the OAUTH2 and OIDC Identity server (in our case, Keycloak), type of authentication, scope and identification of your application (clientId) that will allow Keycloak to verify your application as being able to use it.

Example of such configuration file is `keycloak.config.js`.

In this demo we use a demo instance of the Keycloak deployed by OpenML team - [https://test.openml.org/aiod-auth/realms/dev](https://test.openml.org/aiod-auth/realms/dev). To get your `cliendId`, please, contact Jos van der Velde.

### Use authentication in your code
#### `app.components.ts` and `app.component.html`
In these files we implemented a very simple authentication mechanism based on `angular-oauth2-oidc` library. In the HTML part of the component, there are two buttons - **login** and **logout**. The TS part of the component implements the logic.

After user clicks on a login button (the user is not signed in), he or she is redirected to the Keycloak page. After successful login, the user is redirected back to the application. There, the **authentication token** and user's first and last name are retrieved from the instance of an `oauthService` provided by the library and stored in component's instance variables and rendered on the web page.

Basically, the auth* functionality is delegated to `oauthService` provided by the library you installed in the first step. To use the service in the component, you first need to inject its instance through constructor:
```typescript
constructor(private oauthService: OAuthService) { }
```

Then, you need to configure the service to let it know the configuration of the identity server in the `onInit()` callback. An appropriate place to initialize the service may be the basic component of the application - `app.components.ts`. Here, we also implement the callback functionality for retrieving authentication token and user's first and last name:
```typescript
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
```

In the `onInit()` callback of the component, you need to 

The implementation of login and logout functionality is trivial - you just call the oauthService's method you need and the service takes care of the rest:
```typescript
login() {
    this.oauthService.initLoginFlow();
}

logout() {
    this.oauthService.logOut();
}
```

#### `app.module.ts`
Usually, you want to pass the access token you received after successful login. This configuration ensures that the token (given the user is signed in) will be sent with every request without the need to add it to the requests manually.
```typescript
OAuthModule.forRoot({
      resourceServer: {
        // Replace this with your backend URL (where you want to pass the access token
        // to. This can also include the AIoD API itself if your frontend 
        // communicates with it directly).
        allowedUrls: ['http://localhost:8000/v1'],
        sendAccessToken: true
      }
    })
```

# Generated documentation
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
