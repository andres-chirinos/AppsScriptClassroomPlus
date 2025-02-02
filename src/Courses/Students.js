/** ******************** Students *********************** **/

/**
 * Lista todos los estudiantes de un curso (paginado) y devuelve un array con los estudiantes.
 *
 * @param {string} courseId - ID del curso.
 * @returns {Array<Object>} - Array con los objetos de estudiante.
 */
Classroom.Courses.Students.listAll = function (courseId) {
    let students = [];
    let pageToken = null;
  
    do {
      let response = Classroom.Courses.Students.list(courseId, { pageToken: pageToken });
      if (response.students) {
        students = students.concat(response.students);
      }
      pageToken = response.nextPageToken;
    } while (pageToken);
  
    return students;
  };
  
  /**
   * Añade en bloque estudiantes a un curso.
   *
   * @param {string} courseId - ID del curso.
   * @param {Array<string>} userIds - Array con los IDs de los usuarios.
   */
  Classroom.Courses.Students.createBulk = function (courseId, userIds) {
    userIds.forEach(userId => {
      try {
        let student = Classroom.newStudent();
        student.userId = userId;
        Classroom.Courses.Students.create(student, courseId);
      } catch (e) {
        console.warn(`Error al añadir a ${userId} en el curso ${courseId}:`, e.message);
      }
    });
  };
  
  /**
   * Elimina en bloque estudiantes de un curso.
   *
   * @param {string} courseId - ID del curso.
   * @param {Array<string>} userIds - Array con los IDs de los usuarios.
   */
  Classroom.Courses.Students.removeBulk = function (courseId, userIds) {
    userIds.forEach(userId => {
      try {
        Classroom.Courses.Students.remove(courseId, userId);
      } catch (e) {
        console.warn(`Error al eliminar a ${userId} en el curso ${courseId}:`, e.message);
      }
    });
  };
  