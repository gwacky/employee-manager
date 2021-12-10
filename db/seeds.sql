INSERT INTO department (name)
VALUES ('Sales'), ('Finance'), ('Engineering'), ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES  ('Salesperson', 80000, 1),
        ('Account Manager', 160000, 2),
        ('Accountant', 125000, 2),
        ('Lead Engineer', 150000, 3), 
        ('Software Engineer', 120000, 3),
        ('Legal Team Lead', 250000, 4),
        ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES  ('Grace', 'Cunningham', null, 3),
        ('Hunter', 'Trammell', null, 2),
        ('Monica', 'Garcia', null, 1),
        ('Derek', 'Cosby', null, 4),
        ('Sally', 'Hill', null, 3),
        ('Alan', 'Jones', null, 2),
        ('Joy', 'Williamson', null, 1);