import { TestBed } from '@angular/core/testing';

import { ServicioApiMlService } from './servicio-api-ml.service';

describe('ServicioApiMlService', () => {
  let service: ServicioApiMlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioApiMlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
