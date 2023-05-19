import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { SvgIcon } from "@mui/material";
import { AiOutlineInsertRowAbove } from "react-icons/ai";
import { BsFileEarmarkFill } from "react-icons/bs";
import { MdHomeWork } from "react-icons/md";
import userRole from "src/constants/userRole";
import userUtil from "src/utils/userUtil";


const companySideNav = [
	{
		title: "Overview",
		path: "/",
		icon: (
			<SvgIcon fontSize="small">
				<ChartBarIcon />
			</SvgIcon>
		),
	},
	{
		title: "Employee",
		path: "/employees",
		icon: (
			<SvgIcon fontSize="small">
				<UsersIcon />
			</SvgIcon>
		),
	},
	{
		title: "Department",
		path: "/departments",
		icon: (
			<SvgIcon fontSize="small">
				<MdHomeWork />
			</SvgIcon>
		),
	},
	{
		title: "Position",
		path: "/positions",
		icon: (
			<SvgIcon fontSize="small">
				<AiOutlineInsertRowAbove />
			</SvgIcon>
		),
	},
	{
		title: "File",
		path: "/files",
		icon: (
			<SvgIcon fontSize="small">
				<BsFileEarmarkFill />
			</SvgIcon>
		),
	},
	{
		title: "My Account",
		path: "/account",
		icon: (
			<SvgIcon fontSize="small">
				<UserIcon />
			</SvgIcon>
		),
	},

	// {
	// 	title: 'Settings',
	// 	path: '/settings',
	// 	icon: (
	// 		<SvgIcon fontSize="small">
	// 			<CogIcon />
	// 		</SvgIcon>
	// 	)
	// },
]
const employeeSideNav = [
	{
		title: "Overview",
		path: "/",
		icon: (
			<SvgIcon fontSize="small">
				<ChartBarIcon />
			</SvgIcon>
		),
	},
	{
		title: "Attendance",
		path: "/employees/attendance",
		icon: (
			<SvgIcon fontSize="small">
				<ChartBarIcon />
			</SvgIcon>
		),
	},
	{
		title: "Tasks",
		path: "/employees/tasks",
		icon: (
			<SvgIcon fontSize="small">
				<ChartBarIcon />
			</SvgIcon>
		),
	},
	{
		title: "My Account",
		path: "/account",
		icon: (
			<SvgIcon fontSize="small">
				<UserIcon />
			</SvgIcon>
		),
	},
]
const genSideNav = () => {
	let currentUser = userUtil.getCurrentUserFromLocalStorage();

	if (currentUser?.role === userRole.COMPANY) return companySideNav;
	if (currentUser?.role === userRole.EMPLOYEE) return employeeSideNav;
	return companySideNav;
}
const sideNavDefine = genSideNav();
export default sideNavDefine;