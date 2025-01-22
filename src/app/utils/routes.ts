import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';

import { CustomManifest } from './config';
import { HOST_ROUTES } from '../host.routes';

export function buildRoutes(options: CustomManifest): Routes {

    const lazyRoutes: Routes = Object.keys(options).map(moduleKey => {
        const entry = options[moduleKey];
        return {
            path: entry.routePath,
            loadChildren: () =>
                loadRemoteModule({
                    type: 'manifest',
                    remoteName: moduleKey,
                    exposedModule: entry.exposedModule
                })
                    .then(m => m[entry.ngModuleName])
        }
    });

    return [...HOST_ROUTES, ...lazyRoutes, { path: "**", loadComponent: () => import('../not-found/not-found.component').then(m => m.NotFoundComponent), pathMatch: "full" }];
}