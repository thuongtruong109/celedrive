import { IService } from "@/types";
import { HiOutlineUserGroup, HiMiniUserGroup, HiOutlineRectangleGroup, HiMiniRectangleGroup } from "react-icons/hi2";
import { RiUserShared2Line, RiStackshareLine, RiUserReceived2Line, RiUserShared2Fill, RiUserReceivedFill} from "react-icons/ri";
import { MdSecurity } from "react-icons/md";
import { IoFileTrayFullOutline, IoFileTrayFull } from "react-icons/io5";
import { SlStar } from "react-icons/sl";
import { TiStarFullOutline } from "react-icons/ti";
import { PiTrashLight, PiTrashFill } from "react-icons/pi";

export const HubServices: IService[] = [
    {
        id: 1,
        name: "Dashboard",
        desc: "View your files",
        icon: IoFileTrayFullOutline,
        matchIcon: IoFileTrayFull,
        link: "/dashboard/files",
    },
    {
        id: 2,
        name: "Favorites",
        desc: "View your favorite files",
        icon: SlStar,
        matchIcon: TiStarFullOutline,
        link: "/dashboard/favorites",
    },
    {
        id: 3,
        name: "Trash",
        desc: "View your deleted files",
        icon: PiTrashLight,
        matchIcon: PiTrashFill,
        link: "/dashboard/trash",
    },
]

export const SharedServices: IService[] = [
    {
        id: 1,
        name: 'Public',
        desc: 'Share your files with the world',
        icon: HiOutlineUserGroup,
        matchIcon: HiMiniUserGroup,
        link: '/share/public',
    },
    {
        id: 2,
        name: 'Protected',
        desc: 'Share your files with a password',
        icon: MdSecurity,
        matchIcon: MdSecurity,
        link: '/share/protected',
    },
    {
        id: 3,
        name: 'Single (sender)',
        desc: 'Share your files with a colleague',
        icon: RiUserShared2Line,
        matchIcon: RiUserShared2Fill,
        link: '/share/single/sender',
    },
    {
        id: 4,
        name: 'Single (receiver)',
        desc: 'Receive files from a colleague',
        icon: RiUserReceived2Line,
        matchIcon: RiUserReceivedFill,
        link: '/share/single/receiver',
    },
    {
        id: 5,
        name: 'Group',
        desc: 'Share your files with multiple colleagues',
        icon: HiOutlineRectangleGroup,
        matchIcon: RiStackshareLine,
        link: '/share/group',
    },
    {
        id: 6,
        name: 'Multi',
        desc: 'Share your files with multiple colleagues',
        icon: RiStackshareLine,
        matchIcon: HiMiniRectangleGroup,
        link: '/share/multi',
    }, 
]