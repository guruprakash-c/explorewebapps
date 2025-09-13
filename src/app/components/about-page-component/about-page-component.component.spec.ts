import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPageComponentComponent } from './about-page-component.component';

describe('AboutPageComponentComponent', () => {
  let component: AboutPageComponentComponent;
  let fixture: ComponentFixture<AboutPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPageComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
