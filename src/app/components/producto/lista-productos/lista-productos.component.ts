import { Component, Input } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { CommonModule } from '@angular/common';
import { ProductoItemComponent } from "../producto-item/producto-item.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../../services/productos.service';
import { CategoriasService } from '../../../services/categorias.service';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, ProductoItemComponent, NgxPaginationModule, FormsModule],
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent {

  @Input() listaProductos: Producto[] = [];
  @Input() categoriaListado: string = '';
  listaCategorias: [] = [];
  cargaLista: boolean = false;
  pagina: number = 1;
  categoriaSeleccionada: string = 'default';
  ordenSeleccionado: string = 'default';
  productosFiltrados: Producto[] = [];  // Inicializamos como vacío
  productosParaBuscar: Producto[] = [];  // Productos que coinciden con la búsqueda
  terminoBusqueda: string = '';  // Término actual de búsqueda
  productosSugeridos: Producto[] = [];  // Productos para autocompletar
  verFiltros : boolean;

  constructor(
    private categoriasServicio: CategoriasService,
    private productosServicio: ProductosService
  ) {
    this.verFiltros = true;
  }

  ngOnInit(): void {
    // Obtiene las categorias actualizados
    this.categoriasServicio.getCategorias().then((respuestaCategorias) => this.listaCategorias = respuestaCategorias);
    // Obtiene los productos actualizados
    this.productosServicio.getProductos().then((respuestaProductos) => {
      this.listaProductos = respuestaProductos;
      this.productosFiltrados = [...this.listaProductos]; // Inicializamos productos filtrados con todos los productos
      this.productosParaBuscar = [...this.listaProductos]; // Productos iniciales para la búsqueda
    });
    this.cargaLista = true;
  }

  filtrarCategoria() {
    if(this.categoriaSeleccionada != "default" && this.listaCategorias){
      let categoriaFiltro : any = this.listaCategorias.at(parseInt(this.categoriaSeleccionada));
      if(categoriaFiltro){
        this.productosFiltrados = this.listaProductos.filter((productoFiltrado) => productoFiltrado.getCategoria() === categoriaFiltro.id);
      }
    }
    else{
      this.productosFiltrados = this.listaProductos;
    }
  }

  ordenarProductos() {
    if (this.ordenSeleccionado === 'asc') {
      this.productosFiltrados.sort((a, b) => a.getPrecio() - b.getPrecio());
    } else if (this.ordenSeleccionado === 'desc') {
      this.productosFiltrados.sort((a, b) => b.getPrecio() - a.getPrecio());
    } else {
      this.productosServicio.getProductos().then((respuestaProductos) => this.listaProductos = respuestaProductos);
    }
  }

  // Filtrar productos mientras el usuario escribe en el buscador
  actualizarBusqueda(query: string) {
    this.terminoBusqueda = query;  // Guardamos el término de búsqueda
    if (query) {
      // Dividir el término de búsqueda en palabras clave (sin importar el orden)
      const palabrasBusqueda = query.toLowerCase().split(' ');

      this.productosSugeridos = this.listaProductos.filter((producto) =>
        palabrasBusqueda.every(palabra =>
          producto.getTitulo().toLowerCase().includes(palabra)  // Verifica si cada palabra está contenida en el título
        )
      );
    } else {
      this.productosSugeridos = [];
    }
  }

  // Filtrar productos solo cuando se presiona el botón de buscar
  buscarProductos() {
    if (this.terminoBusqueda) {
      const palabrasBusqueda = this.terminoBusqueda.toLowerCase().split(' ');

      // Filtra los productos que contienen todas las palabras clave
      this.productosFiltrados = this.listaProductos.filter((producto) =>
        palabrasBusqueda.every(palabra =>
          producto.getTitulo().toLowerCase().includes(palabra)
        )
      );
    } else {
      this.productosFiltrados = [...this.listaProductos];
    }
  }

  // Al seleccionar un producto del autocompletar, lo asignamos al campo de búsqueda
  seleccionarSugerencia(producto: Producto) {
    this.terminoBusqueda = producto.getTitulo();
    this.productosSugeridos = [];  // Limpiar sugerencias
    this.buscarProductos();  // Ejecutar la búsqueda con el producto seleccionado
  }
}
