import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridClientComponent } from './grid-client.component';

describe('GridClientComponent', () => {
  let component: GridClientComponent;
  let fixture: ComponentFixture<GridClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
