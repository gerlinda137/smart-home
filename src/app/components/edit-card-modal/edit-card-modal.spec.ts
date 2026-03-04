import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCardModal } from './edit-card-modal';

describe('EditCardModal', () => {
  let component: EditCardModal;
  let fixture: ComponentFixture<EditCardModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCardModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCardModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
