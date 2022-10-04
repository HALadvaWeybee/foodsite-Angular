import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestfoodComponent } from './bestfood.component';

describe('BestfoodComponent', () => {
  let component: BestfoodComponent;
  let fixture: ComponentFixture<BestfoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestfoodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestfoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
