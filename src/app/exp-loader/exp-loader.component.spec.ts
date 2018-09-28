import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpLoaderComponent } from './exp-loader.component';

describe('ExpLoaderComponent', () => {
  let component: ExpLoaderComponent;
  let fixture: ComponentFixture<ExpLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
