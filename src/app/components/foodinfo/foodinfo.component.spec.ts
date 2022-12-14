import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodinfoComponent } from './foodinfo.component';

describe('FoodinfoComponent', () => {
  let component: FoodinfoComponent;
  let fixture: ComponentFixture<FoodinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
