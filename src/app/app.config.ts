import { BrowserModule } from '@angular/platform-browser';
import { getManifest } from '@angular-architects/module-federation';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, Router, RouterModule, withComponentInputBinding } from '@angular/router';
import { ApplicationConfig, importProvidersFrom, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';

import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';

import { provideHttpClient } from "@angular/common/http";
import { provideTranslateService, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { HOST_ROUTES } from './host.routes';
import { buildRoutes } from './utils/routes';
import { CustomManifest } from './models/config';
 
export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const manifest = getManifest<CustomManifest>();
      const routes = buildRoutes(manifest);
      inject(Router).resetConfig(routes);
    }),
    provideHttpClient(),
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
    }),
    provideTranslateService({
      defaultLanguage: 'it', 
    })
  ],
};
