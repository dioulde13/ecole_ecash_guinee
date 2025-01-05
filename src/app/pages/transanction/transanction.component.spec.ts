import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransanctionComponent } from './transanction.component';

describe('TransanctionComponent', () => {
  let component: TransanctionComponent;
  let fixture: ComponentFixture<TransanctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransanctionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransanctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
