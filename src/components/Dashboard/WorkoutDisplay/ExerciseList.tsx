import { Exercise } from "../../../util/interfaces";
import ExerciseCard from "./ExerciseCard";

interface ExerciseListProps {
	exercises: Exercise[];
	chosenExercise: Exercise | undefined;
	setChosenExercise: React.Dispatch<React.SetStateAction<Exercise | undefined>>;
}

export default function ExerciseList({ exercises, chosenExercise, setChosenExercise }: ExerciseListProps) {
	const renderExercises = () => {
		const exerciseElements = exercises.map((exercise) => {
			return <ExerciseCard key={exercise.name} exercise={exercise} chosenExercise={chosenExercise} setChosenExercise={setChosenExercise} />;
		});
		return exerciseElements;
	};
	return <div className="h-full w-1/4 px-3 flex flex-col gap-3 shrink-0">{renderExercises()}</div>;
}
