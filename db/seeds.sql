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
VALUES  ('Will', 'James', null, 3),
        ('Hunter', 'Trammell', null, 2),
        ('Cody', 'Simmons', null, 1),
        ('Derek', 'Cosby', null, 4),
        ('Sally', 'Fever', null, 3),
        ('Alan', 'Ramey', null, 2),
        ('Joy', 'Hank', null, 1);