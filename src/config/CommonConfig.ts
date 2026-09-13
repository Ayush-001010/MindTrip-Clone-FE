import type IFooterContentInterface from "../Interface/CommonInterface";

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
}
