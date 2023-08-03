// src/infrastructure/database/PrismaUserRepository.ts

import { PrismaClient, Producto } from "@prisma/client"; // Importa el modelo generado por Prisma
import { IProductoRepository } from "./Interfaces/IProductoRepository";
import ImageUploader from "../presentation/controllers/storageController";

export class PrismaProductoRepository implements IProductoRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  //Obtiene los productos de un vendedor
  getProductoByIdVendedor(id: number): Promise<Producto[]> {
    try {
      return this.prisma.producto.findMany({ where: { usuarioId: id } });
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los productos del vendedor");
    }
  }

  crearProducto(producto: Producto): Promise<Producto> {
    throw new Error("Method not implemented.");
  }

  //Obtiene todos los productos
  getProductos(): Promise<Producto[]> {
    try {
      return this.prisma.producto.findMany({
        include: {
          categoriaProducto: true,
          usuario: { select: { nombre: true, email: true } },
          imagenes: true,
          estadoProducto: { select: { descripcion: true } },
          marcas: true,
          tamannos: true,
        },
      });
    } catch (error) {
      // Manejo de errores
      console.error(error);
      throw new Error("Error al obtener los productos");
    }
  }
  //Obtiene un producto por su id
  getProductoById(id: number): Promise<Producto> {
    try {
      return this.prisma.producto.findUnique({
        where: { id: id },
        include: {
          categoriaProducto: true,
          imagenes: true,
          usuario: true,
          marcas: true,
          tamannos: true,

        },
      }) as Promise<Producto>;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los datos del producto");
    }
  }

  //Obtener por productso por categoria
  getProductsByCategory(id: number): Promise<Producto[]> {
    try {
      return this.prisma.producto.findMany({
        where: { categoriaProductoId: id },
        include: {
          categoriaProducto: true,
          imagenes: true,
          estadoProducto: { select: { descripcion: true } },
        },
      }) as Promise<Producto[]>;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los productos");
    }
  }

  //LA FUNCION ES ASINCRONA PARA PODER MANEJAR LA CREACION DE PRODUCTOS Y LAS IMAGENES
  async createProduct(producto: any): Promise<Producto> {
    try {

      ImageUploader.counter = 1;
      // PRIMERO SE VERIFICA QUE EL PRODUCTO TENGA AL MENOS UNA IMAGEN Y SI NO TIENE SE LANZA UN ERROR
      if (producto.imagenes.length == 0) {
        throw new Error("Debe enviar al menos una imagen");
      }
      //SI TIENE AL MENOS UNA IMAGEN SE CREA EL PRODUCTO
      const nuevoProducto = await this.prisma.producto.create({
        data: {
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          stock: parseInt(producto.stock),
          descuento: parseFloat(producto.descuento),
          precio: parseFloat(producto.precio),
          precioOferta: parseFloat(producto.precioOferta),
          categoriaProductoId: parseInt(producto.categoriaProductoId),
          usuarioId: parseInt(producto.usuarioId),
          estadoProductoId: parseInt(producto.estadoProductoId),
          marcas:{
            connect: JSON.parse(producto.marcas),
          },
          tamannos:{
            connect: JSON.parse(producto.tamannos),
          }
        },
      });

      //DESDE AQUI SE CREA UNA CONSTANTE DE IMAGENES QUE CONTIENE UN ARREGLO DE IMAGENES CADA UNA CON UN NOMBRE UNICO
      const imagenes = producto.imagenes.map((imagen: any, index: number) => ({
        imgUrl:
        process.env.URL_IMAGENES +
          producto.nombre.replace(/\s/g, "") +
          producto.usuarioId +
          new Date().toISOString().slice(0, 10).replace(/-/g, "") +
          (index + 1) + // Use index + 1 to add the number at the end
          ".jpg",
        productoId: nuevoProducto.id, // Asignar el id del producto recién creado
      }));

      // //Y AL FINAL SE INSERTAN LAS URL DE LAS IMAGENES EN LA BASE DE DATOS
      await this.prisma.imagenProducto.createMany({
        data: imagenes,
      });

      return nuevoProducto;
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear el producto");
    }
  }

  async editProduct(producto: any): Promise<Producto> {
    try {
      ImageUploader.counter = 1;

      // Obtiene el producto existente de la base de datos
      const existingProduct = await this.prisma.producto.findUnique({
        where: { id: parseInt(producto.id) },
        include: {
          marcas: {
            select: { id: true },
          },
          tamannos: {
            select: { id: true },
          },
          imagenes: true,
        },
      });

      if (existingProduct) {
        

        // Actualiza los datos del producto según lo que venga en updatedProductData
        const updatedProduct = await this.prisma.producto.update({
          where: { id: existingProduct.id },
          data: {
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            stock: parseInt(producto.stock),
            descuento: parseFloat(producto.descuento),
            precio: producto.precio,
            precioOferta: producto.precioOferta,
            categoriaProductoId: parseInt(producto.categoriaProductoId),
            estadoProductoId: parseInt(producto.estadoProductoId),
            usuarioId: parseInt(producto.usuarioId),
            tamannos: {
                disconnect: existingProduct.tamannos,
                connect: JSON.parse(producto.tamannos),
            },
            marcas: {
                disconnect: existingProduct.marcas,
                connect: JSON.parse(producto.marcas),
            },
          },
        });

        // Si hay imágenes nuevas enviadas, actualiza las imágenes del producto
        if (producto.imagenes && producto.imagenes.length > 0) {
          const newImages = producto.imagenes.map((image: any, index: number) => ({
            imgUrl:
               process.env.URL_IMAGENES+
              updatedProduct.nombre.replace(/\s/g, "") +
              updatedProduct.usuarioId +
              new Date().toISOString().slice(0, 10).replace(/-/g, "")+ (index+1) +
              ".jpg",
            productoId: updatedProduct.id,
          }));

          await this.prisma.imagenProducto.deleteMany({
            where: {
              productoId: updatedProduct.id,
            },
          });

          await this.prisma.imagenProducto.createMany({
            data: newImages,
          });
        }

        return updatedProduct;
      }

      throw new Error("Producto no encontrado");
    } catch (error) {
      console.error(error);
      throw new Error("Error al editar el producto");
    }
  }
}
