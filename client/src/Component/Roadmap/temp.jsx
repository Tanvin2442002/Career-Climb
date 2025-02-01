import nodeData from "./Data";

// {
//     id: "1", position: { x: 600, y: 50 }, data: { label: "Software Engineering" }, type: "input", style: { backgroundColor: "#F6C794", fontWeight: "bold", fontSize: "12px" },
//     className: "node-hover",
//     },

const ReactFlowNode = [];
const ReactFlowEdge = [];

var mainY = 250, detailYLeft = 150, detailYRight = 150;

nodeData.map((node, index) => {
    ReactFlowNode.push({
        id: `${node.id}`,
        position: { x: 600, y: mainY },
        data: { label: node.name },
        style: { backgroundColor: "#F6C794", fontWeight: "bold", fontSize: "12px" },
        sourcePosition: 'right',
        targetPosition: 'left',
        className: "node-hover",
    })

    var sizeOfDetails = node.details.length;
    mainY = mainY + (((sizeOfDetails + 1) / 2) * 100);

    if (node.details) {
        node.details.forEach((detail, index) => {
            let position, sourcePosition, targetPosition;
            if (index % 2 === 0) {
                position = { x: 300, y: detailYLeft };
                detailYLeft = detailYLeft + 100;
                sourcePosition = 'left';
                targetPosition = 'left';
            } else {
                position = { x: 900, y: detailYRight };
                detailYRight = detailYRight + 100;
                sourcePosition = 'right';
                targetPosition = 'right';
            }
            ReactFlowNode.push({
                id: `${node.id}${index}`,
                position: position,
                data: { label: detail },
                sourcePosition: sourcePosition,
                targetPosition: targetPosition,
                type: "default",
                style: { backgroundColor: "#D3D3D3", fontWeight: "normal", fontSize: "10px" },
                className: "node-hover-side",
            });
        });
    }
})

console.log(ReactFlowNode);

nodeData.map((node) => {

    node.details.forEach((detail, index) => {
        // var source, target;
        // if(id % 2 === 0){
        //     source = id;
        //     target = index;
        // }
        // else {
        //     source = index;
        //     target = id; 
        // }
        var source = (index % 2 === 0) ? `${node.id}${index}` : `${node.id}`;
        var target = (index % 2 === 0) ? `${node.id}` : `${node.id}${index}`;
        ReactFlowEdge.push({
            id: `${node.id}${index}`,
            source: source,
            target: target,
            animated: true,
            arrowHeadType: "arrowclosed",
            style: { stroke: "#B771E5" },
            sourceHandle: "left",
            targetHandle: "right",
        });
    });
});

console.log(ReactFlowEdge);

export const nodes = ReactFlowNode;
export const edges = ReactFlowEdge;
