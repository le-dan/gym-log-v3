import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

export default function Main() {
	return (
		<div className="App bg-snow-white-dark flex">
			<Sidebar />
			{/* Main Board */}
			<div className="h-full w-full p-5 opacity-100 flex flex-col justify-center text-black">
				<Outlet />
			</div>
		</div>
	);
}
