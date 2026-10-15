export interface IHotelComment {
    name: string;
    comment: string;
}

/**
 * Parses the raw backend comment string, e.g.
 * "{comment:It's good hotel,name:'Ayush''}|{comment:It not worthy,name:'Sidhi''}"
 * into a list of structured comments.
 */
export const parseHotelComments = (raw?: string | null): IHotelComment[] => {
    if (!raw) {
        return [];
    }

    return raw
        .split("|")
        .map((entry) => entry.trim())
        .filter(Boolean)
        .map((entry) => {
            const inner = entry.replace(/^\{/, "").replace(/\}$/, "");
            const match = inner.match(/comment:(.*),name:'+(.*?)'*$/);
            if (!match) {
                return null;
            }
            return {
                comment: match[1].trim(),
                name: match[2].trim(),
            };
        })
        .filter((parsed): parsed is IHotelComment => parsed !== null);
};
