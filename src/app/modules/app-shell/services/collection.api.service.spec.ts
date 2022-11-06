import { TestBed } from '@angular/core/testing';

import { CollectionApi } from './collection.api';

describe('CollectionApiService', () => {
  let service: CollectionApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
