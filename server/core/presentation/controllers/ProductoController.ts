import { parse } from 'path';
import { ProductoUseCase } from '../../application/usescases/ProductoUseCase';
import { Request, Response } from 'express';

export class ProductoController {
  public productoUseCase: ProductoUseCase;

  constructor() {
    this.productoUseCase = new ProductoUseCase();
  }

  getProductos = async (req: Request, res: Response) => {
    const productos = await this.productoUseCase.getProductos();
    res.json(productos);
  };
  getProductosByIdVendedor = async (req: Request, res: Response) => {
    const idVendedor = parseInt(req.params.idVendedor);
    const productos = await this.productoUseCase.getProductoByIdVendedor(
      idVendedor
    );
    res.json(productos);
  };
  getProductoById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const producto = await this.productoUseCase.getProductoById(id);
    res.json(producto);
  };
  getProductsByCategory = async (req: Request, res: Response) => {
    const id = parseInt(req.params.idCategoria);
    if (isNaN(id)) {
      res
        .status(400)
        .json({ error: 'El id de la categoria debe ser numerico' });
    } else {
      const productos = await this.productoUseCase.getProductsByCategory(id);
      res.json(productos);
    }
  };
  createProduct = async (req: Request, res: Response) => {
    //SE HACE UNA CONSTANTE DE PRODUCTO EN LA CUAL SE ENVIA EL BODY Y LAS IMAGENES
    const producto = { ...req.body, imagenes: req.files };
    const productoCreado = await this.productoUseCase.createProduct(producto);
    res.json(productoCreado);
  };

  editProduct = async (req: Request, res: Response) => {
    const producto = { ...req.body, imagenes: req.files };
    const productoEditado = await this.productoUseCase.editProduct(producto);
    res.json(productoEditado);
  }

  getProductsByComentario = async (req: Request, res: Response) => {
    const productos = await this.productoUseCase.getProdructsByComentario();
    res.json(productos);
  };

  getProductsWithHigherDiscount = async (req: Request, res: Response) => {
    const productos = await this.productoUseCase.getProductsWithHigherDiscount();
    res.json(productos);
  }

  getNewProducts = async (req: Request, res: Response) => {
    const productos = await this.productoUseCase.getNewProducts();
    res.json(productos);
  }

  
}
