import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionElevesComponent } from './gestion-eleves.component';

describe('GestionElevesComponent', () => {
  let component: GestionElevesComponent;
  let fixture: ComponentFixture<GestionElevesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionElevesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionElevesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
