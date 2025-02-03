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

CREATE TABLE notification (
    notification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    details TEXT NOT NULL,
    user_id UUID NOT NULL,
    user_type TEXT NOT NULL CHECK (user_type IN ('employee', 'employer')),
    sender_id UUID NULL,
    type TEXT NOT NULL,
    status TEXT NULL,
    time TIMESTAMP DEFAULT NOW(),
    job_id INTEGER NULL,
    CONSTRAINT fk_notification_job FOREIGN KEY (job_id) REFERENCES job_post (post_id) ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION check_user_exists(sender_id UUID) RETURNS BOOLEAN AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM employee WHERE employee_id = sender_id) OR EXISTS (SELECT 1 FROM employer WHERE employer_id = sender_id) THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE; 
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION enforce_user_exists()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT check_user_exists(NEW.sender_id) THEN
        RAISE EXCEPTION 'User ID does not exist in employee or employer table';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_user_exists
BEFORE INSERT ON notification
FOR EACH ROW
EXECUTE FUNCTION enforce_user_exists();
