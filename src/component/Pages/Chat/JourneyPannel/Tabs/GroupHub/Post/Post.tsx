import React from 'react';
import type IPost from './IPost';
import type IGroupHubMessage from '../../../../../../../Interface/DataInterface/IGroupHubMessage';
import AnnouncementPost from './AnnouncementPost/AnnouncementPost';

const Post : React.FC<IPost> = ({ posts }) => {

    const genratedPostUI = (post : IGroupHubMessage) => {
        switch(post.type) {
            case "announcement" : return <AnnouncementPost post={post} />;
            default : return null;
        }
    }

    return (
        <section className="flex flex-1 flex-col gap-2 overflow-y-auto px-3 pt-14 pb-2">
            {posts.map((post, index) => {
                return (
                    <div key={index}>
                        {genratedPostUI(post)}
                    </div>
                );
            })}
        </section>
    );
}

export default Post;