import { SmoothStepEdge } from "reactflow";

const nodes = [
    {
        id: "1", position: { x: 600, y: 50 }, data: { label: "Software Engineering" }, type: "input", style: { backgroundColor: "#F6C794", fontWeight: "bold", fontSize: "12px" },
        className: "node-hover",
    },

    // Foundations of Programming
    {
        id: "2",
        position: { x: 600, y: 250 },
        data: { label: "Foundations of Programming" },
        style: { backgroundColor: "#F6C794", fontWeight: "semiBold", },
        sourcePosition: 'right',
        targetPosition: 'left',
        className: "node-hover",
    },
    {
        id: "3",
        position: { x: 300, y: 150 },
        data: { label: "Understanding Basic Programming Concepts" },
        sourcePosition: 'right',
        targetPosition: 'right',
        style: { backgroundColor: "#FFF2AF" },
        className: "node-hover-side",
    },
    { id: "4", position: { x: 300, y: 250 }, data: { label: "Programming Language (Python, Java, JavaScript)" }, sourcePosition: 'right', targetPosition: 'right', style: { backgroundColor: "#FFF2AF" }, className: "node-hover-side" },
    { id: "5", position: { x: 300, y: 350 }, data: { label: "Data Structures" }, sourcePosition: 'right', targetPosition: 'right', style: { backgroundColor: "#FFF2AF" }, className: "node-hover-side" },
    { id: "6", position: { x: 900, y: 150 }, data: { label: "Algorithms" }, targetPosition: 'left', sourcePosition: 'left', style: { backgroundColor: "#FFF2AF" }, className: "node-hover-side" },
    { id: "7", position: { x: 900, y: 250 }, data: { label: "Object-Oriented Programming" }, targetPosition: 'left', sourcePosition: 'left', style: { backgroundColor: "#FFF2AF" }, className: "node-hover-side" },
    { id: "8", position: { x: 900, y: 350 }, data: { label: "Error Handling & Debugging" }, targetPosition: 'left', sourcePosition: 'left', style: { backgroundColor: "#FFF2AF" }, className: "node-hover-side" },
    {
        id: "90", position: { x: 600, y: 1250 }, data: { label: "Finish" }, style: { backgroundColor: "#F6C794", fontWeight: "bold" }, targetPosition: 'top', sourcePosition: 'top',
        className: "node-hover",
    },



    // System Design
    { id: "13", position: { x: 600, y: 500 }, data: { label: "System Design" }, style: { backgroundColor: "#F6C794" }, targetPosition: 'left', sourcePosition: 'right', className: "node-hover" },
    { id: "9", position: { x: 300, y: 450 }, data: { label: "Scalability & Load Balancing" }, targetPosition: 'right', sourcePosition: 'right', style: { backgroundColor: "#D3E2F6" }, className: "node-hover-side2" },
    { id: "10", position: { x: 300, y: 550 }, data: { label: "Microservices Architecture" }, targetPosition: 'right', sourcePosition: 'right', style: { backgroundColor: "#D3E2F6" }, className: "node-hover-side2" },
    { id: "11", position: { x: 900, y: 450 }, data: { label: "Message Queues (Kafka, RabbitMQ)" }, targetPosition: 'left', sourcePosition: "left", style: { backgroundColor: "#D3E2F6" }, className: "node-hover-side2" },
    { id: "12", position: { x: 900, y: 550 }, data: { label: "Caching (Redis, Memcached)" }, targetPosition: 'left', sourcePosition: "left", style: { backgroundColor: "#D3E2F6" }, className: "node-hover-side2" },


    { id: "20", position: { x: 600, y: 700 }, data: { label: "Software Development Methodologies" }, type: "input", style: { backgroundColor: "#F6C794", fontWeight: "bold", fontSize: "12px" } },

    // Software Development Methodologies - Left Branch
    { id: "21", position: { x: 300, y: 650 }, data: { label: "Understanding Software Development Lifecycle Models" }, style: { backgroundColor: "#FFF2AF" } },
    { id: "22", position: { x: 300, y: 750 }, data: { label: "Agile Development" }, style: { backgroundColor: "#FFF2AF" } },
    { id: "26", position: { x: 300, y: 800 }, data: { label: "Extreme Programming" }, style: { backgroundColor: "#FFF2AF" } },

    // Software Development Methodologies - Right Branch
    { id: "27", position: { x: 900, y: 650 }, data: { label: "Waterfall Model" }, style: { backgroundColor: "#FFF2AF" } },
    { id: "23", position: { x: 900, y: 700 }, data: { label: "DevOps" }, style: { backgroundColor: "#FFF2AF" } },
    { id: "24", position: { x: 900, y: 750 }, data: { label: "Scrum" }, style: { backgroundColor: "#FFF2AF" } },
    { id: "25", position: { x: 900, y: 800 }, data: { label: "Lean Development" }, style: { backgroundColor: "#FFF2AF" } },

    // Version Control Systems
    // { id: "28", position: { x: 600, y: 450 }, data: { label: "Version Control Systems" }, style: { backgroundColor: "#F6C794", fontWeight: "bold" } },
    // { id: "29", position: { x: 300, y: 500 }, data: { label: "Git" }, style: { backgroundColor: "#FFF2AF" } },
    // { id: "30", position: { x: 250, y: 570 }, data: { label: "GitHub, GitLab, Bitbucket" }, style: { backgroundColor: "#FFF2AF" } },
    // { id: "31", position: { x: 250, y: 640 }, data: { label: "Working with Repositories (Local & Remote)" }, style: { backgroundColor: "#FFF2AF" } },
    // { id: "32", position: { x: 900, y: 500 }, data: { label: "Branching and Merging" }, style: { backgroundColor: "#FFF2AF" } },
    // { id: "33", position: { x: 900, y: 570 }, data: { label: "Resolving Merge Conflicts" }, style: { backgroundColor: "#FFF2AF" } },
    // { id: "34", position: { x: 900, y: 640 }, data: { label: "Collaboration with Other Developers" }, style: { backgroundColor: "#FFF2AF" } },

    // Web Development Basics
    // { id: "35", position: { x: 600, y: 850 }, data: { label: "Web Development Basics" }, style: { backgroundColor: "#F6C794", fontWeight: "bold" } },
    // { id: "36", position: { x: 300, y: 900 }, data: { label: "HTML, CSS, JavaScript" }, style: { backgroundColor: "#FFF2AF" } },
    // { id: "37", position: { x: 250, y: 970 }, data: { label: "Frontend Frameworks (Angular, React, Vue)" }, style: { backgroundColor: "#FFF2AF" } },
    // { id: "38", position: { x: 250, y: 1040 }, data: { label: "Backend Frameworks (Node.js, Django, Ruby on Rails)" }, style: { backgroundColor: "#FFF2AF" } },
    // { id: "39", position: { x: 900, y: 900 }, data: { label: "Restful APIs" }, style: { backgroundColor: "#FFF2AF" } },
    // { id: "40", position: { x: 900, y: 970 }, data: { label: "Web Security Basics" }, style: { backgroundColor: "#FFF2AF" } },
    // { id: "41", position: { x: 900, y: 1040 }, data: { label: "Responsive Design and Cross-Browser Compatibility" }, style: { backgroundColor: "#FFF2AF" } },

];


