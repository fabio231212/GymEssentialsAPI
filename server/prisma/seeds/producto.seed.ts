export const producto = [
  //Multiplivca el precio x el descuento que tiene el producto (precio * descuento) / 100 = precioOferta, haz esto con los productos que voy creando abajo
  //CREATINAS
  {
    nombre: "LANDERFIT CREATINA SIN SABOR",
    descripcion:
      "La creatina monohidratada en polvo es una excelente opción para mejorar el rendimiento deportivo. Con una dosis de 3 gramos de creatina micronizada, se garantiza una mejor absorción por parte del organismo. Con 100 servidas en un solo envase, este suplemento proporciona una forma efectiva de aumentar la fuerza y acelerar la recuperación muscular. Además, es una alternativa segura para aquellos que desean aumentar su masa corporal magra sin agregar grasa no deseada. En resumen, la creatina monohidratada en polvo es una herramienta valiosa para deportistas que buscan maximizar su desempeño físico y alcanzar sus objetivos de acondicionamiento sin preocuparse por añadir peso no deseado.",
    precio: 38,
    precioOferta: 30,
    descuento: 15,
    stock: 15,
    usuarioId: 4,
    estadoProductoId: 1,
    categoriaProductoId: 4,
    tamannos: {
      connect: [{ id: 3 }],
    },
    marcas: {
      connect: [{ id: 1 }],
    }

  },
  {
    nombre: "NUTRABIO CREATINA SIN SABOR",
    descripcion: "Es una creatina monohidratada micronizada de rápida absorción. La creatina es uno de los suplementos deportivos más investigados e importantes en la actualidad. Se ha convertido en una necesidad para los atletas que desean aumentar la intensidad del entrenamiento y retrasar la aparición de la fatiga. Las investigaciones han demostrado que la suplementación con creatina puede aumentar el tamaño, la fuerza y ​​la resistencia de los músculos. Además  mejora el rendimiento deportivo y acelerar la recuperación muscular.",
    precio: 38,
    precioOferta:0 ,
    descuento: 0,
    stock: 12,
    usuarioId: 4,
    estadoProductoId: 1,
    categoriaProductoId: 4,
    tamannos: {
      connect: [{ id: 2 }],
    },
    marcas: {
      connect: [{ id: 7 }],
    }
  },
  {
    nombre: "CELL TECH",
    descripcion: "Nuestra fórmula avanzada contiene una potente combinación de ingredientes para el aumento muscular. Con 10 gramos de creatina, se maximiza el potencial de crecimiento muscular. Además, la inclusión de 10 gramos de taurina y alanina combinados proporciona un impulso adicional para mejorar el rendimiento y la resistencia durante los entrenamientos intensos. Con 2 gramos de BCAA (aminoácidos de cadena ramificada) y 200 gramos de ALA (ácido alfa lipoico), esta fórmula también actúa como voluminizadora de células, ayudando a mejorar el tamaño y la amplitud muscular.",
    precio: 82,
    precioOferta: 0,
    descuento: 0,
    stock: 12,
    usuarioId: 4,
    estadoProductoId: 1,
    categoriaProductoId: 4,
    tamannos: {
      connect: [{ id: 1 },
      { id: 2 },
    ],
    },
    marcas: {
      connect: [{ id: 7 }],
    }
  },

  //PROTEINAS
  {
    nombre: "NITRO TECH 100% WHEY GOLD",
    descripcion: "Nitro Tech 100% Whey Gold es un increíble suplemento pensado para personas deportistas, gracias a su alto nivel proteínico que potencia y vigoriza el organismo. Su fórmula no contiene azúcares y su composición ha sido diseñada con la intención de mejorar tus metas, ya que su alto contenido en proteínas, permite aportar fuerza, resistencia y vitalidad al organismo, contrarrestando el agotamiento físico y mental que producen estas intensas actividades deportivas.",
    precio: 115,
    precioOferta: 0,
    descuento: 0,
    stock: 5,
    usuarioId: 5,
    estadoProductoId: 1,
    categoriaProductoId: 3,
    tamannos: {
      connect: [{ id: 1 }],
    },
    marcas: {
      connect: [{ id: 3 }],
    }
  },
  {
    nombre: "NUTRABIO CASEÍNA",
    descripcion: "Nuestro producto ofrece 28 servidas de proteína de alta calidad con 25g de proteína, 1g de azúcar, 0.5g de grasa, 2g de carbohidratos y 120 calorías por porción. Esta proteína de digestión lenta es anticatabólica, ayudando a mantener y construir masa muscular magra de manera efectiva.",
    precio: 63,
    precioOferta: 60 ,
    descuento: 5,
    stock: 5,
    usuarioId: 5,
    estadoProductoId: 1,
    categoriaProductoId: 3,
    tamannos: {
      connect: [{ id: 1 }],
    },
    marcas: {
      connect: [{ id: 7 }],
    }
  },
  {
    nombre: "ISO100",
    descripcion:"Supera tus límites y apoya la recuperación muscular después de un entrenamiento intenso con el poder de absorción y digestión ultra rápida de ISO100. Uno de los polvos de proteína de mayor calidad en el mercado, se filtra para eliminar el exceso de lactosa, carbohidratos, grasa y azúcar, garantizando la máxima pureza, mezclabilidad y ganancias. No te conformes con superar tus marcas anteriores, arrasa con ellas con el icónico sabor de ISO100 Fruity Pebbles.",
    precio: 60,
    precioOferta: 57  , 
    descuento: 5,
    stock: 5,
    usuarioId: 4,
    estadoProductoId: 1,
    categoriaProductoId: 3,
    tamannos: {
      connect: [{ id: 2 }],
    },
    marcas: {
      connect: [{ id: 5 }],
    }
  },

  //VITAMINAS
  {
    nombre: "PLATINUM MULTIVITAMIN",
    descripcion:"Platinum Multivitamin ha sido diseñado para entregar 20 vitaminas y minerales, incluyendo 100% o más de sus necesidades diarias de vitaminas A, C, D, E, B6 y B12.Cada porción también ofrece un espectro único de minerales y enzimas digestivas para una fórmula verdaderamente completa.",
    precio: 40,
    precioOferta: 0  , 
    descuento: 0,
    stock: 5,
    usuarioId: 5,
    estadoProductoId: 1,
    categoriaProductoId: 6,
    tamannos: {
      connect: [{ id: 3 }],
    },
    marcas: {
      connect: [{ id: 3 }],
    }
  },
  {
    nombre: "BETA-ALANINA 800MG",
    descripcion: "La beta alanina aumenta la fuerza, la producción de potencia, la resistencia, la capacidad de ejercicio, la masa muscular y retrasa la aparición de la fatiga neuromuscular. Es un amortiguador de ácido láctico que aumenta la capacidad de entrenamiento y te permite entrenar más duro y durante más tiempo.    La beta-alanina tomada con monohidrato de creatina produce efectos sinérgicos adicionales, que incluyen ganancia de masa libre de grasa, mayor fuerza y ​​mayor reducción de grasa corporal. Beta Alanine es perfecto para cualquier persona que practica un deporte donde se necesita fuerza, potencia y resistencia.",
    precio: 30,
    precioOferta: 0  , 
    descuento: 0,
    stock: 6,
    usuarioId: 4,
    estadoProductoId: 1,
    categoriaProductoId: 6,
    tamannos: {
      connect: [{ id: 3 }],
    },
    marcas: {
      connect: [{ id: 7 }],
    }
  },

  {
    nombre: "MULTIVITAMÍNICO MULTIPHASE",
    descripcion: "Nuestra fórmula completa de micronutrientes, vitaminas y minerales es ideal para deportistas que experimentan un mayor desgaste físico y, por lo tanto, tienen una mayor demanda de nutrientes esenciales. Cada frasco contiene 90 cápsulas que proporcionan múltiples beneficios para optimizar el rendimiento y promover una salud óptima.  Con esta fórmula, garantizamos el suministro adecuado de vitaminas y minerales clave, que son necesarios para mantener un sistema inmunológico fuerte, mejorar la recuperación muscular y promover un funcionamiento celular saludable. Estos nutrientes esenciales también apoyan la producción de energía, la salud ósea y la función cognitiva, brindando un respaldo integral para los deportistas en su búsqueda de un rendimiento máximo.",
    precio: 29,
    precioOferta: 0  , 
    descuento: 0,
    stock: 6,
    usuarioId: 4,
    estadoProductoId: 1,
    categoriaProductoId: 6,
    tamannos: {
      connect: [{ id: 3 }],
    },
    marcas: {
      connect: [{ id: 1 }],
    }
  },


  //GLUTAMINAS



  //QUEMADORES



  //PRE-ENTRENOS


  //GANADORES DE PESO


];
