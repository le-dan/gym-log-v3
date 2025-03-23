import { WorkoutInterface } from "../../util/interfaces";
import { useEffect, useState } from "react";
import { testWorkouts } from "../../SampleWorkouts";
import { aggregateMuscles, fetchData } from "../../util/util";
import { NavLink } from "react-router";
import NavBar from "./NavBar";
interface WorkoutGridProps {
	setChosenWorkout: React.Dispatch<
		React.SetStateAction<WorkoutInterface | undefined>
	>;
}

export default function WorkoutGrid({ setChosenWorkout }: WorkoutGridProps) {
	function handleWorkoutClick(workout: WorkoutInterface) {
		setChosenWorkout(workout);
	}

	const renderWorkouts = (workouts: WorkoutInterface[]) => {
		return workouts.map((workout, index) => {
			const allMuscles = aggregateMuscles(workout);

			return (
				<NavLink
					onClick={() => handleWorkoutClick(workout)}
					className="bg-snow-white drop-shadow-lg rounded-lg h-35 w-[340px] justify-between items-center hover:scale-105 hover:shadow-md hover:shadow-accent ease-in-out duration-300 hover:cursor-pointer p-6 flex gap-5"
					key={index}
					to={
						"/dashboard/" +
						workout.name.replace(" ", "").toLowerCase()
					}
				>
					<div className="flex-col flex shrink-0 max-w-19">
						<span className="font-bold">{workout.name}</span>
						<span>{workout.exercises.length} exercises</span>
					</div>
					<div className="h-full w-[2px] bg-snow-white-dark opacity-80 rounded-xl shrink-0"></div>
					<div className="overflow-y-auto flex flex-col h-full w-full items-center scroll-smooth">
						<span>Muscles Worked</span>
						{allMuscles.map((muscle, index) => {
							return (
								<span className="font-thin" key={index}>
									{muscle.toLowerCase()}
								</span>
							);
						})}
					</div>
				</NavLink>
			);
		});
	};

	const [workouts, setWorkouts] = useState<WorkoutInterface[]>([]);
	useEffect(() => {
		if (workouts.length === 0) {
			setWorkouts(testWorkouts);
			fetchData<WorkoutInterface[]>("WorkoutsDB")
				.then((res) => {
					if (res) {
						setWorkouts(testWorkouts.concat(res));
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	return (
		<>
			<NavBar />
			<div className="h-full w-full bg-snow-white p-10 shadow-lg rounded-lg flex flex-col gap-10 text-text min-h-0">
				<span className="text-3xl font-bold text-primary">
					choose a workout for today,
				</span>
				<div
					className="min-h-0 h-full w-full grid grid-rows-[repeat(auto-fill,_minmax(140px,1fr))] grid-cols-[repeat(auto-fill,_minmax(330px,1fr))] gap-8 overflow-y-auto p-4"
					style={{ scrollbarGutter: "stable both-edges" }}
				>
					{renderWorkouts(workouts)}
				</div>
			</div>
		</>
	);
}
