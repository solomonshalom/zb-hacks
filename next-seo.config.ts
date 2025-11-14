export const nextSeoConfig = {
  title: "Home",
  titleTemplate: "%s - Zerobase",
  description:
    "Submit projects for Zerobase X Lovable hackathon",
  defaultTitle: "Zerobase",
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/images/phck.svg",
    },
    {
      rel: "apple-touch-icon",
      href: "/images/apple-touch-icon-180x180.png",
      sizes: "180x180",
    },
    {
      rel: "apple-touch-icon",
      href: "/images/apple-touch-icon-152x152.png",
      sizes: "152x152",
    },
    {
      rel: "apple-touch-icon",
      href: "/images/apple-touch-icon-114x114.png",
      sizes: "114x114",
    },
    {
      rel: "manifest",
      href: "/manifest.json",
    },
  ],
  openGraph: {
    site_name: "Zerobase",
    url: "https://zerobase.ca",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/og_image.jpg",
        width: 1920,
        height: 1080,
        type: "image/jpg",
      },
    ],
  },
  twitter: {
    handle: "@shalomlijo",
    site: "https://x.com/shalomlijo",
    cardType: "summary_large_image",
  },
};
