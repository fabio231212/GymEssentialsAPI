export class UsuariosChat {
  personas: any[];

  constructor() {
    this.personas = [];
  }

  agregarPersona(id: string, idUser: number, nombre: string) {
    const existingUser = this.personas.find(
      (persona) => persona.idUser === idUser
    );

    if (existingUser) {
      return;
    }
    let persona = { id, idUser, nombre };
    this.personas.push(persona);
    return this.personas;
  }

  getPersona(id: string) {
    let persona = this.personas.filter((persona) => persona.id === id)[0];
    return persona;
  }

  getPersonaByIdUser(id: number) {
    let persona = this.personas.filter((persona) => persona.idUser === id)[0];
    return persona;
  }

  getPersonas() {
    return this.personas;
  }

  borraPersona(id: string) {
    let personaBorrada = this.getPersona(id);
    this.personas = this.personas.filter((persona) => persona.id !== id);
    return personaBorrada;
  }
}
