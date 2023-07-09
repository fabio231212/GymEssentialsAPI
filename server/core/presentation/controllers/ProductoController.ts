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
}
