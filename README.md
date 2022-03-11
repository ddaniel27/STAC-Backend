### STAC Backend Tecnical Skill Test

En este repositorio se encuentra mi solución a la prueba técnica propuesta. Para instalarlo, simplemente clone el repositorio con `git clone` e instale todas las dependencias con `npm install`. Posteriormente usar el comando `npm start` para iniciar la aplicación.
Adicional, se necesita un archivo con las variables de entorno `.env`, dicho archivo se proporciona en el correo de notificación de terminación del test. Las variables de entorno son las siguientes:
- MONGO_URI: la URI de la base de datos de prueba usada para el desarrollo del ejercicio
- PORT: el puerto donde la aplicación estará escuchando por peticiones
- ENV: El entorno del inicio del proyecto. En caso de ser `TEST`, el proyecto iniciará realizando las pruebas unitarias para corroborar que todo funciona como se espera.

## Estructura
El proyecto se divide en cinco partes:
- index.js: es el archivo principal donde se configura todo el servidor.
- router/route.js : es el archivo de rutas del servidor, aquí se llaman a los controladores respecctivos de cada endpoint
- controllers: es la carpeta donde se guardan los controladores de cada endpoint para tener un control más ordenado de las funciones y así mismo su mantenibilidad sea mayor
- models: los modelos de la base de datos usados por MongoDB
- tests: la carpeta de tests donde se deben guardar los archivos de test que se deseen realizar a la aplicación

## Tecnologías
Las tecnologías usadas para este desarrollo fueron:
- ExpressJS
- MongoDB
- Mongoose
- Mocha
- Chai
- Postman
- Librerías adicionales para el correcto funcionamiento y aumento de capacidades de las anteriormente mencionadas
