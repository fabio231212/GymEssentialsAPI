import { PrismaClient } from '@prisma/client';
import { usuario } from './seeds/usuario.seed';
import { producto } from './seeds/producto.seed';
import { rol } from './seeds/rol.seed';
import { metodoPago } from './seeds/metodoPago.seed';
import { imagenProducto } from './seeds/imagenProducto.seed';
import { detFactura } from './seeds/factura.seed';
import { encFactura } from './seeds/factura.seed';
import { estadoProducto } from './seeds/estadoProducto.seed';
import { estado } from './seeds/estado.seed';
import { direccionUsuario } from './seeds/direccionUsuario.seed';
import { comentariosProducto } from './seeds/comentariosProducto.seed';
import { categoriaProducto } from './seeds/categoriaProducto.seed';
import { calificacionUsuario } from './seeds/calificacionUsuario.seed';
import { tammano } from './seeds/tamanno.seed';
import { marcas } from './seeds/marca.seed';

const prisma = new PrismaClient();

async function main() {
  await prisma.rol.createMany({
    data: rol,
  });
  await prisma.tamanno.createMany({
    data: tammano,
  });
  await prisma.marca.createMany({
    data: marcas,
  });
  await prisma.usuario.create({
    data: usuario[0],
  });
  await prisma.usuario.create({
    data: usuario[1],
  });
  await prisma.usuario.create({
    data: usuario[2],
  });
  await prisma.usuario.create({
    data: usuario[3],
  });
  await prisma.usuario.create({
    data: usuario[4],
  });
  await prisma.direccionUsuario.createMany({
    data: direccionUsuario,
  });
  await prisma.calificacionUsuario.createMany({
    data: calificacionUsuario,
  });
  await prisma.categoriaProducto.createMany({
    data: categoriaProducto,
  });
  await prisma.estado.createMany({
    data: estado,
  });
  await prisma.estadoProducto.createMany({
    data: estadoProducto,
  });
  await prisma.metodoPago.createMany({
    data: metodoPago,
  });
  await prisma.producto.create({
    data: producto[0],
  });
  await prisma.producto.create({
    data: producto[1],
  });
  await prisma.producto.create({
    data: producto[2],
  });
  await prisma.producto.create({
    data: producto[3],
  });
  await prisma.producto.create({
    data: producto[4],
  });
  await prisma.producto.create({
    data: producto[5],
  });
  await prisma.producto.create({
    data: producto[6],
  });
  await prisma.producto.create({
    data: producto[7],
  });
  await prisma.producto.create({
    data: producto[8],
  });
  await prisma.comentarioProducto.createMany({
    data: comentariosProducto,
  });
  await prisma.imagenProducto.createMany({
    data: imagenProducto,
  });
  await prisma.encabezadoFactura.createMany({
    data: encFactura,
  });
  await prisma.detalleFactura.createMany({
    data: detFactura,
  });
}

main()
  .then(async (): Promise<void> => {
    await prisma.$disconnect();
  })
  .catch(async (e: Error): Promise<void> => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
