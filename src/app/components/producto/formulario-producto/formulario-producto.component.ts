import { Component, inject, Input } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiMlService } from '../../../services/api-ml.service';
import { CommonModule } from '@angular/common';
import { RouterService } from '../../../services/router.service';
import { ProductosService } from '../../../services/productos.service';
import { CategoriasService } from '../../../services/categorias.service';
import { Categoria } from '../../../models/categoria.model';

@Component({
  selector: 'app-formulario-producto',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './formulario-producto.component.html',
  styleUrl: './formulario-producto.component.css'
})
export class FormularioProductoComponent{
  @Input("id") idProducto!: string;

  productoFormulario : FormGroup;
  respuestaBusqueda : [] = [];
  categorias : Categoria[] | null;
  tituloFormulario = "Carga Productos";
  textoBoton = "Cargar";
  cantidadProductos : number;
  modoFormulario : number;
  cartelExito : boolean;
  verificacionEdicion : boolean;

  constructor(private servicioMl:ApiMlService,private productosServicio: ProductosService,private router : RouterService,private categoriaService : CategoriasService){
    this.cantidadProductos = 0;
    this.modoFormulario = 0;
    this.cartelExito = false;
    this.categorias = null;
    this.verificacionEdicion = false;

    this.productoFormulario = new FormGroup({
      busqueda : new FormControl(),
      codigoML : new FormControl("",[Validators.required,Validators.minLength(3)],),
      titulo : new FormControl("",[Validators.required,Validators.minLength(3)]),
      categoria : new FormControl(null,[Validators.required]),
      marca : new FormControl("",[Validators.required,Validators.minLength(2)]),
      modelo : new FormControl("",[Validators.required,Validators.minLength(3)]),
      cantidad : new FormControl(1,[Validators.required,Validators.min(1)]),
      precio : new FormControl(1000,[Validators.required,Validators.min(1000)]),
      imagen : new FormControl("",[Validators.required,Validators.minLength(5)]),
    })
  }

  ngOnInit(): void {
    this.categoriaService.getCategorias().then((respuestaCategorias) => this.categorias = respuestaCategorias);
    this.productosServicio.getCantidadProductos().then((respuestaCantidad) => this.cantidadProductos = respuestaCantidad);
    if(this.idProducto){
      this.productosServicio.consultarCodigo(this.idProducto).then((respuestaConsultaId) => {
        let respuestaProducto = respuestaConsultaId[0];
        if(respuestaProducto){ // Si existe el producto que tiene que buscar por ID, Cambia el modo a Edicion
          this.modoFormulario = 1;
          this.tituloFormulario = "Editar Producto";
          this.textoBoton = "Editar";
          if(this.categorias){
            let numeroCategoria = this.categorias.findIndex((busquedaCategoria : Categoria) => respuestaConsultaId[0].categoria === busquedaCategoria.getId());
            this.productoFormulario.get("categoria")?.setValue(numeroCategoria);
          }
          this.productoFormulario.get("codigoML")?.patchValue(respuestaProducto.codigoML);
          this.productoFormulario.get("titulo")?.patchValue(respuestaProducto.titulo);
          this.productoFormulario.get("marca")?.patchValue(respuestaProducto.marca);
          this.productoFormulario.get("modelo")?.patchValue(respuestaProducto.modelo);
          this.productoFormulario.get("cantidad")?.patchValue(respuestaProducto.cantidad);
          this.productoFormulario.get("precio")?.patchValue(respuestaProducto.precio);
          this.productoFormulario.get("imagen")?.patchValue(respuestaProducto.imagen);
        }
      });
    }
  }

  buscarProductos = () => {
    this.servicioMl.getData(this.productoFormulario.get("busqueda")?.value).then((e) => this.respuestaBusqueda = e);
  }

  seleccionProducto = (valor : Event) => {
    const selectElement = valor.target as HTMLSelectElement;
    const producto : any = this.respuestaBusqueda[parseInt(selectElement.value)];
    const marca = this.obtenerCampo(producto["attributes"],"BRAND");
    const modelo = this.obtenerCampo(producto["attributes"],"MODEL");
    if(producto){
      this.productoFormulario.get("codigoML")?.setValue(producto.id);
      this.productoFormulario.get("titulo")?.setValue(producto.title);
      this.productoFormulario.get("precio")?.setValue(producto.price);
      this.productoFormulario.get("imagen")?.setValue(producto.thumbnail);
      if(marca){
        this.productoFormulario.get("marca")?.setValue(marca);
      }
      if(modelo){
        this.productoFormulario.get("modelo")?.setValue(modelo);
      }
    }
  }

  obtenerCampo = (producto : any[],campo : string) => {
      return producto.find((f) => f.id === campo).value_name;
  }

  seleccionCategoria = (valor : Event) => {
    const selectElement = valor.target as HTMLSelectElement;
    this.productoFormulario.get("categoria")?.setValue(selectElement.value);
  }

  onSubmit = () => {
    if(this.productoFormulario.valid){
      this.submitFormulario();
    }
    else{
      this.productoFormulario.markAllAsTouched();
    }
  }

  submitFormulario = () =>{
    if(this.categorias){
      let producto : Producto = new Producto(this.productoFormulario.get("codigoML")?.value,this.productoFormulario.get("titulo")?.value,this.productoFormulario.get("categoria")?.value,this.productoFormulario.get("marca")?.value,this.productoFormulario.get("modelo")?.value,this.productoFormulario.get("cantidad")?.value,this.productoFormulario.get("precio")?.value,this.productoFormulario.get("imagen")?.value);
      let indexCategoria =  this.productoFormulario.get("categoria")?.value;
      if(indexCategoria){
        this.cartelExito = true;
        producto.setCategoria(this.categorias[indexCategoria]["id"]);
        if(this.modoFormulario === 1){
          producto.setId(this.idProducto);
          this.productosServicio.editarProducto(producto);
        }
        else{
          producto.setId(`P${this.cantidadProductos}`);
          this.productosServicio.setNewProducto(producto);
        }
        this.router.irAHome();
      }
    }
  }
}
