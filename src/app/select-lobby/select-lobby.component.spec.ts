import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLobbyComponent } from './select-lobby.component';

describe('SelectLobbyComponent', () => {
  let component: SelectLobbyComponent;
  let fixture: ComponentFixture<SelectLobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectLobbyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
