import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { getManifest } from '@angular-architects/module-federation';
import { CustomManifest } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class TranslationMergeService {
  http: HttpClient = inject(HttpClient);
  translate: TranslateService = inject(TranslateService);

  loadTranslations() {
    const manifest = getManifest<CustomManifest>();
    const defaultLanguage = this.translate.defaultLang;
    const shellTranslations: Observable<Record<string, Record<string, string>>> = <Observable<Record<string, Record<string, string>>>>this.http.get(`./i18n/${defaultLanguage}.json`);
    const remoteTranslations: Observable<Record<string, Record<string, string>>>[] = [];
    Object.keys(manifest).forEach(moduleKey => {
      remoteTranslations.push(<Observable<Record<string, Record<string, string>>>>this.http.get(manifest[moduleKey].translateUrl + `/${defaultLanguage}.json`));
    });

    forkJoin([shellTranslations, ...remoteTranslations]).subscribe(([shell, remote]) => {
      const mergedTranslations: Record<string, Record<string, string>> = {};
      Object.keys(shell).forEach(key => {
        mergedTranslations[key] = { ...mergedTranslations[key], ...shell[key] };
      });

      Object.keys(remote).forEach(key => {
        mergedTranslations[key] = { ...mergedTranslations[key], ...remote[key] };
      });

      this.translate.setTranslation('it', mergedTranslations, true);
      this.translate.use('it');
    });
  }
}
