export default class UserProfileConfig {
  static fields: Record<"birthday" | "work" | "website" | "music" | "languages" | "location" | "anniversary",
    { header: string; description: string , fieldType : "text" | "date" | "drowdown" }
  > = {
    birthday: {
      header: "When's your special day? 🎂",
      description:
        "Share your birthday so we can celebrate with you and personalise your travel experience.",
      fieldType: "date"
    },

    work: {
      header: "What do you do for a living? 💼",
      description:
        "Tell us about your profession or passion. It helps us get to know you better.",
      fieldType: "text"
    },

    website: {
      header: "Where have you always wanted to travel? 🌐",
      description:
        "Whether it’s on your bucket list or your shortlist, tell us a place you can’t wait to visit.",
      fieldType: "text"
    },

    music: {
      header: "What's on your travel playlist? 🎵",
      description:
        "Tell us what you love listening to while exploring the world.",
      fieldType: "text"
    },

    languages: {
      header: "Which languages can you speak? 🗣️",
      description:
        "Let others know how you communicate and connect with travellers worldwide.",
      fieldType: "text"
    },

    location: {
      header: "Where do you call home? 📍",
      description:
        "Share your city or country so we can recommend relevant experiences and nearby adventures.",
      fieldType: "text"
    },

    anniversary: {
        header: "When is your special anniversary? ❤️",
        description:
            "Share your anniversary date so we can help celebrate your special moments with perfect travel inspiration.",
        fieldType: "date"
        }

  };

  static interestsConfig : Array<{ title: string; icon: string }> = [
    {
      title:"Hiking",
      icon: "Hiking"
    },
    {
      title:"Photography",
      icon: "Photography"
    },
    {
      title:"Cooking",
      icon: "Cooking"
    },
    {
      title:"Reading",
      icon: "Reading"
    },
    {
      title:"Traveling",
      icon: "Traveling"
    },
    {
      title:"Swimming",
      icon: "Swimming"
    },
    {
      title:"Films",
      icon: "Films"
    },
    {
      title:"Shopping",
      icon: "Shopping"
    },
    {
      title:"Live Music",
      icon: "Live Music"
    },
    {
      title:"Gaming",
      icon: "Gaming"
    },
    {
      title:"Night Life",
      icon: "Night Life"
    },
    {
      title:"Water Sports",
      icon: "Water Sports"
    }
  ]
}