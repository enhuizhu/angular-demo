import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GmexComponent } from './gmex.component';
import { CompileNgModuleMetadata } from '@angular/compiler';
import { 
  GlDataGridModule, 
  GlLoaderModule, 
  GlTabsModule, 
  GlDropdownModule, 
  GlDatePickerModule,
  DataConverterService
} from 'glencore-common-ui-lib';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Store } from '../../../../store/store';
import { DataMiddleware } from '../../../../middlewares/data.middleware';
import { UserService } from '../../../../services/user.service';
import { HttpService } from '../../../../services/http.service';
import { ConfigService } from '../../../../services/config.service';
import { NotificationsService } from '../../../../services/notifications.service';
import { OdataService } from '../../../../services/odata.service';
import { GmexService } from '../../services/gmex.service';
import { QueueService } from '../../services/queue.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DxTooltipModule } from 'devextreme-angular';


describe('GmexComponent', () => {
  let component: GmexComponent;
  let fixture: ComponentFixture<GmexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmexComponent ],
      imports: [ 
        HttpClientModule, 
        GlDataGridModule, 
        GlLoaderModule, 
        GlTabsModule, 
        FormsModule, 
        GlDropdownModule, 
        GlDatePickerModule, 
        DxTooltipModule,
        RouterTestingModule.withRoutes([{path: '', component: GmexComponent}]),
      ],
      providers: [ 
        Store, 
        OdataService, 
        GmexService, 
        DataMiddleware, 
        UserService, 
        HttpService,
        ConfigService, 
        NotificationsService,
        DataConverterService,
        QueueService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // fit('getChangesById', () => {
  //   const changes = [{
  //     'key': {
  //       'Id': 3,
  //       'ReportDate': '2018-01-01T00:00:00Z',
  //       'BillOfLadingDate': '2018-04-11T00:00:00+01:00',
  //       'Counterparty': 'GasProm',
  //       'Commodity': 'Petrol',
  //       'QuantityRequested': 5000,
  //       'QuantityApproved': 2010,
  //       'UnitOfMeasurement': 'LT',
  //       'TitleTransferLocation': 'Australia',
  //       'DischargeLocation': null,
  //       'CustomerOrderNumber1': 456,
  //       'CustomerOrderNumber2': 654,
  //       'DeliveryCustomer': 'GasProm',
  //       'PrescheduleNumber': 999,
  //       'PcrNumber': null,
  //       'Comments': '45121',
  //       'CustomError': null,
  //       'ImportDetailsId': 3,
  //       'LastUpdate': '2018-04-11T15:08:16.363+01:00',
  //       'StatusId': 3,
  //       'row_status': '3',
  //       'error_msg': 'Failed loading to Tempest',
  //       'QuantityApproved_modified': true,
  //       'Comments_modified': true
  //     },
  //     'newData': {
  //       'QuantityApproved': 2010
  //     },
  //     'oldData': {
  //       'Id': 3,
  //       'ReportDate': '2018-01-01T00:00:00Z',
  //       'BillOfLadingDate': '2018-04-11T00:00:00+01:00',
  //       'Counterparty': 'GasProm',
  //       'Commodity': 'Petrol',
  //       'QuantityRequested': 5000,
  //       'QuantityApproved': 2000,
  //       'UnitOfMeasurement': 'LT',
  //       'TitleTransferLocation': 'Australia',
  //       'DischargeLocation': null,
  //       'CustomerOrderNumber1': 456,
  //       'CustomerOrderNumber2': 654,
  //       'DeliveryCustomer': 'GasProm',
  //       'PrescheduleNumber': 999,
  //       'PcrNumber': null,
  //       'Comments': null,
  //       'CustomError': null,
  //       'ImportDetailsId': 3,
  //       'LastUpdate': '2018-04-11T15:08:16.363+01:00',
  //       'StatusId': 3,
  //       'row_status': '3',
  //       'error_msg': 'Failed loading to Tempest',
  //       'QuantityApproved_modified': true
  //     }
  //   }, {
  //     'key': {
  //       'Id': 3,
  //       'ReportDate': '2018-01-01T00:00:00Z',
  //       'BillOfLadingDate': '2018-04-11T00:00:00+01:00',
  //       'Counterparty': 'GasProm',
  //       'Commodity': 'Petrol',
  //       'QuantityRequested': 5000,
  //       'QuantityApproved': 2010,
  //       'UnitOfMeasurement': 'LT',
  //       'TitleTransferLocation': 'Australia',
  //       'DischargeLocation': null,
  //       'CustomerOrderNumber1': 456,
  //       'CustomerOrderNumber2': 654,
  //       'DeliveryCustomer': 'GasProm',
  //       'PrescheduleNumber': 999,
  //       'PcrNumber': null,
  //       'Comments': '45121',
  //       'CustomError': null,
  //       'ImportDetailsId': 3,
  //       'LastUpdate': '2018-04-11T15:08:16.363+01:00',
  //       'StatusId': 3,
  //       'row_status': '3',
  //       'error_msg': 'Failed loading to Tempest',
  //       'QuantityApproved_modified': true,
  //       'Comments_modified': true
  //     },
  //     'newData': {
  //       'Comments': '45121'
  //     },
  //     'oldData': {
  //       'Id': 3,
  //       'ReportDate': '2018-01-01T00:00:00Z',
  //       'BillOfLadingDate': '2018-04-11T00:00:00+01:00',
  //       'Counterparty': 'GasProm',
  //       'Commodity': 'Petrol',
  //       'QuantityRequested': 5000,
  //       'QuantityApproved': 2010,
  //       'UnitOfMeasurement': 'LT',
  //       'TitleTransferLocation': 'Australia',
  //       'DischargeLocation': null,
  //       'CustomerOrderNumber1': 456,
  //       'CustomerOrderNumber2': 654,
  //       'DeliveryCustomer': 'GasProm',
  //       'PrescheduleNumber': 999,
  //       'PcrNumber': null,
  //       'Comments': null,
  //       'CustomError': null,
  //       'ImportDetailsId': 3,
  //       'LastUpdate': '2018-04-11T15:08:16.363+01:00',
  //       'StatusId': 3,
  //       'row_status': '-1',
  //       'error_msg': 'Failed loading to Tempest'
  //     }
  //   }];

  //   component.dataGrid.changes = changes;
  //   const result = component.getChangesById(3);
  //   expect(result).toEqual({QuantityApproved: 2010, Comments: '45121'});
  // });
});
