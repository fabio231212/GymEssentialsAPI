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
    server.io.emit('listaPersona', usuariosChat.getPersonas());
  });

  client.on('disconnect', (data, callback) => {
    console.log('Cliente desconectado');
    let personaBorrada = usuariosChat.borraPersona(client.id);
    server.io.emit('listaPersona', usuariosChat.getPersonas());
  });

  client.on('mensajePrivado', (data, callback) => {
    let recibe = null;
    let persona = usuariosChat.getPersona(client.id);

    recibe = usuariosChat.getPersonaByIdUser(data.para);
    if (recibe == null) return;
    client.broadcast
      .to(recibe.id)
      .emit(
        'mensajePrivado',
        crearMensaje(client.id, persona.idUser, persona.nombre, data.mensaje)
      );

    // callback(persona);
  });
});
