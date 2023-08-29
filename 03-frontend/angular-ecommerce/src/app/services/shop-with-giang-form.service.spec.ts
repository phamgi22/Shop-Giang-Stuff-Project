import { TestBed } from '@angular/core/testing';

import { ShopWithGiangFormService } from './shop-with-giang-form.service';

describe('ShopWithGiangFormService', () => {
  let service: ShopWithGiangFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopWithGiangFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
