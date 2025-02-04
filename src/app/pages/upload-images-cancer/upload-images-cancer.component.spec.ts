import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImagesCancerComponent } from './upload-images-cancer.component';

describe('UploadImagesCancerComponent', () => {
  let component: UploadImagesCancerComponent;
  let fixture: ComponentFixture<UploadImagesCancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadImagesCancerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadImagesCancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
