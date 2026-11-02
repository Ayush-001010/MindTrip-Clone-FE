import React from 'react';
import type IFooter from './IFooter';
import Announcement from './Announcement/Announcement';
import Poll from './Poll/Poll';
import Opinion from './Opinion/Opinion';
import CheckIns from './CheckIns/CheckIns';

const Footer : React.FC<IFooter> = ({ activeTab, setActiveTab }) => {

    const genratedUI = () => {
        switch(activeTab) {
            case "Announcement": return <Announcement setActiveTab={setActiveTab} />;
            case "Poll": return <Poll setActiveTab={setActiveTab} />;
            case "Opinion": return <Opinion setActiveTab={setActiveTab} />;
            case "Check ins" : return <CheckIns setActiveTab={setActiveTab} />;
            default : return null;
        }
    }

    return (
        <footer className="w-full border-t border-[#343a40] bg-[#1a1d21] px-1 py-1">
            {genratedUI()}
        </footer>
    );
};

export default Footer;