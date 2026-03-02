import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardModal } from './dashboard-modal';

describe('DashboardModal', () => {
  let component: DashboardModal;
  let fixture: ComponentFixture<DashboardModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
