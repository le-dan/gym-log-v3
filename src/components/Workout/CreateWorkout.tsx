import { Exercise, WorkoutInterface } from "../../util/interfaces";
import { useBlocker, useNavigate } from "react-router";
import db from "local-db-storage";
import { useEffect, useMemo, useState } from "react";
import Select from "@mui/material/Select";
import { Muscle } from "../../util/interfaces";
import { MenuItem, Modal } from "@mui/material";
import ExerciseAccordion from "./ExerciseAccordion";

export default function CreateWorkout() {
	const styles = {
		select: {
			".MuiOutlinedInput-notchedOutline": {
				borderColor: "var(--color-primary)",
				borderRadius: "0",
			},
			height: "46px",
			color: "var(--color-primary)",
		},
	};

	const [modalOpen, setModalOpen] = useState(false);

	const [workoutName, setWorkoutName] = useState("");
	const [created, setCreated] = useState(false);
	// New exercise states
	const [exerciseName, setExerciseName] = useState("");
	const [sets, setSets] = useState(0);
	const [reps, setReps] = useState(0);
	const [muscles, setMuscles] = useState<Muscle[]>([]);
	const [instructions, setInstructions] = useState("");

	const [exercises, setExercises] = useState<Exercise[]>([]);
	const isActive = useMemo(() => (exercises.length > 0 || workoutName.length > 0) && !created, [exercises, workoutName, created]);
	const navigate = useNavigate();

	const blocker = useBlocker(isActive);

	useEffect(() => {
		if (blocker.state === "blocked") {
			setModalOpen(true);
		}
	}, [blocker]);

	async function handleCreateButton() {
		setCreated(true);
		let workoutDB: WorkoutInterface[] | undefined = await db.getItem("WorkoutsDB");
		if (workoutDB === undefined) {
			workoutDB = [];
		}
		let workout: WorkoutInterface = {
			name: workoutName,
			exercises: exercises,
			intensity: 0,
			elapsedMin: 0,
			elapsedSec: 0,
			done: false,
		};
		workoutDB.push(workout);
		await db.setItem("WorkoutsDB", workoutDB).then(() => {
			navigate("/workout");
		});
	}
	function handleAddExercise() {
		const newExercise: Exercise = {
			name: exerciseName,
			reps: reps,
			sets: sets,
			musclesWorked: muscles,
			instructions: instructions,
			setsCompleted: 0,
		};
		setExercises([...exercises, newExercise]);
	}

	return (
		<div className="h-full w-full flex text-primary border-primary items-center justify-center gap-50 py-20">
			<form className="flex flex-col h-full w-1/3 gap-10 shrink-0 overflow-y-auto items-center">
				<h1 className="text-4xl font-semibold">Create a New Workout</h1>
				<label className="text-xl w-full flex flex-col gap-4">
					Workout Name
					<input
						id="nameInput"
						type="text"
						className="border p-2 w-full"
						autoComplete="off"
						placeholder="Enter workout name"
						value={workoutName}
						onChange={(e) => setWorkoutName(e.target.value)}
					/>
				</label>
				<div className="flex flex-col gap-4 w-full">
					<div className="flex justify-between items-center">
						<h2 className="text-xl">Add Exercise</h2>
						<button
							type="button"
							className="bg-primary text-white p-1 px-5 rounded-md hover-css hover:bg-accent"
							onClick={() => handleAddExercise()}
						>
							Add
						</button>
					</div>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2 border p-4">
							<label className="text-lg">
								Exercise Name
								<input
									id="exerciseNameInput"
									type="text"
									className="border p-2 w-full"
									placeholder="Enter exercise name"
									autoComplete="off"
									value={exerciseName}
									onChange={(e) => setExerciseName(e.target.value)}
								/>
							</label>
							<div className="flex gap-4">
								<label className="text-lg">
									Sets
									<input
										id="setsInput"
										type="number"
										className="border p-2 w-full"
										placeholder="Enter number of sets"
										value={sets}
										onChange={(e) => setSets(Number.parseInt(e.target.value))}
									/>
								</label>
								<label className="text-lg">
									Repetitions
									<input
										id="repsInput"
										type="number"
										className="border p-2 w-full"
										placeholder="Enter number of reps per set"
										value={reps}
										onChange={(e) => {
											setReps(Number.parseInt(e.target.value));
										}}
									/>
								</label>
							</div>
							<label className="text-lg">
								Muscles Worked
								<Select
									multiple
									sx={styles.select}
									className="w-full"
									value={muscles}
									onChange={(e) => setMuscles(e.target.value as Muscle[])}
								>
									{Object.keys(Muscle).map((muscle) => {
										return (
											<MenuItem key={muscle} value={muscle}>
												{muscle}
											</MenuItem>
										);
									})}
								</Select>
							</label>
							<label className="text-lg">
								Instructions
								<input
									id="instructionsInput"
									type="text"
									className="border p-2 w-full"
									placeholder="Enter instructions"
									autoComplete="off"
									value={instructions}
									onChange={(e) => {
										setInstructions(e.target.value);
									}}
								/>
							</label>
						</div>
					</div>
				</div>
				<button
					className="bg-primary text-white p-2 mt-4 hover:bg-accent hover-css rounded-md w-50 disabled:opacity-50 disabled:pointer-events-none"
					disabled={exercises.length === 0}
					onClick={async (e) => {
						e.preventDefault();
						handleCreateButton();
					}}
				>
					Create
				</button>
			</form>
			<div className="h-full w-1/3 flex flex-col gap-10 bg-snow-white-dark p-10 rounded-4xl shadow-2xl">
				<span className="text-4xl w-full text-center font-semibold" hidden={exercises.length === 0}>
					Exercises
				</span>
				<div className="flex flex-col overflow-y-auto gap-3 p-5">
					{exercises?.map((exercise) => {
						return <ExerciseAccordion exercise={exercise} />;
					})}
				</div>
			</div>
			<Modal open={modalOpen} disableAutoFocus className="flex items-center justify-center text-primary text-center">
				<div className="bg-snow-white w-1/4 h-1/4 rounded-3xl p-10 text-4xl font-semibold flex flex-col">
					Are you sure you want to exit without saving?
					<div className="mt-auto w-full flex gap-10 justify-center text-xl font-semibold">
						<button
							onClick={() => blocker.proceed && blocker.proceed()}
							className="hover-css bg-primary text-snow-white rounded-lg px-3 py-2 hover:bg-accent"
						>
							Confirm
						</button>
						<button
							onClick={() => setModalOpen(false)}
							className="hover-css border-primary border-2 text-primary rounded-lg px-3 py-2 hover:border-accent hover:text-accent"
						>
							Cancel
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
