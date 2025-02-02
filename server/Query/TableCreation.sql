CREATE SEQUENCE employer_id_seq START WITH 5001 INCREMENT BY 1 NO MAXVALUE;

CREATE TABLE employer (
    employer_id INTEGER PRIMARY KEY DEFAULT nextval('employer_id_seq'),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_no VARCHAR(20),
    company VARCHAR(255),
    role VARCHAR(100),
    company_detail TEXT,
    bio TEXT,
    company_logo TEXT
);


CREATE TYPE education_type AS (
    institution_name VARCHAR(255),
    degree_name VARCHAR(255),
    start_year INTEGER,
    end_year INTEGER
);

CREATE TYPE experience_type AS (
    organization_name VARCHAR(255),
    role_name VARCHAR(255)
);


CREATE SEQUENCE employee_id_seq START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 4999;
CREATE TABLE employee (
    employee_id INTEGER PRIMARY KEY DEFAULT nextval('employee_id_seq'),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    bio TEXT,
    skills TEXT[],  -- Array of skills
    education education_type[],  -- Array of Education composite type
    experience experience_type[],  -- Array of Experience composite type
    phone_no VARCHAR(20),
    profile_pic TEXT,  -- URL or base64-encoded image
    cv TEXT,  -- URL or base64-encoded CV file
    CHECK (employee_id BETWEEN 1 AND 4999)  -- Ensure employee_id is between 1 and 4999
);

CREATE TABLE login (
    id INTEGER PRIMARY KEY,  
    user_type VARCHAR(10) CHECK (user_type IN ('employee', 'employer')), 
    password VARCHAR(255) NOT NULL,  
    CHECK (
        (user_type = 'employee' AND id BETWEEN 1 AND 4999) OR 
        (user_type = 'employer' AND id BETWEEN 5001 AND 9999)
    )
);

CREATE SEQUENCE employee_id_seq START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 4999;
CREATE TABLE employee (
    employee_id INTEGER PRIMARY KEY DEFAULT nextval('employee_id_seq'),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    bio TEXT,
    skills TEXT[],  -- Array of skills
    education education_type[],  -- Array of Education composite type
    experience experience_type[],  -- Array of Experience composite type
    phone_no VARCHAR(20),
    profile_pic TEXT,  -- URL or base64-encoded image
    cv TEXT,  -- URL or base64-encoded CV file
    CHECK (employee_id BETWEEN 1 AND 4999)  -- Ensure employee_id is between 1 and 4999
);

ALTER TABLE employee DROP COLUMN employee_id;
ALTER TABLE employee ADD COLUMN employee_id UUID PRIMARY KEY;


ALTER TABLE login ADD COLUMN email VARCHAR(255) UNIQUE NOT NULL;
ALTER TABLE login DROP CONSTRAINT IF EXISTS "login_user_type_check";
ALTER TABLE login DROP COLUMN id;
ALTER TABLE login ADD PRIMARY KEY (email);


ALTER TABLE employee DROP CONSTRAINT IF EXISTS "employee_id_check";


DROP SEQUENCE IF EXISTS employee_id_seq;


ALTER TABLE employer ALTER COLUMN employer_id DROP DEFAULT;


DROP SEQUENCE employer_id_seq CASCADE;

ALTER TABLE employer DROP COLUMN employer_id;

ALTER TABLE employer ADD COLUMN employer_id UUID PRIMARY KEY;


ALTER TABLE notification ADD COLUMN new_n_id UUID;
ALTER TABLE notification DROP COLUMN n_id;
ALTER TABLE notification RENAME COLUMN new_n_id TO n_id;
ALTER TABLE notification ADD PRIMARY KEY (n_id);


CREATE TABLE user_notification (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employee(employee_id) ON DELETE CASCADE,
    employer_id UUID REFERENCES employer(employer_id) ON DELETE CASCADE,
    n_id UUID NOT NULL REFERENCES notification(n_id) ON DELETE CASCADE,
    time TIMESTAMP DEFAULT now(),
    
    CHECK (employee_id IS NOT NULL OR employer_id IS NOT NULL),
    CHECK (NOT (employee_id IS NOT NULL AND employer_id IS NOT NULL))
);
