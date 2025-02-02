# ClassroomPlus

ClassroomPlus es una serie de extensiones para la API de Google Classroom en Google Apps Script, diseñadas para facilitar la funcionalidad e integración dentro del ecosistema de Google Apps Script.

## Características

- **Gestión de Cursos**: Listar todos los cursos, obtener cursos por enlace alternativo.
- **Gestión de Estudiantes**: Listar todos los estudiantes de un curso, añadir y eliminar estudiantes en bloque.
- **Gestión de Profesores**: Añadir profesores en bloque a un curso.
- **Gestión de Temas**: Crear temas en bloque en un curso.
- **Gestión de Invitaciones**: Crear y eliminar invitaciones en bloque para un curso.

## Instalación

1. Clona el repositorio:

   ```sh
   git clone https://github.com/tu-usuario/classroomplus.git
   cd classroomplus
   ```

2. Instala las dependencias

   ```sh
   npm install
   ```

3. Configura `clasp` con tu script de Google Apps:
   ```sh
   clasp login
   clasp push
   ```

## Uso
### Listar todos los cursos
```js
const courses = Classroom.Courses.listAll();
console.log(courses);
```
### Obtener un curso por enlace alternativo
```js
const course = Classroom.Courses.getByAlternateLink('https://classroom.google.com/c/ID_DEL_CURSO');
console.log(course);
```
### Añadir estudiantes en bloque
```js
Classroom.Courses.Students.createBulk('courseId', ['userId1', 'userId2']);
```
### Eliminar estudiantes en bloque
```js
Classroom.Courses.Students.removeBulk('courseId', ['userId1', 'userId2']);
```
### Crear temas en bloque
```js
Classroom.Courses.Topics.createBulk('courseId', ['Topic1', 'Topic2']);
```
### Crear invitaciones en bloque
```js
Classroom.Invitations.createBulk('courseId', 'STUDENT', ['userId1', 'userId2']);
```
### Eliminar invitaciones en bloque
```js
Classroom.Invitations.removeBulk('courseId', 'STUDENT', ['userId1', 'userId2']);
```

## Pruebas
Para ejecutar las pruebas, utiliza el siguiente comando:
```sh
npm test
```

# Hoja de Ruta
- [ ] Implementar gestión de cursos.
- [ ] Implementar gestión de estudiantes.
- [ ] Implementar gestión de profesores.
- [ ] Implementar gestión de temas.
- [ ] Implementar gestión de invitaciones.
- [ ] Añadir más casos de prueba.
- [ ] Mejorar la documentación.
- [ ] Añadir soporte para más funcionalidades de la API de Google Classroom.

# Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para discutir cualquier cambio que desees realizar.

# Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.