import type IFooterContentInterface from "../Interface/CommonInterface";
import type { IBlogActivite } from "../Interface/DataInterface/IBlogData";
import type IBlogData from "../Interface/DataInterface/IBlogData";

export default class CommonConfig {
  static readonly companyName: string = "MindTrip";
  static readonly footerTextArr: IFooterContentInterface[] = [
    {
      label: "LinkedIn",
      link: "https://www.linkedin.com",
      icon: "linkedin",
    },
    {
      label: "GitHub",
      link: "https://www.github.com",
      icon: "github",
    },
    {
      label: "Leetcode",
      link: "https://www.leetcode.com",
      icon: "leetcode",
    },
  ];

  static readonly initialBlogValue: IBlogData = {
    tripTitle: "",
    tripOverview: "",
    totalSpent: 0,
    tripDuration: 1,
    noOfPlaces: 0,
    noOfActivities: 0,
    bookingURL: "",
    activities: [
      {
        index: 1,
        type: "activity",
        day: 1,
        placeName: "",
        activityType: "",
        time: "",
        description: "",
        tips: [],
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
        images: [],
        sideActivities: [],
        amountSpent: 0,
        itemOrder: [],
      },
    ],
    hotel: [],
    travel: [],
    profileTitle: "",
    profileIcon: "",
    profileImages: [],
    metaData: [],
  };

  static readonly initialActivityValue : IBlogActivite = {
    index: 0,
    type: "activity",
    day: 1,
    placeName: "",
    activityType: "",
    time: "",
    description: "",
    tips: [],
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
    images: [],
    sideActivities: [],
    amountSpent: 0,
    itemOrder: [],
  };
}
