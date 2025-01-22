import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';

export const HOST_ROUTES: Routes = [
    { path: '', redirectTo: "calendar", pathMatch: "full" },
    {
        path: 'calendar',
        loadChildren: () => loadRemoteModule({
            type: 'manifest',
            remoteName: 'calendar', // The name that is written in assets/mf.manifest.json
            exposedModule: './routes'
        }).then(r => r.CALENDAR_ROUTES),
    },
    {
        path: 'teams',
        loadChildren: () => loadRemoteModule({
            type: 'manifest',
            remoteName: 'teams', // The name that is written in assets/mf.manifest.json
            exposedModule: './routes'
        }).then(r => r.TEAMS_ROUTES),
    },
    { path: "**", redirectTo: 'calendar', pathMatch: "full" }
];
