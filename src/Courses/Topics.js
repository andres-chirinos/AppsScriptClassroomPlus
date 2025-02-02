/** ******************** Topics *********************** **/

/**
 * Crea en bloque topics en un curso.
 *
 * @param {string} courseId - ID del curso.
 * @param {Array<string>} topicNames - Array con los nombres de los topics a crear.
 */
Classroom.Courses.Topics.createBulk = function (courseId, topicNames) {
    topicNames.forEach(topicName => {
      try {
        let topic = Classroom.newTopic();
        topic.name = topicName;
        topic.courseId = courseId;
        Classroom.Courses.Topics.create(topic);
      } catch (e) {
        console.warn(`Error al crear el topic "${topicName}" en el curso ${courseId}:`, e.message);
      }
    });
  };