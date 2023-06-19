import { PrismaClient } from "@prisma/client";
import { usuario } from "./seeds/usuario.seed";
import { producto } from "./seeds/producto.seed";
import { rol } from "./seeds/rol.seed";
import { metodoPago } from "./seeds/metodoPago.seed";
import { imagenProducto } from "./seeds/imagenProducto.seed";
import { detFactura } from "./seeds/factura.seed";
import { encFactura } from "./seeds/factura.seed";
import { estadoProducto } from "./seeds/estadoProducto.seed";
import { estadoPedido } from "./seeds/estadoPedido.seed";
import { direccionUsuario } from "./seeds/direccionUsuario.seed";
import { comentariosProducto } from "./seeds/comentariosProducto.seed";
import { categoriaProducto } from "./seeds/categoriaProducto.seed";
import { calificacionUsuario } from "./seeds/calificacionUsuario.seed";

const prisma = new PrismaClient();

async function main() {
  await prisma.rol.createMany({
    data: rol,
  });
  await prisma.direccionUsuario.createMany({
    data: direccionUsuario,
  });
  await prisma.usuario.create({
    data: usuario[0],
  })
  await prisma.usuario.create({
    data: usuario[1],
  })
  await prisma.usuario.create({
    data: usuario[2],
  })
  await prisma.usuario.create({
    data: usuario[3],
  })
  await prisma.usuario.create({
    data: usuario[4],
  })
  await prisma.calificacionUsuario.createMany({
    data: calificacionUsuario,
  })
   await prisma.categoriaProducto.createMany({
    data: categoriaProducto,
  });
  await prisma.estadoPedido.createMany({
    data: estadoPedido,
  });
  await prisma.estadoProducto.createMany({
    data: estadoProducto,
  });
  await prisma.metodoPago.createMany({
    data: metodoPago,
  });
  await prisma.producto.createMany({
    data: producto,
  });
  await prisma.comentariosproducto.createMany({
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
