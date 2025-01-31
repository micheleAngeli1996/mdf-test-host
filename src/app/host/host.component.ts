import { Component, inject } from '@angular/core';

import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { CustomManifest, CustomRemoteConfig } from '../models/config';
import { getManifest } from '@angular-architects/module-federation';

import { TranslationMergeService } from '../services/translation-merge.service';
@Component({
  selector: 'app-host',
  imports: [RouterModule, Toolbar, AvatarModule, ButtonModule],
  templateUrl: './host.component.html',
  styleUrl: './host.component.css'
})
export class HostComponent {
  router: Router = inject(Router);
  translationMergeService: TranslationMergeService = inject(TranslationMergeService);

  remotes: CustomRemoteConfig[] = [];

  async ngOnInit(): Promise<void> {
    this.translationMergeService.loadTranslations();
    const manifest = getManifest<CustomManifest>();
    this.remotes = Object.values(manifest);
  }
}
