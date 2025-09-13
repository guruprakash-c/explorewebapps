import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeaderComponentComponent } from './page-header-component.component';

describe('PageHeaderComponentComponent', () => {
  let component: PageHeaderComponentComponent;
  let fixture: ComponentFixture<PageHeaderComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHeaderComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageHeaderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
