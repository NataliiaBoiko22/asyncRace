import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideStore, StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { RaceEffects } from './Store/effects';
import { raceReducer } from './Store/reducers';
import { provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      StoreModule.forFeature('raceState', raceReducer),
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule.forRoot(routes),
      StoreModule.forRoot({}),
      EffectsModule.forRoot(RaceEffects),
      HttpClientModule
    ),

    provideHttpClient(),

    provideRouter(routes),
    provideAnimations(),
    provideStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    provideEffects(),
  ],
};
