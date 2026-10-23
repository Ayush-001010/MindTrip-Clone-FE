import React from 'react';
import type IOpinion from './IOpinion';
import SentBox from '../SentBox/SentBox';

const Opinion: React.FC<IOpinion> = () => {

    const submitHandler = async () => {
        // Handle the opinion submission logic here
        console.log("Opinion submitted");
    };
    
    return (
         <section className="flex w-full items-center gap-3 p-2">
            <input
                type="text"
                placeholder="Type your opinion..."
                className="h-12 w-full rounded-[1.45rem] border border-slate-200/90 px-4 text-[0.98rem] text-[#fff] outline-none transition-all duration-200 placeholder:text-[#e9ecef]"
            />
            <SentBox submitHandler={submitHandler}/>
        </section>
    );
};

export default Opinion;