
// here add all native code for create tables
// used in /config/database
exports.Tables = [
  `
  CREATE TABLE IF NOT EXISTS teachers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      speciality VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      status ENUM('active', 'suspended') DEFAULT 'active',
      role ENUM('teacher') DEFAULT 'teacher',
      deleted_at TIMESTAMP NULL DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS quizzes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      teacher_id INT,
      attempLimit INT,
      viewAnswers BOOLEAN DEFAULT FALSE,
      seeResult BOOLEAN DEFAULT FALSE,
      successScore FLOAT DEFAULT 0.0,
      status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
      deleted_at TIMESTAMP NULL DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE SET NULL
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS questions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      text VARCHAR(255) NOT NULL,
      quiz_id INT,
      numberOfPoints FLOAT DEFAULT 0.0,
      image TEXT NULL,
      deleted_at TIMESTAMP NULL DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
  );
  `,

  `
  CREATE TABLE IF NOT EXISTS answers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      text VARCHAR(255) NOT NULL,
      question_id INT,
      deleted_at TIMESTAMP NULL DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS classes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      teacher_id INT UNIQUE NOT NULL,  
      status ENUM('active', 'suspended') DEFAULT 'active',
      deleted_at TIMESTAMP NULL DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    status ENUM('active', 'suspended') DEFAULT 'active',
    role ENUM('student') DEFAULT 'student',
    class_id INT NULL, 
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL
  );
  `,
  `
CREATE TABLE IF NOT EXISTS attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  score FLOAT DEFAULT 0.0,
  win BOOLEAN DEFAULT FALSE,
  status ENUM('active', 'deactivate') DEFAULT 'active',  
  student_id INT NULL, 
  quiz_id INT NULL, 
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE SET NULL,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE SET NULL
);
`,
  `
CREATE TABLE IF NOT EXISTS quizperstudent (
id INT AUTO_INCREMENT PRIMARY KEY,
status ENUM('active', 'deactivate') DEFAULT 'active',  
student_id INT, 
quiz_id INT, 
deleted_at TIMESTAMP NULL DEFAULT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE SET NULL,
FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE SET NULL
);
`
  ,
  `
CREATE TABLE IF NOT EXISTS requests (
id INT AUTO_INCREMENT PRIMARY KEY,
status ENUM('pending','accept', 'decline') DEFAULT 'pending',  
student_id INT, 
quiz_id INT, 
description TEXT,
deleted_at TIMESTAMP NULL DEFAULT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE SET NULL,
FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE SET NULL
);
`,
  `
  CREATE TABLE IF NOT EXISTS subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    subSubject_id INT NULL,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subSubject_id) REFERENCES subjects(id) ON DELETE SET NULL
    )
    `
];


