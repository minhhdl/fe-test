import Image from "next/image";
import { Dropdown } from "flowbite-react";
import styles from "./Header.module.scss";
import Link from "next/link";

interface INavItem {
  label: string;
  path: string;
  items?: INavItem[];
}

const navItems: INavItem[] = [
  {
    label: "Blog",
    path: "#",
  },
  {
    label: "Socials",
    path: "#",
  },
  {
    label: "Past Socials",
    path: "#",
  },
  {
    label: "Clubs",
    path: "#",
    items: [
      {
        label: "Club 1",
        path: "#",
      },
      {
        label: "Club 2",
        path: "#",
      },
    ],
  },
  {
    label: "Contact",
    path: "#",
  },
];

export default function Header() {
  return (
    <header className="h-[80px]">
      <div className="px-4 md:px-8 py-[22px] container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo.png" width={200} height={36} alt="" />
        </Link>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <nav
          className={`hidden w-full md:block md:w-auto ${styles.navbar}`}
          id="navbar-dropdown"
        >
          <ul className="flex flex-col md:flex-row md:space-x-12 md:mt-0 md:text-sm md:font-medium">
            {navItems.map((navItem, index) => (
              <li className={styles.navItem} key={index}>
                {!navItem.items ? (
                  <a href={navItem.path} className="block">
                    {navItem.label}
                  </a>
                ) : (
                  <Dropdown
                    arrowIcon={false}
                    inline={true}
                    label={navItem.label}
                  >
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item>
                  </Dropdown>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
