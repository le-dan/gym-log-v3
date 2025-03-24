import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import { ChevronDown } from "lucide-react";
import { Exercise } from "../../util/interfaces";

interface ExerciseAccordionProps {
	exercise: Exercise;
}

export default function ExerciseAccordion({ exercise }: ExerciseAccordionProps) {
	const styles = {
		accordion: {
			".MuiAccordion-heading": {},
			backgroundColor: "var(--color-snow-white)",
			color: "var(--color-primary)",
		},
	};

	return (
		<Accordion key={exercise.name} sx={styles.accordion} className="px-3">
			<AccordionSummary expandIcon={<ChevronDown />} className="font-semibold text-primary text-2xl">
				{exercise.name} - {exercise.sets}x{exercise.reps}
			</AccordionSummary>
			<AccordionDetails className="text-text flex flex-col gap-4">
				<Typography className="flex flex-col">
					<span className="font-semibold">Muscles Worked</span>
					<span className="text-sm">{exercise.musclesWorked.join(", ")}</span>
				</Typography>
				<Typography className="flex flex-col">
					<span className="font-semibold">Instructions</span>
					<span className="text-sm">{exercise.instructions}</span>
				</Typography>
				<Typography></Typography>
			</AccordionDetails>
		</Accordion>
	);
}
