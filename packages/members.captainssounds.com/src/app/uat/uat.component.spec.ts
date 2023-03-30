import { ComponentFixture, TestBed } from '@angular/core/testing'

import { UatComponent } from './uat.component'

describe('UatComponent', () => {
  let component: UatComponent
  let fixture: ComponentFixture<UatComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UatComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(UatComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
