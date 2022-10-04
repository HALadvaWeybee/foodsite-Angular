import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandwitchComponent } from './sandwitch.component';

describe('SandwitchComponent', () => {
  let component: SandwitchComponent;
  let fixture: ComponentFixture<SandwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandwitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SandwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
