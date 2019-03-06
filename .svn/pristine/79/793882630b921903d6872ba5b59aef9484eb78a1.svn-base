import { Injectable } from '@angular/core';

interface SettingServiceInterface {
  getOrders();
  saveOrders(orders);
}

@Injectable()
export class SettingService implements SettingServiceInterface {
  public defaultOrders = ['contracts', 'invoice', 'trade-data', 'trade-chart'];
  
  constructor() { 
  }

  getOrders() {
    const orders = localStorage.getItem('orders');
    // you may need call api to get order in future
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(orders) || this.defaultOrders);
    });
  }

  saveOrders(orders) {
    return new Promise((resolve, reject) => {
      localStorage.setItem('orders', JSON.stringify(orders));
      resolve({success: true});
    });
  }
}
