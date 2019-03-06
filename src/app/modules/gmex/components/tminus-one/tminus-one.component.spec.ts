import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TminusOneComponent } from './tminus-one.component';

describe('TminusOneComponent', () => {
  let component: TminusOneComponent;
  let fixture: ComponentFixture<TminusOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TminusOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TminusOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
