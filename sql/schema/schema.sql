-- Drop tables if they exist
DROP TABLE IF EXISTS asset_bookings;
DROP TABLE IF EXISTS travel_requests;
DROP TABLE IF EXISTS assets;
DROP TABLE IF EXISTS maintenance_issues;
DROP TABLE IF EXISTS expense_reports;
DROP TABLE IF EXISTS sick_leave_requests;
DROP TABLE IF EXISTS devices;
DROP TABLE IF EXISTS users;

-- Users table for authentication and basic info
CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       email VARCHAR(255) UNIQUE NOT NULL,
                       name VARCHAR(255) NOT NULL,
                       role VARCHAR(50) DEFAULT 'employee',
                       manager_id INTEGER REFERENCES users(id),
                       created_at TIMESTAMP DEFAULT NOW(),
                       updated_at TIMESTAMP DEFAULT NOW()
);

-- Sick Leave Management
CREATE TABLE sick_leave_requests (
                                     id SERIAL PRIMARY KEY,
                                     user_id INTEGER REFERENCES users(id) NOT NULL,
                                     start_date DATE NOT NULL,
                                     end_date DATE NOT NULL,
                                     status VARCHAR(50) DEFAULT 'pending',
                                     manager_comments TEXT,
                                     created_at TIMESTAMP DEFAULT NOW(),
                                     updated_at TIMESTAMP DEFAULT NOW()
);

-- Expense Reports
CREATE TABLE expense_reports (
                                 id SERIAL PRIMARY KEY,
                                 user_id INTEGER REFERENCES users(id) NOT NULL,
                                 amount DECIMAL(10,2) NOT NULL,
                                 currency VARCHAR(3) DEFAULT 'USD',
                                 category VARCHAR(100) NOT NULL,
                                 description TEXT,
                                 receipt_url VARCHAR(500),
                                 ocr_data JSONB,
                                 status VARCHAR(50) DEFAULT 'pending',
                                 manager_comments TEXT,
                                 created_at TIMESTAMP DEFAULT NOW(),
                                 updated_at TIMESTAMP DEFAULT NOW()
);

-- Maintenance Issues
CREATE TABLE maintenance_issues (
                                    id SERIAL PRIMARY KEY,
                                    user_id INTEGER REFERENCES users(id) NOT NULL,
                                    issue_type VARCHAR(100) NOT NULL,
                                    description TEXT NOT NULL,
                                    device_serial_number VARCHAR(255),
                                    status VARCHAR(50) DEFAULT 'new',
                                    assigned_to INTEGER REFERENCES users(id),
                                    priority VARCHAR(20) DEFAULT 'medium',
                                    comments TEXT,
                                    created_at TIMESTAMP DEFAULT NOW(),
                                    updated_at TIMESTAMP DEFAULT NOW()
);

-- Devices for maintenance tracking
CREATE TABLE devices (
                         id SERIAL PRIMARY KEY,
                         serial_number VARCHAR(255) UNIQUE NOT NULL,
                         type VARCHAR(100) NOT NULL,
                         model VARCHAR(255),
                         location VARCHAR(255),
                         purchase_date DATE,
                         warranty_expiry DATE,
                         status VARCHAR(50) DEFAULT 'active',
                         created_at TIMESTAMP DEFAULT NOW(),
                         updated_at TIMESTAMP DEFAULT NOW()
);

-- Corporate Travel
CREATE TABLE travel_requests (
                                 id SERIAL PRIMARY KEY,
                                 user_id INTEGER REFERENCES users(id) NOT NULL,
                                 destination VARCHAR(255) NOT NULL,
                                 departure_date DATE NOT NULL,
                                 return_date DATE NOT NULL,
                                 purpose TEXT,
                                 status VARCHAR(50) DEFAULT 'draft',
                                 estimated_cost DECIMAL(10,2),
                                 created_at TIMESTAMP DEFAULT NOW(),
                                 updated_at TIMESTAMP DEFAULT NOW()
);

-- Asset Management
CREATE TABLE assets (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        type VARCHAR(100) NOT NULL,
                        available BOOLEAN DEFAULT true,
                        created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE asset_bookings (
                                id SERIAL PRIMARY KEY,
                                user_id INTEGER REFERENCES users(id) NOT NULL,
                                asset_id INTEGER REFERENCES assets(id) NOT NULL,
                                start_date DATE NOT NULL,
                                end_date DATE NOT NULL,
                                status VARCHAR(50) DEFAULT 'active',
                                created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_sick_leave_user_id ON sick_leave_requests(user_id);
CREATE INDEX idx_sick_leave_status ON sick_leave_requests(status);
CREATE INDEX idx_expense_reports_user_id ON expense_reports(user_id);
CREATE INDEX idx_expense_reports_status ON expense_reports(status);
CREATE INDEX idx_maintenance_issues_user_id ON maintenance_issues(user_id);
CREATE INDEX idx_maintenance_issues_status ON maintenance_issues(status);
CREATE INDEX idx_devices_type ON devices(type);
CREATE INDEX idx_devices_status ON devices(status);