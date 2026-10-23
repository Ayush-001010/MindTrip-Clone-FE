import React from 'react';
import type ICheckIns from './ICheckIns';
import SentBox from '../SentBox/SentBox';

const CheckIns: React.FC<ICheckIns> = () => {

    const submitHandler = async () => {
        // Handle the check-in submission logic here
        console.log("Check-in submitted");
    };
    
    return (
        <section className="flex w-full flex-col gap-2 p-2">
            <input
                type="text"
                placeholder="Type your message..."
                className="h-12 w-full rounded-[1.45rem] border border-slate-200/90 px-4 text-[0.98rem] text-[#fff] outline-none transition-all duration-200 placeholder:text-[#e9ecef]"
            />
            <div className="flex items-center justify-between gap-3">
                <section className="flex items-center gap-2">
                    <button
                        disabled
                        className="cursor-not-allowed rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300 opacity-70"
                    >
                        Reached
                    </button>
                    <button
                        disabled
                        className="cursor-not-allowed rounded-full border border-rose-400/40 bg-rose-400/10 px-3 py-1 text-xs font-medium text-rose-300 opacity-70"
                    >
                        Not Reached
                    </button>
                </section>
                <SentBox submitHandler={submitHandler}/>
            </div>
        </section>
    );
};

export default CheckIns;