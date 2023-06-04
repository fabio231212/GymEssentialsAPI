export const usuario = [
    {
        cedula: '1',
        nombre : 'Sebastian',
        apellidos : 'Murillo',
        email : 'sebasmu223@gmail.com',
        numCelular: '0987654321',
        clave : '123456',
        roles : {
            connect : {id : 1}
        },
    },
    {
        cedula: '2',
        nombre : 'Fabio',
        apellidos : 'Ramirez',
        email : 'prueba1@gmail.com',
        numCelular: '0987654321',
        clave : '123456',
        roles : {
            connect : {id : 1}
        }
    },
    {
        cedula: '3',
        nombre : 'Antonio',
        apellidos : 'Ramirez',
        email : 'prueba2@gmail.com',
        numCelular: '0987654321',
        clave : '123456',
        roles : {
            connect : {id : 2}
        },
        direcciones : {
            connect : {id : 1}
        }
    },
   
    {
        cedula: '4',
        nombre : 'Carlo',
        apellidos : 'Bonilla',
        email : 'prueba3@gmail.com',
        numCelular: '0987654321',
        clave : '123456',
        roles : {
            connect : {id : 3}
        },
        direcciones : {
            connect : [{id : 2}, {id : 3}]
        }
    },
    {
        cedula: '5',
        nombre : 'Anibal',
        apellidos : 'Alpizar',
        email : 'prueba4@gmail.com',
        numCelular: '0987654321',
        clave : '123456',
        roles : {
            connect : [{id : 2}, {id : 3}]
        },
        direcciones : {
            connect : [{id : 4}]
        }
    },
]