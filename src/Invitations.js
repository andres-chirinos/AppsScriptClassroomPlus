/** ******************** Invitations *********************** **/

/**
 * Lista todas las invitaciones (paginado) y devuelve un array con las invitaciones.
 */
Classroom.Invitations.listAll = function () {
    let invitations = [];
    let pageToken = null;
  
    do {
      let response = Classroom.Invitations.list({ pageToken: pageToken });
      if (response.invitations) {
        invitations = invitations.concat(response.invitations);
      }
      pageToken = response.nextPageToken;
    } while (pageToken);
  
    return invitations;
  };
  
  /**
   * Crea invitaciones en bloque para un curso dado, asignando un rol a cada usuario.
   *
   * @param {string} courseId - ID del curso.
   * @param {string} role - Rol a asignar (por ejemplo, STUDENT o TEACHER).
   * @param {Array<string>} userIds - Array con los IDs de los usuarios.
   */
  Classroom.Invitations.createBulk = function (courseId, role, userIds) {
    userIds.forEach(userId => {
      try {
        let invitation = Classroom.newInvitation();
        invitation.courseId = courseId;
        invitation.role = role;
        invitation.userId = userId;
        Classroom.Invitations.create(invitation);
      } catch (e) {
        console.warn(`Error al invitar a ${userId} en el curso ${courseId}:`, e.message);
      }
    });
  };
  
  /**
   * Elimina en bloque las invitaciones para un curso dado, rol y lista de usuarios.
   * Primero lista todas las invitaciones, filtra las que coincidan con el curso, rol y usuario,
   * y luego las elimina una a una.
   *
   * @param {string} courseId - ID del curso.
   * @param {string} role - Rol asignado en la invitación.
   * @param {Array<string>} userIds - Array con los IDs de los usuarios.
   */
  Classroom.Invitations.removeBulk = function (courseId, role, userIds) {
    // Obtener todas las invitaciones existentes
    let allInvitations = Classroom.Invitations.listAll();
  
    userIds.forEach(userId => {
      // Filtrar la invitación que corresponde al curso, rol y usuario
      let invitationToRemove = allInvitations.find(invite => {
        return invite.courseId === courseId &&
          invite.role === role &&
          invite.userId === userId;
      });
  
      if (invitationToRemove) {
        try {
          // Para eliminar la invitación se requiere su ID
          Classroom.Invitations.remove(invitationToRemove.id);
        } catch (e) {
          console.warn(`Error al eliminar la invitación para ${userId} en el curso ${courseId}:`, e.message);
        }
      } else {
        console.warn(`No se encontró invitación para ${userId} en el curso ${courseId} con rol ${role}.`);
      }
    });
  };
  