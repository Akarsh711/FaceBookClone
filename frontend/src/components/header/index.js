import "./style.css";
import { Link } from "react-router-dom";
import {
	ArrowDown,
	Friends,
	Gaming,
	HomeActive,
	Logo,
	Market,
	Menu,
	Messenger,
	Notifications,
	Search,
	Watch,
} from "../../svg";
import { useSelector } from "react-redux";
import SearchMenu from "./SearchMenu";
import { useState, useRef } from "react";
import AllMenu from "./AllMenu";
import useClickOutSide from "../../helpers/clickOutside";
import UserMenu from "./UserMenu";
function Header() {
	const { user } = useSelector((user) => ({ ...user }));
	const [showSearchMenu, setShowSearchMenu] = useState(false);
	const [showAllMenu, setShowAllMenu] = useState(false);
	const [showUserMenu, setShowUserMenu] = useState(false);

	const allmenu = useRef(null);
	const usermenu = useRef(null);

	useClickOutSide(allmenu, () => setShowAllMenu(false));
	useClickOutSide(usermenu, () => setShowUserMenu(false));

	const color = "#65676b";
	return (
		<header>
			<div className="header_left">
				<Link to="/" className="header_logo">
					<div className="circle">
						<Logo />
					</div>
				</Link>
				<div
					className="search search1"
					onClick={() => {
						setShowSearchMenu(true);
					}}>
					<Search color={color} />
					<input
						type="txext"
						placeholder="Search Facebook"
						className="hide_input"
					/>
				</div>
			</div>
			{showSearchMenu && (
				<SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
			)}
			<div className="header_middle">
				<Link to="/" className="middle_icon hover1">
					<HomeActive color={color} />
				</Link>
				<Link to="/" className="middle_icon hover1">
					<Friends color={color} />
				</Link>
				<Link to="/" className="middle_icon hover1">
					<Watch color={color} />
					<div className="middle_notification">9+</div>
				</Link>
				<Link to="/" className="middle_icon hover1">
					<Market color={color} />
				</Link>
				<Link to="/" className="middle_icon hover1">
					<Gaming color={color} />
				</Link>
			</div>
			<div className="header_right">
				<Link to="/profile" className="profile_link hover1">
					<img src={user?.picture} alt="" />
					<span> {user?.first_name}</span>
				</Link>
				<div
					className={`circle_icon hover1 ${showAllMenu && "active_header"}`}
					ref={allmenu}>
					<div
						onClick={() => {
							setShowAllMenu((prev) => !prev);
						}}>
						<Menu />
					</div>
					{showAllMenu && <AllMenu />}
				</div>
				<div className="circle_icon hover1">
					<Messenger />
				</div>
				<div className="circle_icon hover1">
					<Notifications />
					<div className="right_notification">5</div>
				</div>
				<div
					className={`circle_icon hover1 ${showUserMenu && "active_header"}`}
					ref={usermenu}>
					<div onClick={() => setShowUserMenu((prev) => !prev)}>
						<ArrowDown />
					</div>
					{showUserMenu && <UserMenu user={user} />}
				</div>
			</div>
		</header>
	);
}

export default Header;
