import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPredictComponent } from './show-predict.component';

describe('ShowPredictComponent', () => {
  let component: ShowPredictComponent;
  let fixture: ComponentFixture<ShowPredictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowPredictComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPredictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
