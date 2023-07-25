export const crearMensaje = (id: string, nombre: string, mensaje: string) => {
  return {
    id,
    nombre,
    mensaje,
    fecha: new Date().getTime(),
  };
};
