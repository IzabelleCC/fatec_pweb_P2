import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosClienteComponent } from './dadosCliente.component';

describe('DadosClienteComponent', () => {
  let component: DadosClienteComponent;
  let fixture: ComponentFixture<DadosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
