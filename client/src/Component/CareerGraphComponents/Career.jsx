import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
// import Nodes and Edges from the data file
import { Nodes, Edges } from './Data';

function Career() {
    return (
        <div style={{ height: '2000px', width: '100vw' }}>
            <ReactFlow nodes={Nodes} edges={Edges}>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default Career;