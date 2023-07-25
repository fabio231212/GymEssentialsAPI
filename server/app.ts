import dotenv from 'dotenv';
import Server from './core/models/server';
import { Socket } from 'socket.io';
import { UsuariosChat } from './usuarioschat';
import { crearMensaje } from './utilidadesChat';

// Configurar dotenv.
dotenv.config();

const usuariosChat = new UsuariosChat();
const server = new Server();
server.listen();

server.io.on('connection', (client: Socket) => {
  console.log('Nuevo cliente conectado');

  client.on('entrarChat', (data, callback) => {
    let personas = usuariosChat.agregarPersona(
      client.id,
      data.userId,
      data.nombre
    );
    console.log(data.userId);
    callback(personas);
  });

  client.on('mensajeprivado', (usuario) => {
    //server.io.emit('mensajeprivado',data);
  });

  client.on('disconnect', (data, callback) => {
    console.log('Cliente desconectado');
    let personaBorrada = usuariosChat.borraPersona(client.id);
  });

  client.on('mensajePrivado', (data) => {
    let persona = usuariosChat.getPersona(client.id);

    let recibe = usuariosChat.getPersonaByIdUser(data.para);
    client.broadcast
      .to(recibe.id)
      .emit(
        'mensajePrivado',
        crearMensaje(client.id, persona.nombre, data.mensaje)
      );
  });
});
