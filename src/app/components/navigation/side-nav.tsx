"use client";

import { usePathname } from "next/navigation";
import NavItem from "./nav-item";
import GoltyLogo from "../svgs/GoltyLogo.svg";
import Image from "next/image";
import { FaListUl } from "react-icons/fa";
import { PiTelevisionFill } from "react-icons/pi";
import { FaRegPlayCircle } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { MdBugReport } from "react-icons/md";
import { FaBell } from "react-icons/fa";

const libraryLinks = [
  { name: "Channels", href: "/channels", icon: PiTelevisionFill },
  { name: "Playlists", href: "/playlists", icon: FaListUl },
  { name: "Videos", href: "/videos", icon: FaRegPlayCircle },
];

const settingsLinks = [
  { name: "Libraries", href: "/libraries", icon: MdVideoLibrary },
  { name: "Users", href: "/users", icon: HiUsers },
  { name: "Logs", href: "/logs", icon: MdBugReport },
  { name: "Notifications", href: "/notifications", icon: FaBell },
];

export default function SideNav() {
  const pathname = usePathname();
  return (
    <div className="h-full px-6 py-4 bg-[#1D1F24]">
      <div className="flex items-center gap-3 pb-3">
        <Image priority src={GoltyLogo} alt="Golty Logo" />
        <p className="text-white text-2xl font-bold">Golty</p>
      </div>

      <p className="text-[#676D75] font-semibold pb-3">Library</p>

      {libraryLinks.map((link) => {
        return (
          <NavItem
            key={link.name}
            link={link.href}
            name={link.name}
            isActive={link.href === pathname}
            icon={link.icon}
          />
        );
      })}

      <p className="text-[#676D75] font-semibold py-3">Settings</p>

      {settingsLinks.map((link) => {
        return (
          <NavItem
            key={link.name}
            link={link.href}
            name={link.name}
            isActive={link.href === pathname}
            icon={link.icon}
          />
        );
      })}
    </div>
  );
}