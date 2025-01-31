import { TestBed } from '@angular/core/testing';

import { TranslationMergeService } from './translation-merge.service';

describe('TranslationMergeService', () => {
  let service: TranslationMergeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationMergeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
