import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProductoAdminComponent } from './lista-producto-admin.component';

describe('ListaProductoAdminComponent', () => {
  let component: ListaProductoAdminComponent;
  let fixture: ComponentFixture<ListaProductoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaProductoAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaProductoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
