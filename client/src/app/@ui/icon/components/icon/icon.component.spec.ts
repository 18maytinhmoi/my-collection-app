import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadIconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: PadIconComponent;
  let fixture: ComponentFixture<PadIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PadIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PadIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
