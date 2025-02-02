/** ******************** Teachers *********************** **/

/**
 * Crea en bloque topics en un curso.
 *
 * @param {string} courseId - ID del curso.
 * @param {Array<string>} topicNames - Array con los nombres de los topics a crear.
 */
Classroom.Courses.Teachers.createBulk = function (courseId, teacherIds) {
    teacherIds.forEach((teacherId) => {
      try {
        let teacher = Classroom.newTeacher();
        teacher.courseId = courseId;
        teacher.userId = teacherId;
        Classroom.Courses.Teachers.create(teacher);
      } catch (e) {
        console.warn(`Error al add teacher "${teacherId}" en el curso ${courseId}:`, e.message);
      }
    })
  }