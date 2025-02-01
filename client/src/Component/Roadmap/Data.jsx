
const nodeData = [
    {
        id: 1,
        name: "Foundations of programming",
        details: ["Understand the basics of programming", "Learn the basics of programming languages", "data structures and algorithms", "Algorithmic thinking", "Problem-solving skills", "Object-oriented programming"],
    },
    {
        id: 2,
        name: "Software Development",
        details: ["Learn about software development", "Software development life cycle", "Software development methodologies", "Software development tools", "Version control systems", "Software testing"],
    },
    {
        id: 3,
        name: "Web Development",
        details: ["Learn about web development", "Frontend development", "Backend development", "Full-stack development", "Web development frameworks", "Web development tools"],
    },
    {
        id: 4,
        name: "Mobile Development",
        details: ["Learn about mobile development", "Android development", "iOS development", "Cross-platform development", "Mobile development frameworks", "Mobile development tools"],
    },
    {
        id: 5,
        name: "Cloud Computing",
        details: ["Learn about cloud computing", "Cloud computing services", "Cloud computing models", "Cloud computing platforms", "Cloud computing tools", "Cloud computing security"],
    },
    {
        id: 6,
        name: "DevOps",
        details: ["Learn about DevOps", "DevOps principles", "DevOps practices", "DevOps tools", "DevOps automation", "DevOps monitoring"],
    },
    {
        id: 7,
        name: "Data Science",
        details: ["Learn about data science", "Data science concepts", "Data science tools", "Data science programming languages", "Data science libraries", "Data science frameworks"],
    },
    {
        id: 8,
        name: "Machine Learning",
        details: ["Learn about machine learning", "Machine learning algorithms", "Machine learning models", "Machine learning tools", "Machine learning frameworks", "Machine learning libraries"],
    },
    {
        id: 9,
        name: "Artificial Intelligence",
        details: ["Learn about artificial intelligence", "Artificial intelligence concepts", "Artificial intelligence tools", "Artificial intelligence programming languages", "Artificial intelligence frameworks", "Artificial intelligence libraries"],
    },
    {
        id: 10,
        name: "Cybersecurity",
        details: ["Learn about cybersecurity", "Cybersecurity concepts", "Cybersecurity tools", "Cybersecurity programming languages", "Cybersecurity frameworks", "Cybersecurity libraries"],
    }
]

