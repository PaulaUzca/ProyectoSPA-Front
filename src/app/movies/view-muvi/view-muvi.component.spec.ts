import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMuviComponent } from './view-muvi.component';

describe('ViewMuviComponent', () => {
  let component: ViewMuviComponent;
  let fixture: ComponentFixture<ViewMuviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMuviComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMuviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
