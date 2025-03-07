// http sirve para crear servidores
import http from 'http';
// fs sirve para interactuar con los archivos  (leer y escribir archivos)
import fs from 'fs';

//Esta función deberá mostrar deberá mostrar una página HTML 
//con la bienvenida a tu proyecto
function darBienvenida(req, res) {
  //Agrega lo mínimo necesario en bienvenida.html
  //Agrega un enlace en bienvenida a la página de escuelas 
  //Agrega un enlace en bienvenida a la página de donantes 
  fs.readFile('bienvenida.html', 'utf8', (error, data) => {
    if (error) {
      //Escribe qué significa el 500 
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Oh no!!!!');
      return;
    }
    //"200" significa que la solicitud fue procesada correctamente
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}


//Esta función deberá enviar un json con los datos de las escuelas
function getEscuelas(req, res) {
  //Esto representa un objeto JSON de una escuela
  //Agrega otra escuela
  const escuelas = [{
    "nombre": "Escuela Benito Juárez",
    "direccion": "Av. Principal 123, Ciudad de México",
  }, {
    "nombre": "Escuela Miguel Hidalgo",
    "direccion": "Calle Secundaria 45, Monterrey",
  }
  ];
  res.writeHead(200, { 'Content-Type': 'application/json' });
  //Escribe qué hace la función stringify y por qué la tenemos que usar
  res.end(JSON.stringify(escuelas));
}


//Agrega un enlace a bienvenida y a donantes en escuelas.html 
function mostrarEscuelas(req, res) {
  fs.readFile('escuelas.html', 'utf8', (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Oh no!!!!');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}

//Agrega un enlace a bienvenida y a escuelas en donantes.html
function mostrarDonantes(req, res) {
  fs.readFile('donantes.html', 'utf8', (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error al cargar la página de donantes');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}

//Esta función deberá enviar un json con los datos de las donantes
function getDonantes(req, res) {
  const donantes = {
    donantes: [
      {
        "id": 1,
        "nombre": "Fundación Educativa JEO",
        "aportacion_anual": 1,
        "tipo_de_donante": "organizacion",
        "proyectos_apoyados": "Escuela Benito Juárez",
      },
      {
        "id": 2,
        "nombre": "Shakira",
        "aportacion_anual": 2,
        "tipo de donante": "individual",
        "proyectos_apoyados": ["Escuela Benito Juárez"]

      }
    ]
  };
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(donantes));
}

function mostrarEquipo(req, res) {
  fs.readFile('equipo.html', 'utf8', (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error interno del servidor.');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}
function getEquipo(req, res) {
  const equipo = {
    equipo: [
      {
        "id": 1,
        "nombre": "Jp",
        "rol": "Líder del proyecto"
      },
      {
        "id": 2,
        "nombre": "Oscar",
        "rol": "diseñadora de la interfaz"
      },
      {
        "id": 3,
        "nombre": "Jp 2",
        "rol": "Desarrollador Backend"
      },
      {
        "id": 4,
        "nombre": "Esteban",
        "rol": "Dar risas"
      }
    ]
  };

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(equipo));
}


function mostrarOpinion(req, res) {
  fs.readFile('opinion.html', 'utf8', (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error interno del servidor.');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}

function manejarRuta404(req, res) {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  //Cambia el mensaje por algo más divertido
  res.end('La pagina fue borrada por aliens');
}

//incluye el enlace a la documentación de createServer
const servidor = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/') {
    darBienvenida(req, res);
  } else if (url === '/escuelas') {
    getEscuelas(req, res);
  } else if (url === '/donantes') {
    getDonantes(req, res);
  }
  else if (url === '/equipo') {
    getEquipo(req, res);

  }
  else if (url === '/api/escuelas') {
    mostrarEscuelas(req, res);
  }
  else if (url === '/api/donantes') {
    mostrarDonantes(req, res);
  } else if (url === '/api/equipo') {
    mostrarEquipo(req, res);
  } else if (url === '/opinion') {
    mostrarOpinion(req, res);
  } else {
    manejarRuta404(req, res);
  }

  //Agrega una ruta /equipo y su función correspondiente para que muestre el equipo del proyecto
  //Haz una página equipo.html correspondiente
  //Escribe el nombre completo y una cualidad que valores en esa persona de tu equipo
  //Trata de agregar una imagen a opinion.html
  //Explica si la puedes ver, en caso negativo ¿qué crees que pase?

  //Agrega una ruta /opinion
  //Haz una página opinion.html
  // Lee el siguiente artículo y responde ¿Crees que el colonialismo digital es un riesgo para tu carrera profesionl? ¿Para tu vida persona?
  //¿Qué es el freedombox?
  //https://www.aljazeera.com/opinions/2019/3/13/digital-colonialism-is-threatening-the-global-south

});

const puerto = 1984;
servidor.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});

//Importante
//En esta actividad deberás agregar en supertarea un enlace a servidor.js y al resto de los html