const newNodeData = [
    {
        "id": "1",
        "name": "Programming Foundations",
        "details": [
            "Variables and Data Types",
            "Control Flow (if-else, loops)",
            "Functions and Modularity",
            "Object-Oriented Programming (OOP) Principles",
            "Data Structures (Arrays, Lists, Dictionaries, Sets, Maps)",
            "Algorithms and Problem Solving",
            "Debugging and Error Handling",
            "Version Control with Git",
            "Input/Output Operations",
            "Working with Libraries and Frameworks",
            "Testing Fundamentals (Unit, Integration)",
            "Code Style and Readability",
            "Understanding Compiler/Interpreter",
            "Memory Management Basics",
            "Concurrency and Parallelism Basics"
        ]
    },
    {
        "id": "2",
        "name": "Software Development Lifecycle",
        "details": [
            "Requirements Gathering and Analysis",
            "Software Design Principles (SOLID, DRY, KISS, YAGNI)",
            "Agile Development Methodologies (Scrum, Kanban, XP)",
            "Testing Methodologies (Unit, Integration, System, Acceptance)",
            "Code Review Best Practices",
            "Software Deployment and Maintenance",
            "Understanding Software Architecture (Microservices, Monolithic)",
            "Project Management Basics",
            "Risk Management",
            "Software Documentation",
            "Configuration Management",
            "Build Automation",
            "Continuous Integration and Continuous Delivery (CI/CD) Pipelines",
            "Understanding different SDLC models (Waterfall, Iterative)",
            "Performance Optimization"
        ]
    },
    {
        "id": "3",
        "name": "DevOps Practices",
        "details": [
            "Continuous Integration and Continuous Delivery (CI/CD)",
            "Infrastructure as Code (IaC) (Terraform, CloudFormation)",
            "Configuration Management (Ansible, Puppet, Chef)",
            "Containerization (Docker, Kubernetes)",
            "Monitoring and Logging (Prometheus, Grafana, ELK stack)",
            "Automated Testing and Deployment",
            "Cloud Computing Platforms (AWS, Azure, GCP)",
            "DevOps Tools and Best Practices",
            "Linux System Administration",
            "Networking Fundamentals",
            "Security Best Practices in DevOps",
            "Performance Monitoring and Tuning",
            "Disaster Recovery and Business Continuity",
            "Automation Scripting (Bash, Python)",
            "Collaboration and Communication in DevOps"
        ]
    },
    {
        "id": "4",
        "name": "Cloud Computing",
        "details": [
            "Cloud Computing Models (IaaS, PaaS, SaaS)",
            "Cloud Service Providers (AWS, Azure, GCP)",
            "Virtualization and Containerization",
            "Cloud Storage and Databases (Relational, NoSQL)",
            "Networking in the Cloud (VPCs, Subnets, Load Balancers)",
            "Security in the Cloud (IAM, Security Groups)",
            "Serverless Computing (Lambda, Functions)",
            "Cloud Cost Management",
            "Cloud Architecture Patterns",
            "Microservices in the Cloud",
            "DevOps on Cloud",
            "Cloud-Native Applications",
            "Data Analytics on Cloud",
            "Machine Learning on Cloud",
            "Compliance and Governance in Cloud"
        ]
    },
    {
        "id": "5",
        "name": "Data Science Fundamentals",
        "details": [
            "Data Collection and Preprocessing (Cleaning, Transformation)",
            "Exploratory Data Analysis (EDA) (Descriptive Statistics, Data Visualization)",
            "Data Visualization (Matplotlib, Seaborn, Plotly)",
            "Machine Learning Algorithms (Supervised, Unsupervised, Reinforcement)",
            "Model Evaluation and Selection (Metrics, Cross-validation)",
            "Statistical Analysis and Hypothesis Testing",
            "Data Storytelling and Communication",
            "Big Data Technologies (Hadoop, Spark)",
            "Data Wrangling (Pandas, NumPy)",
            "Feature Engineering",
            "Deep Learning Basics",
            "Natural Language Processing (NLP) Fundamentals",
            "Computer Vision Basics",
            "Model Deployment and Serving",
            "Ethical Considerations in Data Science"
        ]
    },
    {
        "id": "6",
        "name": "Frontend Development",
        "details": [
            "HTML5",
            "CSS3",
            "JavaScript (ES6+)",
            "DOM Manipulation",
            "Responsive Web Design",
            "Frontend Frameworks (React, Angular, Vue)",
            "State Management",
            "Testing (Unit, Integration, E2E)",
            "Performance Optimization",
            "Accessibility",
            "Build Tools (Webpack, Parcel)",
            "Version Control",
            "UI/UX Principles",
            "Cross-browser Compatibility",
            "API Integration"
        ]
    },
    {
        "id": "7",
        "name": "Backend Development",
        "details": [
            "Server-Side Languages (Python, Java, Node.js, Go)",
            "Frameworks (Django, Spring, Express.js, Gin)",
            "Databases (SQL, NoSQL)",
            "API Design (RESTful, GraphQL)",
            "Authentication and Authorization",
            "Security Best Practices",
            "Testing (Unit, Integration)",
            "Deployment and Scaling",
            "Caching Strategies",
            "Message Queues",
            "Background Jobs",
            "Logging and Monitoring",
            "Performance Optimization",
            "Microservices Architecture",
            "Serverless Functions"
        ]
    },
    {
        "id": "8",
        "name": "Mobile Development (Android)",
        "details": [
            "Java/Kotlin",
            "Android SDK",
            "Android Studio",
            "UI Design (XML, Jetpack Compose)",
            "Data Persistence (SQLite, Room)",
            "Networking",
            "Background Tasks",
            "Testing",
            "Performance Optimization",
            "Firebase Integration",
            "Google Play Store Deployment",
            "Mobile Architecture Patterns (MVVM, MVP)",
            "Dependency Injection",
            "UI Testing",
            "Accessibility"
        ]
    },
    {
        "id": "9",
        "name": "Mobile Development (iOS)",
        "details": [
            "Swift/Objective-C",
            "iOS SDK",
            "Xcode",
            "UI Design (Storyboards, SwiftUI)",
            "Data Persistence (Core Data, Realm)",
            "Networking",
            "Background Tasks",
            "Testing",
            "Performance Optimization",
            "App Store Deployment",
            "iOS Architecture Patterns (MVC, MVVM, VIPER)",
            "Dependency Injection",
            "UI Testing",
            "Accessibility",
            "Memory Management"
        ]
    },
    {
        "id": "10",
        "name": "Database Management",
        "details": [
            "SQL (Structured Query Language)",
            "Relational Database Management Systems (RDBMS) (MySQL, PostgreSQL)",
            "NoSQL Databases (MongoDB, Cassandra, Redis)",
            "Database Design (Normalization, Denormalization)",
            "Data Modeling",
            "Database Administration",
            "Performance Tuning",
            "Security",
            "Transactions",
            "Indexing",
            "Stored Procedures",
            "Triggers",
            "Backup and Recovery",
            "Data Warehousing",
            "Big Data Databases"
        ]
    },
    {
        "id": "11",
        "name": "Software Testing",
        "details": [
            "Testing Methodologies (Agile, Waterfall)",
            "Test Levels (Unit, Integration, System, Acceptance)",
            "Test Design Techniques (Black Box, White Box)",
            "Test Automation",
            "Test Management Tools",
            "Defect Tracking",
            "Performance Testing",
            "Security Testing",
            "Usability Testing",
            "Accessibility Testing",
            "Test Planning",
            "Test Execution",
            "Test Reporting",
            "Continuous Testing",
            "Exploratory Testing"
        ]
    },
    {
        "id": "12",
        "name": "Cybersecurity Fundamentals",
        "details": [
            "Security Threats and Vulnerabilities",
            "Network Security",
            "Data Security",
            "Application Security",
            "Cryptography",
            "Security Best Practices",
            "Ethical Hacking",
            "Risk Management",
            "Security Auditing",
            "Incident Response",
            "Security Governance",
            "Compliance and Regulations",
            "Security Tools",
            "Penetration Testing",
            "Vulnerability Management"
        ]
    },
    {
        "id": "13",
        "name": "Networking",
        "details": [
            "Network Topologies",
            "Network Protocols (TCP/IP, UDP)",
            "Network Devices (Routers, Switches)",
            "IP Addressing and Subnet"
        ]
    }
];

