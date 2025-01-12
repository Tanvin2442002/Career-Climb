import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { motion, AnimatePresence } from 'framer-motion';


const Graph = ({ data, onTargetRoleChange }) => {
    const mermaidRef = useRef(null);
    const [targetRole, setTargetRole] = useState(null);

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
                        const targetGroup = e.target.closest('g');
                        if (targetGroup) {

                            const paragraphElement = targetGroup.querySelector('foreignObject p');
                            if (paragraphElement) {
                                const role = paragraphElement.textContent;
                                setTargetRole(role);
                                console.log('targetRole', role)
                                onTargetRoleChange(role);
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