import { TestBed, inject } from '@angular/core/testing';
import { InvoiceService } from './invoice.service';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';


describe('InvoiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InvoiceService,
        ConfigService,
        HttpService,
      ],
      imports: [
        HttpClientModule
      ],
    });
  });

  it('should be created', inject([InvoiceService], (service: InvoiceService) => {
    expect(service).toBeTruthy();
  }));
});
