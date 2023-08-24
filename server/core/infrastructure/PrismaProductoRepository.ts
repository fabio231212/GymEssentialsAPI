// src/infrastructure/database/PrismaUserRepository.ts

import { PrismaClient, Producto } from "@prisma/client"; // Importa el modelo generado por Prisma
import { IProductoRepository } from "./Interfaces/IProductoRepository";
import ImageUploader from "../presentation/controllers/StorageMIddleware";


export class PrismaProductoRepository implements IProductoRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  getPrrudctsConDescuentoByVendedor(id: number): Promise<any> {
    const productosConDescuento = this.prisma.$queryRaw<any>`SELECT
    COALESCE(COUNT(*), 0) AS value
  FROM
      Producto AS p
  WHERE
      p.usuarioId = ${id} -- Reemplaza [ID_DEL_VENDEDOR] con el ID del vendedor
      AND p.descuento > 0;`
      return productosConDescuento;
      console.log(productosConDescuento);
  }

  getProductsSinStockByVendedor(id: number): Promise<any> {
    const productosSinStock = this.prisma.$queryRaw<any>`SELECT
    COALESCE(COUNT(*), 0) AS value
  FROM
      Producto AS p
  WHERE
      p.usuarioId = ${id} -- Reemplaza [ID_DEL_VENDEDOR] con el ID del vendedor
      AND p.stock = 0;`
      return productosSinStock;
  }
  getTopCategoriesByVendedor(id: number): Promise<any> {
    const topCategories = this.prisma.$queryRaw<any>`
    SELECT
        cp.descripcion AS name,
        SUM(df.cantidad) AS value
    FROM
        Producto AS p
    JOIN
        DetalleFactura AS df ON p.id = df.productoId
    JOIN
        CategoriaProducto AS cp ON p.categoriaProductoId = cp.id
    WHERE
        P.usuarioId = ${id}
    GROUP BY
        cp.descripcion
    ORDER BY
    value DESC;`

        return topCategories;
  }
  getTopProductoByVendedor(id: number): Promise<any> {
    const topProduct = this.prisma.$queryRaw<any>`
    SELECT
    P.id AS productId,
    P.nombre AS nombreProducto,
    SUM(DF.cantidad) AS totalCantidad
FROM Producto AS P
JOIN DetalleFactura AS DF ON P.id = DF.productoId
JOIN EncabezadoFactura AS EF ON DF.encabezadosFacturaId = EF.id
WHERE P.usuarioId = ${id}
GROUP BY P.id, P.nombre
ORDER BY totalCantidad DESC
LIMIT 1;
`;
 return topProduct;
  }

  getNewProducts(): Promise<any> {
    try {
      const newProducts = this.prisma.producto.findMany({
        include: {
          categoriaProducto: true,
          imagenes: true,
          estadoProducto: { select: { descripcion: true } },
          marcas: true,
          tamannos: true,
        },
        orderBy: {
          createdAt: 'desc', // Ordenar por descuento en orden descendente
        },
        take: 7, // Obtener los primeros 7 productos
      });

      return newProducts;
    } catch (error) {
      // Manejo de errores
      throw new Error("Error al obtener los productos ");

    }
  }
  getProductsWithHigherDiscount(): Promise<any> {
    try {
      const productsWithDiscount = this.prisma.producto.findMany({
        include: {
          categoriaProducto: true,
          imagenes: true,
          estadoProducto: { select: { descripcion: true } },
          marcas: true,
          tamannos: true,
        },
        orderBy: {
          descuento: 'desc', // Ordenar por descuento en orden descendente
        },
        take: 7, // Obtener los primeros 7 productos
        where: {
          descuento: {
            gt: 0, // Obtener los productos con descuento mayor a 0
          }
        }
      });

      return productsWithDiscount;
    } catch (error) {
      // Manejo de errores
      throw new Error("Error al obtener los productos con mayor descuento");

    }
  }


  //Obtiene los productos de un vendedor
  getProductoByIdVendedor(id: number): Promise<Producto[]> {
    try {
      return this.prisma.producto.findMany({
        where: { usuarioId: id }, include: {
          imagenes: true,
          estadoProducto: { select: { descripcion: true } },
          marcas: true,
          tamannos: true,
          categoriaProducto: true,
        }
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los productos del vendedor");
    }
  }

  async getProdructsByComentario(): Promise<any> {
    try {
      const productosConMasComentarios = await this.prisma.producto.findMany({
        take: 7
      });

      return productosConMasComentarios;
    } catch (error) {
      throw error;
    }
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
        where: {
          stock: {
            gt: 0
          }
        }
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
          comentariosProducto: {
            include: {
              usuario: true,
            }
          }
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
          stock: parseInt(producto.stock) ?? 0,
          descuento: parseFloat(producto.descuento) ?? 0,
          precio: parseFloat(producto.precio) ?? 0,
          precioOferta: parseFloat(producto.precioOferta) ?? 0,
          categoriaProductoId: parseInt(producto.categoriaProductoId) ?? 0,
          usuarioId: parseInt(producto.usuarioId) ?? 0,
          estadoProductoId: parseInt(producto.estadoProductoId) ?? 0,
          marcas: {
            connect: JSON.parse(producto.marcas),
          },
          tamannos: {
            connect: JSON.parse(producto.tamannos),
          },
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
              process.env.URL_IMAGENES +
              updatedProduct.nombre.replace(/\s/g, "") +
              updatedProduct.usuarioId +
              new Date().toISOString().slice(0, 10).replace(/-/g, "") + (index + 1) +
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
