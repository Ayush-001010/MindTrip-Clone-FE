export default interface ILikeDislikeControls {
    likeCount: number;
    dislikeCount: number;
    liked: boolean;
    disliked: boolean;
    onLike: () => void;
    onDislike: () => void;
}
