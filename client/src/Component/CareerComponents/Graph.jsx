import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { motion, AnimatePresence } from 'framer-motion';


const Graph = ({ data, onTargetRoleChange }) => {
    const mermaidRef = useRef(null);
    const [targetRole, setTargetRole] = useState('');

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            theme: 'forest',
            themeVariables: {
                nodeBorder: '#004990',
                mainBkg: '#c9d7e4',
                nodeTextColor: '#274059',
                fontFamily: 'JetBrains Mono',
                fontSize: '40px',
            },
        });
        const renderMermaid = async () => {
            try {
                const element = mermaidRef.current; // Reference to the Mermaid container
                if (element && data) {
                    const { svg } = await mermaid.render('mermaidGraph', data);
                    element.innerHTML = svg; // Inject the rendered SVG
                    element.addEventListener('click', (e) => {
                        const targetGroup = e.target.closest('g'); // Find the closest <g> group
                        if (targetGroup) {
                            console.log('Clicked group:', targetGroup); // Log the full group for debugging

                            // Locate the <p> tag within the <g>
                            const paragraphElement = targetGroup.querySelector('foreignObject p');
                            if (paragraphElement) {
                                const role = paragraphElement.textContent;
                                setTargetRole(role);
                                onTargetRoleChange(role); // Call the callback function
                            } else {
                                console.log('No <p> tag found in the clicked group');
                            }
                        } else {
                            console.log('No group element clicked');
                        }
                    });
                } else {
                    console.error('Mermaid container not found or data is missing');
                }
            } catch (error) {
                console.error('Mermaid render error:', error);
            }
        };
        renderMermaid();
    }, [data, onTargetRoleChange]);

    return (
        <AnimatePresence>
            <motion.div 
                key={targetRole}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 , ease: 'easeInOut' }}
                className="relative p-4 align-center flex flex-col justify-center items-center w-full"
            >
                <div
                    className="mermaid w-[80vw] text-lg"
                    ref={mermaidRef}
                />
            </motion.div>
        </AnimatePresence>
    );
};

export default Graph;