const learningRoadmap = [
    {
        "id": "1",
        "name": "Programming Foundations",
        "details": [
            "Variables and Data Types",
            "Control Flow (if-else, loops)",
            "Functions and Modularity",
            "Object-Oriented Programming (OOP) Principles",
            "Data Structures (Arrays, Lists, Dictionaries, Sets, Maps)",
            "Algorithms and Problem Solving",
            "Debugging and Error Handling",
            "Version Control with Git",
            "Input/Output Operations",
            "Working with Libraries and Frameworks",
            "Testing Fundamentals (Unit, Integration)",
            "Code Style and Readability",
            "Understanding Compiler/Interpreter",
            "Memory Management Basics",
            "Concurrency and Parallelism Basics"
        ]
    },
    {
        "id": "2",
        "name": "Software Development Lifecycle",
        "details": [
            "Requirements Gathering and Analysis",
            "Software Design Principles (SOLID, DRY, KISS, YAGNI)",
            "Agile Development Methodologies (Scrum, Kanban, XP)",
            "Testing Methodologies (Unit, Integration, System, Acceptance)",
            "Code Review Best Practices",
            "Software Deployment and Maintenance",
            "Understanding Software Architecture (Microservices, Monolithic)",
            "Project Management Basics",
            "Risk Management",
            "Software Documentation",
            "Configuration Management",
            "Build Automation",
            "Continuous Integration and Continuous Delivery (CI/CD) Pipelines",
            "Understanding different SDLC models (Waterfall, Iterative)",
            "Performance Optimization"
        ]
    },
    {
        "id": "3",
        "name": "DevOps Practices",
        "details": [
            "Continuous Integration and Continuous Delivery (CI/CD)",
            "Infrastructure as Code (IaC) (Terraform, CloudFormation)",
            "Configuration Management (Ansible, Puppet, Chef)",
            "Containerization (Docker, Kubernetes)",
            "Monitoring and Logging (Prometheus, Grafana, ELK stack)",
            "Automated Testing and Deployment",
            "Cloud Computing Platforms (AWS, Azure, GCP)",
            "DevOps Tools and Best Practices",
            "Linux System Administration",
            "Networking Fundamentals",
            "Security Best Practices in DevOps",
            "Performance Monitoring and Tuning",
            "Disaster Recovery and Business Continuity",
            "Automation Scripting (Bash, Python)",
            "Collaboration and Communication in DevOps"
        ]
    },
    {
        "id": "4",
        "name": "Cloud Computing",
        "details": [
            "Cloud Computing Models (IaaS, PaaS, SaaS)",
            "Cloud Service Providers (AWS, Azure, GCP)",
            "Virtualization and Containerization",
            "Cloud Storage and Databases (Relational, NoSQL)",
            "Networking in the Cloud (VPCs, Subnets, Load Balancers)",
            "Security in the Cloud (IAM, Security Groups)",
            "Serverless Computing (Lambda, Functions)",
            "Cloud Cost Management",
            "Cloud Architecture Patterns",
            "Microservices in the Cloud",
            "DevOps on Cloud",
            "Cloud-Native Applications",
            "Data Analytics on Cloud",
            "Machine Learning on Cloud",
            "Compliance and Governance in Cloud"
        ]
    },
    {
        "id": "5",
        "name": "Data Science Fundamentals",
        "details": [
            "Data Collection and Preprocessing (Cleaning, Transformation)",
            "Exploratory Data Analysis (EDA) (Descriptive Statistics, Data Visualization)",
            "Data Visualization (Matplotlib, Seaborn, Plotly)",
            "Machine Learning Algorithms (Supervised, Unsupervised, Reinforcement)",
            "Model Evaluation and Selection (Metrics, Cross-validation)",
            "Statistical Analysis and Hypothesis Testing",
            "Data Storytelling and Communication",
            "Big Data Technologies (Hadoop, Spark)",
            "Data Wrangling (Pandas, NumPy)",
            "Feature Engineering",
            "Deep Learning Basics",
            "Natural Language Processing (NLP) Fundamentals",
            "Computer Vision Basics",
            "Model Deployment and Serving",
            "Ethical Considerations in Data Science"
        ]
    },
    {
        "id": "6",
        "name": "Frontend Development",
        "details": [
            "HTML5",
            "CSS3",
            "JavaScript (ES6+)",
            "DOM Manipulation",
            "Responsive Web Design",
            "Frontend Frameworks (React, Angular, Vue)",
            "State Management",
            "Testing (Unit, Integration, E2E)",
            "Performance Optimization",
            "Accessibility",
            "Build Tools (Webpack, Parcel)",
            "Version Control",
            "UI/UX Principles",
            "Cross-browser Compatibility",
            "API Integration"
        ]
    },
    {
        "id": "7",
        "name": "Backend Development",
        "details": [
            "Server-Side Languages (Python, Java, Node.js, Go)",
            "Frameworks (Django, Spring, Express.js, Gin)",
            "Databases (SQL, NoSQL)",
            "API Design (RESTful, GraphQL)",
            "Authentication and Authorization",
            "Security Best Practices",
            "Testing (Unit, Integration)",
            "Deployment and Scaling",
            "Caching Strategies",
            "Message Queues",
            "Background Jobs",
            "Logging and Monitoring",
            "Performance Optimization",
            "Microservices Architecture",
            "Serverless Functions"
        ]
    },
    {
        "id": "8",
        "name": "Mobile Development (Android)",
        "details": [
            "Java/Kotlin",
            "Android SDK",
            "Android Studio",
            "UI Design (XML, Jetpack Compose)",
            "Data Persistence (SQLite, Room)",
            "Networking",
            "Background Tasks",
            "Testing",
            "Performance Optimization",
            "Firebase Integration",
            "Google Play Store Deployment",
            "Mobile Architecture Patterns (MVVM, MVP)",
            "Dependency Injection",
            "UI Testing",
            "Accessibility"
        ]
    },
    {
        "id": "9",
        "name": "Mobile Development (iOS)",
        "details": [
            "Swift/Objective-C",
            "iOS SDK",
            "Xcode",
            "UI Design (Storyboards, SwiftUI)",
            "Data Persistence (Core Data, Realm)",
            "Networking",
            "Background Tasks",
            "Testing",
            "Performance Optimization",
            "App Store Deployment",
            "iOS Architecture Patterns (MVC, MVVM, VIPER)",
            "Dependency Injection",
            "UI Testing",
            "Accessibility",
            "Memory Management"
        ]
    },
    {
        "id": "10",
        "name": "Database Management",
        "details": [
            "SQL (Structured Query Language)",
            "Relational Database Management Systems (RDBMS) (MySQL, PostgreSQL)",
            "NoSQL Databases (MongoDB, Cassandra, Redis)",
            "Database Design (Normalization, Denormalization)",
            "Data Modeling",
            "Database Administration",
            "Performance Tuning",
            "Security",
            "Transactions",
            "Indexing",
            "Stored Procedures",
            "Triggers",
            "Backup and Recovery",
            "Data Warehousing",
            "Big Data Databases"
        ]
    },
    {
        "id": "11",
        "name": "Software Testing",
        "details": [
            "Testing Methodologies (Agile, Waterfall)",
            "Test Levels (Unit, Integration, System, Acceptance)",
            "Test Design Techniques (Black Box, White Box)",
            "Test Automation",
            "Test Management Tools",
            "Defect Tracking",
            "Performance Testing",
            "Security Testing",
            "Usability Testing",
            "Accessibility Testing",
            "Test Planning",
            "Test Execution",
            "Test Reporting",
            "Continuous Testing",
            "Exploratory Testing"
        ]
    },
    {
        "id": "12",
        "name": "Cybersecurity Fundamentals",
        "details": [
            "Security Threats and Vulnerabilities",
            "Network Security",
            "Data Security",
            "Application Security",
            "Cryptography",
            "Security Best Practices",
            "Ethical Hacking",
            "Risk Management",
            "Security Auditing",
            "Incident Response",
            "Security Governance",
            "Compliance and Regulations",
            "Security Tools",
            "Penetration Testing",
            "Vulnerability Management"
        ]
    },
]
export default nodeData;
export { newNodeData, learningRoadmap };