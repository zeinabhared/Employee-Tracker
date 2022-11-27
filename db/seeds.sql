INSERT INTO department (department_name)
VALUES  ("Sales & Marketing"),
        ("IT"),
        ("Finance & Accounting"),
        ("Operations"),
        ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Lead", 60000, 1),
        ("Marketing Coordinator", 70000, 1),
        ("Software Engineer", 120000, 2),
        ("Front End Developer", 90000, 2),
        ("Accountant", 125000, 3),
        ("Financial Analyst", 140000, 3),
        ("Operations Manager", 100000, 4),
        ("Project Manager", 80000, 4),
        ("HR Coordinator", 65000, 5),
        ("HR Manager", 85000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Jasper", "Williams", 1, 5),
        ("Sabrina", "Ahmed", 2, 1),
        ("Allison", "Roberts", 3, null),
        ("Jose", "Martinez", 4, 3),
        ("Mohamed", "Ali", 5, null),
        ("Ashley", "Lopez", 2, null),
        ("Tom", "Nguyen", 4, 6),
        ("Jasmine", "Sanchez", 1, 2),
        ("Kimberly", "Hoang", 5, null),
        ("Dane", "Johnson", 6, 4);