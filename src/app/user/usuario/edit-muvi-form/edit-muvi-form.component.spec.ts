import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMuviFormComponent } from './edit-muvi-form.component';

describe('EditMuviFormComponent', () => {
  let component: EditMuviFormComponent;
  let fixture: ComponentFixture<EditMuviFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMuviFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMuviFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
