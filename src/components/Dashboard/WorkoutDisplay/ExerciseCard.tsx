import { NavLink, useParams } from "react-router";
import { Exercise } from "../../../util/interfaces";
import React, { useMemo } from "react";

interface ExerciseCardProps {
	exercise: Exercise;
	chosenExercise: Exercise | undefined;
	setChosenExercise: React.Dispatch<React.SetStateAction<Exercise | undefined>>;
}

export default function ExerciseCard({ exercise, chosenExercise, setChosenExercise }: ExerciseCardProps) {
	const completed = useMemo(() => {
		return exercise.setsCompleted === exercise.sets;
	}, [exercise]);

	const { workout } = useParams();

	return (
		<NavLink
			to={`/dashboard/${workout}/${exercise.name.replace(" ", "").toLowerCase()}`}
			key={exercise.name}
			className={`text-xl font-bold ${completed ? "opacity-20 cursor-default" : "hover:bg-accent hover:text-snow-white"}  ${
				chosenExercise && chosenExercise.name === exercise.name ? "bg-primary text-snow-white" : ""
			} py-4 px-3 rounded-lg hover-css shadow-md`}
			onClick={() => !completed && setChosenExercise(exercise)}
		>
			{exercise.name.toUpperCase()}
		</NavLink>
	);
}
