import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

export default memo(({ data, isConnectable }) => {

    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
                isConnectable={isConnectable}
            />
            <div className='text-left uppercase underline '>
                <h1>{data.label}</h1>
            </div>
            <Handle
                type="source"
                position={Position.Left}
                id="l"
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="r"
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="b"
                isConnectable={isConnectable}
            />
        </>
    );
});