export const crearMensaje = (id: string,idUser:number, nombre: string, mensaje: string) => {
  return {
    id,
    idUser,
    nombre,
    mensaje,
    fecha: new Date().getTime(),
  };
};