const edges = [
    {
        id: "e1-2",
        source: "1",
        target: "90",
        animated: true,
        style: { stroke: 'purple', strokeWidth: 1.5 },
    },

    // Foundations of Programming - Left Connections
    {
        id: "e3-2",
        source: "3",
        target: "2",
        type: SmoothStepEdge,
        sourceHandle: 'right',
        targetHandle: 'left',
        style: { stroke: '#B771E5' }
    },
    { id: "e4-2", source: "4", target: "2", type: SmoothStepEdge, sourceHandle: 'right', targetHandle: 'left', style: { stroke: '#B771E5' } },
    { id: "e5-2", source: "5", target: "2", type: SmoothStepEdge, sourceHandle: 'right', targetHandle: 'left', style: { stroke: '#B771E5' } },

    // Foundations of Programming - Right Connections
    { id: "e2-6", source: "2", target: "6", type: SmoothStepEdge, sourceHandle: 'right', targetHandle: 'left', style: { stroke: '#B771E5' } },
    { id: "e2-7", source: "2", target: "7", type: SmoothStepEdge, sourceHandle: 'right', targetHandle: 'left', style: { stroke: '#B771E5' } },
    { id: "e2-8", source: "2", target: "8", type: SmoothStepEdge, sourceHandle: 'right', targetHandle: 'left', style: { stroke: '#B771E5' } },


    // System Design - Left Connections
    { id: "e9-13", source: "9", target: "13", type: SmoothStepEdge, sourceHandle: 'right', targetHandle: 'left', style: { stroke: '#B771E5' } },
    { id: "e10-13", source: "10", target: "13", type: SmoothStepEdge, sourceHandle: 'right', targetHandle: 'left', style: { stroke: '#B771E5' } },

    // System Design - Right Connections
    { id: "e11-12", source: "13", target: "12", type: SmoothStepEdge, sourceHandle: 'right', targetHandle: 'left', style: { stroke: '#B771E5' } },
    { id: "e12-11", source: "13", target: "11", type: SmoothStepEdge, sourceHandle: 'right', targetHandle: 'left', style: { stroke: '#B771E5' } },

    { id: "e1-2", source: "1", target: "2", animated: true, type: SmoothStepEdge, style: { stroke: 'blue' } },
    { id: "e2-3", source: "2", target: "3", style: { stroke: 'blue', strokeWidth: 1.5 } },
    { id: "e3-4", source: "3", target: "4", style: { stroke: 'blue', strokeWidth: 1.5 } },
    { id: "e4-5", source: "4", target: "5", style: { stroke: 'blue', strokeWidth: 1.5 } },
    { id: "e1-6", source: "1", target: "6", animated: true, style: { stroke: 'blue' } },
    { id: "e6-7", source: "6", target: "7", style: { stroke: 'blue', strokeWidth: 1.5 } },
    { id: "e7-8", source: "7", target: "8", style: { stroke: 'blue', strokeWidth: 1.5 } },

    // // Version Control Systems
    // { id: "e9-10", source: "9", target: "10", animated: true, style: { stroke: 'green' } },
    // { id: "e10-11", source: "10", target: "11", style: { stroke: 'green', strokeWidth: 1.5 } },
    // { id: "e11-12", source: "11", target: "12", style: { stroke: 'green', strokeWidth: 1.5 } },
    // { id: "e9-13", source: "9", target: "13", animated: true, style: { stroke: 'green' } },
    // { id: "e13-14", source: "13", target: "14", style: { stroke: 'green', strokeWidth: 1.5 } },
    // { id: "e14-15", source: "14", target: "15", style: { stroke: 'green', strokeWidth: 1.5 } },

    // // Web Development Basics
    // { id: "e16-17", source: "16", target: "17", animated: true, style: { stroke: 'orange' } },
    // { id: "e17-18", source: "17", target: "18", style: { stroke: 'orange', strokeWidth: 1.5 } },
    // { id: "e18-19", source: "18", target: "19", style: { stroke: 'orange', strokeWidth: 1.5 } },
    // { id: "e16-20", source: "16", target: "20", animated: true, style: { stroke: 'orange' } },
    // { id: "e20-21", source: "20", target: "21", style: { stroke: 'orange', strokeWidth: 1.5 } },
    // { id: "e21-22", source: "21", target: "22", style: { stroke: 'orange', strokeWidth: 1.5 } },
];


export { nodes, edges };
