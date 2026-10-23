import React from 'react';
import type IFooter from './IFooter';
import Announcement from './Announcement/Announcement';
import Poll from './Poll/Poll';
import Opinion from './Opinion/Opinion';
import CheckIns from './CheckIns/CheckIns';

const Footer : React.FC<IFooter> = ({ activeTab }) => {

    const genratedUI = () => {
        switch(activeTab) {
            case "Announcement": return <Announcement />;
            case "Poll": return <Poll />;
            case "Opinion": return <Opinion />;
            case "Check ins" : return <CheckIns />;
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