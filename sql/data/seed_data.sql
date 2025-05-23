-- Insert mock users
INSERT INTO users (email, name, role) VALUES
                                          ('john.doe@company.com', 'John Doe', 'manager'),
                                          ('jane.smith@company.com', 'Jane Smith', 'employee'),
                                          ('bob.wilson@company.com', 'Bob Wilson', 'employee'),
                                          ('alice.johnson@company.com', 'Alice Johnson', 'manager'),
                                          ('charlie.brown@company.com', 'Charlie Brown', 'employee');

-- Update manager_id for employees
UPDATE users SET manager_id = (SELECT id FROM users WHERE email = 'john.doe@company.com')
WHERE email IN ('jane.smith@company.com', 'bob.wilson@company.com');
UPDATE users SET manager_id = (SELECT id FROM users WHERE email = 'alice.johnson@company.com')
WHERE email = 'charlie.brown@company.com';

-- Insert mock sick leave requests
INSERT INTO sick_leave_requests (user_id, start_date, end_date, status, manager_comments) VALUES
                                                                                              ((SELECT id FROM users WHERE email = 'jane.smith@company.com'), '2024-03-15', '2024-03-17', 'approved', 'Get well soon'),
                                                                                              ((SELECT id FROM users WHERE email = 'bob.wilson@company.com'), '2024-03-20', '2024-03-22', 'pending', NULL),
                                                                                              ((SELECT id FROM users WHERE email = 'charlie.brown@company.com'), '2024-03-25', '2024-03-26', 'rejected', 'High workload period');

-- Insert mock expense reports
INSERT INTO expense_reports (user_id, amount, currency, category, description, status) VALUES
                                                                                           ((SELECT id FROM users WHERE email = 'jane.smith@company.com'), 150.50, 'USD', 'Office Supplies', 'Printer cartridges and paper', 'approved'),
                                                                                           ((SELECT id FROM users WHERE email = 'bob.wilson@company.com'), 75.25, 'USD', 'Transportation', 'Taxi to client meeting', 'pending'),
                                                                                           ((SELECT id FROM users WHERE email = 'charlie.brown@company.com'), 200.00, 'USD', 'Training', 'Online course subscription', 'pending');

-- Insert mock devices
INSERT INTO devices (serial_number, type, model, location, purchase_date, warranty_expiry, status) VALUES
                                                                                                       ('LP123456', 'Laptop', 'MacBook Pro 2023', 'Office 101', '2023-01-15', '2026-01-15', 'active'),
                                                                                                       ('PR789012', 'Printer', 'HP LaserJet Pro', 'Office 102', '2023-02-20', '2025-02-20', 'active'),
                                                                                                       ('MON345678', 'Monitor', 'Dell 27"', 'Office 103', '2023-03-25', '2025-03-25', 'maintenance');

-- Insert mock maintenance issues
INSERT INTO maintenance_issues (user_id, issue_type, description, device_serial_number, status, assigned_to, priority) VALUES
                                                                                                                           ((SELECT id FROM users WHERE email = 'jane.smith@company.com'), 'Hardware', 'Laptop not charging', 'LP123456', 'in_progress',
                                                                                                                            (SELECT id FROM users WHERE email = 'john.doe@company.com'), 'high'),
                                                                                                                           ((SELECT id FROM users WHERE email = 'bob.wilson@company.com'), 'Software', 'Email client not working', NULL, 'new',
                                                                                                                            NULL, 'medium'),
                                                                                                                           ((SELECT id FROM users WHERE email = 'charlie.brown@company.com'), 'Hardware', 'Monitor flickering', 'MON345678', 'new',
                                                                                                                            NULL, 'low');

-- Insert mock travel requests
INSERT INTO travel_requests (user_id, destination, departure_date, return_date, purpose, status, estimated_cost) VALUES
                                                                                                                     ((SELECT id FROM users WHERE email = 'jane.smith@company.com'), 'New York', '2024-04-10', '2024-04-15', 'Client Meeting', 'approved', 1500.00),
                                                                                                                     ((SELECT id FROM users WHERE email = 'bob.wilson@company.com'), 'London', '2024-04-20', '2024-04-25', 'Conference', 'pending', 2500.00),
                                                                                                                     ((SELECT id FROM users WHERE email = 'charlie.brown@company.com'), 'San Francisco', '2024-05-01', '2024-05-05', 'Training', 'draft', 2000.00);

-- Insert mock assets
INSERT INTO assets (name, type, available) VALUES
                                               ('Conference Room A', 'Meeting Room', true),
                                               ('Projector 1', 'Equipment', true),
                                               ('Company Car 1', 'Vehicle', true);

-- Insert mock asset bookings
INSERT INTO asset_bookings (user_id, asset_id, start_date, end_date, status) VALUES
                                                                                 ((SELECT id FROM users WHERE email = 'jane.smith@company.com'),
                                                                                  (SELECT id FROM assets WHERE name = 'Conference Room A'),
                                                                                  '2024-03-20', '2024-03-20', 'active'),
                                                                                 ((SELECT id FROM users WHERE email = 'bob.wilson@company.com'),
                                                                                  (SELECT id FROM assets WHERE name = 'Projector 1'),
                                                                                  '2024-03-21', '2024-03-22', 'active'),
                                                                                 ((SELECT id FROM users WHERE email = 'charlie.brown@company.com'),
                                                                                  (SELECT id FROM assets WHERE name = 'Company Car 1'),
                                                                                  '2024-03-25', '2024-03-26', 'active');