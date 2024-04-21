import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter} from '@angular/router';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideStore, StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { GarageEffects } from './Store/effects/garage-effects';
import { raceReducer } from './Store/reducers';
import { provideAnimations } from '@angular/platform-browser/animations';
import { WinnersEffects } from './Store/effects/winners-effects';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      StoreModule.forFeature('raceState', raceReducer),
      BrowserModule,
      BrowserAnimationsModule,
      StoreModule.forRoot({}),
      EffectsModule.forRoot([GarageEffects, WinnersEffects]),
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
