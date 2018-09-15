import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanfingpageComponent } from './lanfingpage.component';

describe('LanfingpageComponent', () => {
  let component: LanfingpageComponent;
  let fixture: ComponentFixture<LanfingpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanfingpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanfingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
