export interface MenuItem {
  title: string
  url: string
}

interface MenuItems {
  logo: {
    url: string
    src: string
    alt: string
    title: string
    description: string
  }
  menu: MenuItem[]
  extra: {
    author: { title: string; url: string }
    coffee: { title: string; url: string }
  }
}

export const menuItems: MenuItems = {
  logo: {
    url: "/",
    src: "https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "favique",
    description:
      "A collection of 100+ responsive HTML templates for your startup business or side project.",
  },
  menu: [
    {
      title: "Converter",
      url: "/converter",
    },
    {
      title: "Generator",
      url: "/generator",
    },
    {
      title: "Logos",
      url: "#",
    },
  ],
  extra: {
    author: { title: "Author", url: "https://kiron.dev" },
    coffee: { title: "Buy me a coffee", url: "#" },
  },
}
