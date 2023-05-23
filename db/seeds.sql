INSERT INTO department (name)
VALUES
  ('Operations'),
  ('Marketing'),
  ('HR'),
  ('Sales');
  
INSERT INTO role (title, salary, department_id)
VALUES
  ('Onboarding', 40000, 3),
  ('Sales Consoltant', 45000, 4),
  ('Floor Manager', 50000, 1),
  ('Advertisement Lead', 60000, 2),
  ('HR Lead', 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Monstertrucks', 1, 5),
  ('Janet', 'Spikyshoes', 3, 4),
  ('Casey', 'Fruitsnacks', 2, 2),
  ('Zachary', 'Cheeseburgers', 4, null),
  ('Emma', 'Flipflops', 5, null),
  ('Danny', 'Skateboards', 1, 5);