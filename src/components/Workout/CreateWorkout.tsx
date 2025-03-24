import { Exercise, WorkoutInterface } from "../../util/interfaces";
import { useBlocker, useNavigate } from "react-router";
import db from "local-db-storage";
import { useEffect, useMemo, useState } from "react";
import Select from "@mui/material/Select";
import { Muscle } from "../../util/interfaces";
import {
	AccordionDetails,
	AccordionSummary,
	MenuItem,
	Modal,
	Typography,
} from "@mui/material";
import { ChevronDown } from "lucide-react";
import Accordion from "@mui/material/Accordion";

export default function CreateWorkout() {
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
	const isActive = useMemo(
		() => (exercises.length > 0 || workoutName.length > 0) && !created,
		[exercises, workoutName, created]
	);
	const navigate = useNavigate();

	const blocker = useBlocker(isActive);

	useEffect(() => {
		if (blocker.state === "blocked") {
			setModalOpen(true);
		}
	}, [blocker]);

	async function handleCreateButton() {
		setCreated(true);
		let workoutDB: WorkoutInterface[] | undefined = await db.getItem(
			"WorkoutsDB"
		);
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

	const styles = {
		select: {
			".MuiOutlinedInput-notchedOutline": {
				borderColor: "var(--color-primary)",
				borderRadius: "0",
			},
			height: "46px",
			color: "var(--color-primary)",
		},
		accordion: {
			".MuiAccordion-heading": {},
			backgroundColor: "var(--color-snow-white)",
			color: "var(--color-primary)",
		},
	};

	return (
		<div className="h-full w-full flex text-primary border-primary items-center justify-between gap-20 p-10">
			<form className="flex flex-col w-1/2 gap-10 shrink-0 overflow-y-auto items-center">
				<h1 className="text-4xl">Create a New Workout</h1>
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
									onChange={(e) =>
										setExerciseName(e.target.value)
									}
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
										onChange={(e) =>
											setSets(
												Number.parseInt(e.target.value)
											)
										}
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
											setReps(
												Number.parseInt(e.target.value)
											);
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
									onChange={(e) =>
										setMuscles(e.target.value as Muscle[])
									}
								>
									{Object.keys(Muscle).map((muscle) => {
										return (
											<MenuItem
												key={muscle}
												value={muscle}
											>
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
			<div className="h-full w-1/2 flex flex-col gap-10">
				<span className="text-4xl" hidden={exercises.length === 0}>
					Exercises
				</span>
				<div className="flex flex-col gap-5">
					{exercises?.map((exercise) => {
						return (
							<Accordion
								key={exercise.name}
								sx={styles.accordion}
								className="px-3"
							>
								<AccordionSummary
									expandIcon={<ChevronDown />}
									className="font-bold text-primary text-2xl"
								>
									{exercise.name} - {exercise.sets}x
									{exercise.reps}
								</AccordionSummary>
								<AccordionDetails className="text-text flex flex-col gap-4">
									<Typography className="flex flex-col">
										<span className="font-semibold">
											Muscles Worked
										</span>
										<span className="text-sm">
											{exercise.musclesWorked.join(", ")}
										</span>
									</Typography>
									<Typography className="flex flex-col">
										<span className="font-semibold">
											Instructions
										</span>
										<span className="text-sm">
											{exercise.instructions},
										</span>
									</Typography>
									<Typography></Typography>
								</AccordionDetails>
							</Accordion>
						);
					})}
				</div>
			</div>
			<Modal
				open={modalOpen}
				disableAutoFocus
				className="flex items-center justify-center text-primary text-center"
			>
				<div className="bg-snow-white w-1/3 h-1/3 rounded-3xl p-10 text-4xl font-semibold flex flex-col">
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
