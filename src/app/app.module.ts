import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';
import { faSignsPost } from '@fortawesome/free-solid-svg-icons';
import { PrivateContentComponent } from './private-content/private-content.component';
import { SsoComponent } from './sso/sso.component';
import { NavComponent } from './nav/nav.component';
import { DataService } from './services/data.service';
import { AmplifyConfig } from './config/amplify.config';
import { CognitoService } from './services/cognito.service';

export function initApp(amplifyConfig: AmplifyConfig) {
  return () => amplifyConfig.getSSMParameters();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    HomeComponent,
    PrivateContentComponent,
    SsoComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
    
  ],
  providers: [AmplifyConfig, 
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [AmplifyConfig],
      multi: true
    },
    DataService,
    CognitoService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faMobileScreenButton, faSignsPost);
  }
 }
