import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";
import { motion, AnimatePresence } from 'framer-motion';

const ColorSelectorNode = ({ data }) => {

    return (
        <div className={`${data.className} p-2 ${data.className === 'node' ? ' w-40' : 'h-full w-60 md:w-80'} rounded-lg bg-white text-center justify-center items-center shadow-md `}>
            <Handle
                type="target"
                position={Position.Left}
                id="target-a"
            />
            <Handle
                type="target"
                position={Position.Top}
                id="target-b"
            />
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm w-full h-max p-1 font-medium text-gray-700"
                >
                    {data.label}
                </motion.div>
            </AnimatePresence>

            <Handle type="source" position={Position.Bottom} id="source-b" />
            <Handle type="source" position={Position.Left} id="source-l" />
            <Handle type="source" position={Position.Right} id="source-r" />
        </div>
    );
};

export default memo(ColorSelectorNode);
