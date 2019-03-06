import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';

interface InvoiceInterface {
  getAllInvoices();
}

@Injectable()
export class InvoiceService implements InvoiceInterface {

  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) { }

  getAllInvoices() {
    return this.httpService.get(this.getUrl('all'));
  }

  sendInvoice(id) {
    return this.httpService.post(this.getUrl(`send/${id}`), {id});
  }

  getUrl(url) {
    return `${this.configService.apiBaseUrl}/Invoice/${url}`;
  }
}
