import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilesListComponent } from './mobiles-list.component';

describe('MobilesListComponent', () => {
  let component: MobilesListComponent;
  let fixture: ComponentFixture<MobilesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobilesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
