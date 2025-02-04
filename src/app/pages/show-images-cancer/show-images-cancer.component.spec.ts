import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowImagesCancerComponent } from './show-images-cancer.component';

describe('ShowImagesCancerComponent', () => {
  let component: ShowImagesCancerComponent;
  let fixture: ComponentFixture<ShowImagesCancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowImagesCancerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowImagesCancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
