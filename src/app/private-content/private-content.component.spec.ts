import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateContentComponent } from './private-content.component';

describe('PrivateContentComponent', () => {
  let component: PrivateContentComponent;
  let fixture: ComponentFixture<PrivateContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
