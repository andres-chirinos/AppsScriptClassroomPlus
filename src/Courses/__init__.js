/** ******************** Courses *********************** **/

/**
 * Lista todos los cursos (paginados) y devuelve un array con los cursos.
 */

Classroom.Courses.listAll = function () {
    let courses = [];
    let pageToken = null;

    do {
        let response = Classroom.Courses.list({ pageToken: pageToken });
        if (response.courses) {
            courses = courses.concat(response.courses);
        }
        pageToken = response.nextPageToken;
    } while (pageToken);

    return courses;
};

/**
 * Obtiene un curso usando el alternateLink.
 * El parámetro alternateLink puede ser la URL completa (ejemplo: 
 * "https://classroom.google.com/c/ID_DEL_CURSO") o bien solo el ID (la parte posterior a "/c/").
 */
Classroom.Courses.getByAlternateLink = function (alternateLink) {
    const courses = Classroom.Courses.listAll();
    return courses.find(course => course.alternateLink.includes(alternateLink));
};