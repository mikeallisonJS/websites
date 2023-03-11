import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpkComponent } from './epk.component';

describe('EpkComponent', () => {
  let component: EpkComponent;
  let fixture: ComponentFixture<EpkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpkComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
