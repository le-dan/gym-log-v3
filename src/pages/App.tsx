import { Navigate, Route, Routes } from "react-router";
import Sidebar from "../components/Sidebar";
import Workout from "./Workout.js";
import Profile from "./Profile.js";
import History from "./History.js";
import CreateWorkout from "../components/Workout/CreateWorkout.js";
import Dashboard from "./Dashboard.js";
import WorkoutHistoryInfo from "../components/History/WorkoutHistoryInfo.js";
import Help from "./Help.js";
import WorkoutDisplay from "../components/Dashboard/WorkoutDisplay.js";
import WorkoutGrid from "../components/Dashboard/WorkoutGrid.js";
import WorkoutComplete from "../components/Dashboard/WorkoutComplete.js";
import { useState } from "react";
import { WorkoutInterface } from "../util/interfaces.js";

function App() {
	const [chosenWorkout, setChosenWorkout] = useState<WorkoutInterface>();

	return (
		<div className="App bg-snow-white-dark flex">
			<Sidebar />
			{/* Main Board */}
			<div className="h-full w-full p-5 opacity-100 flex flex-col justify-center text-black">
				<Routes>
					<Route path="/" element={<Navigate replace to="dashboard" />} />
					<Route path="dashboard" element={<Dashboard />}>
						<Route element={<WorkoutGrid setChosenWorkout={setChosenWorkout} />} index />
						<Route path=":workout/*" element={<WorkoutDisplay workout={chosenWorkout} setChosenWorkout={setChosenWorkout} />} />
						<Route path="complete" element={<WorkoutComplete workout={chosenWorkout} />} />
					</Route>
					<Route path="profile" element={<Profile />} />
					<Route path="workout" element={<Workout />}></Route>
					<Route path="workout/create" element={<CreateWorkout />} />
					<Route path="history" element={<History />} />
					<Route path="history/:completionDate" element={<WorkoutHistoryInfo />} />
					<Route path="help" element={<Help />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
