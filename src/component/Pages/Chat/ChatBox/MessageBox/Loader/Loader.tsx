import React from "react";

const Loader: React.FC = () => {
    return (
        <div className="mt-5 flex w-full justify-end px-3" role="status" aria-label="Loading response">
            <div className="flex h-12 items-center justify-center rounded-2xl rounded-br-md border border-zinc-800 bg-zinc-900/80 px-4 shadow-md shadow-black/30">
                <svg
                    className="h-7 w-7 text-[#dee2e6]"
                    viewBox="0 0 58 58"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <g fill="currentColor">
                        <circle cx="42.601" cy="11.462" r="4" fillOpacity="1">
                            <animate attributeName="fill-opacity" begin="0s" dur="1.2s" values="1;0.15;0.15;0.15;0.15;0.15;0.15;0.15" calcMode="linear" repeatCount="indefinite" />
                        </circle>
                        <circle cx="49.063" cy="27.063" r="4" fillOpacity="0.15">
                            <animate attributeName="fill-opacity" begin="0s" dur="1.2s" values="0.15;1;0.15;0.15;0.15;0.15;0.15;0.15" calcMode="linear" repeatCount="indefinite" />
                        </circle>
                        <circle cx="42.601" cy="42.663" r="4" fillOpacity="0.15">
                            <animate attributeName="fill-opacity" begin="0s" dur="1.2s" values="0.15;0.15;1;0.15;0.15;0.15;0.15;0.15" calcMode="linear" repeatCount="indefinite" />
                        </circle>
                        <circle cx="27" cy="49.125" r="4" fillOpacity="0.15">
                            <animate attributeName="fill-opacity" begin="0s" dur="1.2s" values="0.15;0.15;0.15;1;0.15;0.15;0.15;0.15" calcMode="linear" repeatCount="indefinite" />
                        </circle>
                        <circle cx="11.399" cy="42.663" r="4" fillOpacity="0.15">
                            <animate attributeName="fill-opacity" begin="0s" dur="1.2s" values="0.15;0.15;0.15;0.15;1;0.15;0.15;0.15" calcMode="linear" repeatCount="indefinite" />
                        </circle>
                        <circle cx="4.938" cy="27.063" r="4" fillOpacity="0.15">
                            <animate attributeName="fill-opacity" begin="0s" dur="1.2s" values="0.15;0.15;0.15;0.15;0.15;1;0.15;0.15" calcMode="linear" repeatCount="indefinite" />
                        </circle>
                        <circle cx="11.399" cy="11.462" r="4" fillOpacity="0.15">
                            <animate attributeName="fill-opacity" begin="0s" dur="1.2s" values="0.15;0.15;0.15;0.15;0.15;0.15;1;0.15" calcMode="linear" repeatCount="indefinite" />
                        </circle>
                        <circle cx="27" cy="5" r="4" fillOpacity="0.15">
                            <animate attributeName="fill-opacity" begin="0s" dur="1.2s" values="0.15;0.15;0.15;0.15;0.15;0.15;0.15;1" calcMode="linear" repeatCount="indefinite" />
                        </circle>
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default Loader;