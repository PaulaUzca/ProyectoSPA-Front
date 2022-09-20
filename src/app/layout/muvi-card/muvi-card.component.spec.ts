import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuviCardComponent } from './muvi-card.component';

describe('MuviCardComponent', () => {
  let component: MuviCardComponent;
  let fixture: ComponentFixture<MuviCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuviCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuviCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
