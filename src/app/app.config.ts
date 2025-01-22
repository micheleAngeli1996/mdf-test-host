import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, Router, RouterModule, withComponentInputBinding } from '@angular/router';
import { ApplicationConfig, importProvidersFrom, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';

import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';

import { HOST_ROUTES } from './host.routes';
import { buildRoutes } from './utils/routes';
import { CustomManifest } from './utils/config';
import { getManifest } from '@angular-architects/module-federation';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const manifest = getManifest<CustomManifest>();
      const routes = buildRoutes(manifest);
      inject(Router).resetConfig(routes);
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(
      BrowserModule,
      RouterModule,
    ),
    provideRouter(
      HOST_ROUTES,
      withComponentInputBinding()
    ),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })],
};
