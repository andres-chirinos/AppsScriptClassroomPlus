const Classroom = {
    Courses: {
      list: jest.fn(),
      Students: {
        list: jest.fn(),
      },
    },
    Invitations: {
      list: jest.fn(),
      create: jest.fn(),
      remove: jest.fn(),
    },
    newInvitation: jest.fn(),
    newStudent: jest.fn(),
    newTeacher: jest.fn(),
    newTopic: jest.fn(),
  };
  
  require('./__init__.js');
  
  describe('Classroom API Extensions', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('listAll courses', () => {
      Classroom.Courses.list.mockReturnValueOnce({
        courses: [{ id: 'course1' }],
        nextPageToken: null,
      });
  
      const courses = Classroom.Courses.listAll();
      expect(courses).toEqual([{ id: 'course1' }]);
      expect(Classroom.Courses.list).toHaveBeenCalledTimes(1);
    });
  
    test('getByAlternateLink course', () => {
      Classroom.Courses.listAll = jest.fn().mockReturnValue([
        { id: 'course1', alternateLink: 'https://classroom.google.com/c/course1' },
      ]);
  
      const course = Classroom.Courses.getByAlternateLink('course1');
      expect(course).toEqual({ id: 'course1', alternateLink: 'https://classroom.google.com/c/course1' });
    });
  
    test('createBulk invitations', () => {
      Classroom.newInvitation.mockReturnValue({});
      Classroom.Invitations.create.mockImplementation(() => {});
  
      Classroom.Invitations.createBulk('course1', 'STUDENT', ['user1', 'user2']);
      expect(Classroom.Invitations.create).toHaveBeenCalledTimes(2);
    });
  
    test('removeBulk invitations', () => {
      Classroom.Invitations.listAll = jest.fn().mockReturnValue([
        { id: 'invite1', courseId: 'course1', role: 'STUDENT', userId: 'user1' },
      ]);
      Classroom.Invitations.remove.mockImplementation(() => {});
  
      Classroom.Invitations.removeBulk('course1', 'STUDENT', ['user1']);
      expect(Classroom.Invitations.remove).toHaveBeenCalledWith('invite1');
    });
  
    test('listAll students', () => {
      Classroom.Courses.Students.list.mockReturnValueOnce({
        students: [{ userId: 'student1' }],
        nextPageToken: null,
      });
  
      const students = Classroom.Courses.Students.listAll('course1');
      expect(students).toEqual([{ userId: 'student1' }]);
      expect(Classroom.Courses.Students.list).toHaveBeenCalledTimes(1);
    });
  
    test('createBulk students', () => {
      Classroom.newStudent.mockReturnValue({});
      Classroom.Courses.Students.create = jest.fn();
  
      Classroom.Courses.Students.createBulk('course1', ['user1', 'user2']);
      expect(Classroom.Courses.Students.create).toHaveBeenCalledTimes(2);
    });
  
    test('removeBulk students', () => {
      Classroom.Courses.Students.remove = jest.fn();
  
      Classroom.Courses.Students.removeBulk('course1', ['user1', 'user2']);
      expect(Classroom.Courses.Students.remove).toHaveBeenCalledTimes(2);
    });
  });