import React, { useEffect , useState } from "react";
import useBlogGlobeFeed from "../../../CustomHooks/useBlogGlobeFeed";
import type IGlobleFeed from './IGlobleFeed';
import type IBlogUniquePlace from "../../../Interface/DataInterface/IBlogUniquePlace";
import Globe from "../../Common/Globe/Globe";





const GlobleFeed: React.FC<IGlobleFeed> = () => {
    const { getUniquePlaces } = useBlogGlobeFeed();
    const [places, setPlaces] = useState<IBlogUniquePlace[]>([]);
    
    useEffect(() => {
        const fetchUniquePlaces = async () => {
            const data : any = await getUniquePlaces();
            if (data) setPlaces(data);
        };
        fetchUniquePlaces();
    }, [getUniquePlaces]);

    return (
        <div className="h-[calc(100vh-56px)] min-h-[500px]">
            <Globe places={places} type="place" />
        </div>
    );
};

export default GlobleFeed;
