import { Component, inject } from '@angular/core';

import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { CustomManifest, CustomRemoteConfig } from '../utils/config';
import { getManifest } from '@angular-architects/module-federation';

import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: 'app-host',
  imports: [RouterModule, Toolbar, AvatarModule, ButtonModule],
  templateUrl: './host.component.html',
  styleUrl: './host.component.css'
})
export class HostComponent {
  remotes: CustomRemoteConfig[] = [];
  router: Router = inject(Router);

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['it', 'en']);
    this.translate.use('it');
  }

  async ngOnInit(): Promise<void> {
    const manifest = getManifest<CustomManifest>();
    this.remotes = Object.values(manifest);
  }
}
