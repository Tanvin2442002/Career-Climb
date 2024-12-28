import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const Graph = ({ data }) => {
    const mermaidRef = useRef(null); 

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
                } else {
                    console.error('Mermaid container not found or data is missing');
                }
            } catch (error) {
                console.error('Mermaid render error:', error);
            }
        };

        renderMermaid();
    }, [data]);

    return (
        <div className="relative p-4 align-center flex flex-col justify-center items-center w-full">
            {/* <TransformWrapper
                defaultScale={1}
                defaultPositionX={200}
                defaultPositionY={100}
                wheel={{ step: 100 }}
            >
                {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                        <div className="flex flex-col absolute z-10 right-0 top-0 justify-center items-center p-4 gap-2">
                            <button
                                onClick={zoomIn}
                                className="justify-center items-center space-x-2 px-3 py-1 rounded-md font-normal text-sm shadow-lg transition-all w-12 h-10 duration-250 overflow-hidden group hover:shadow-xl hover:bg-blue-100"
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <button
                                onClick={zoomOut}
                                className="justify-center items-center space-x-2 px-3 py-1 rounded-md font-normal text-sm shadow-lg transition-all w-12 h-10 duration-250 overflow-hidden group hover:shadow-xl hover:bg-blue-100"
                            >
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <button
                                onClick={resetTransform}
                                className="justify-center items-center space-x-2 px-3 py-1 rounded-md font-normal text-sm shadow-lg transition-all w-15 h-10 duration-250 overflow-hidden group hover:shadow-xl hover:bg-blue-100"
                            >
                                <span>Reset</span>
                            </button>
                        </div>
                        <TransformComponent>
                            <div
                                className="mermaid w-[80vw] text-lg"
                                ref={mermaidRef}
                            />
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper> */}
            <div
                className="mermaid w-[80vw] text-lg"
                ref={mermaidRef}
            />
        </div>
    );
};

export default Graph;
