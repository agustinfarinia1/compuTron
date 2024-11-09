import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPedidoAdminComponent } from './gestion-pedido-admin.component';

describe('GestionPedidoAdminComponent', () => {
  let component: GestionPedidoAdminComponent;
  let fixture: ComponentFixture<GestionPedidoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionPedidoAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionPedidoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
