import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	IconButton,
	Box,
	TextField,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
} from "@mui/material";
import { ChevronDown, Pencil, Trash } from "lucide-react";
import { Exercise, Muscle } from "../../util/interfaces";
import { useState } from "react";

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

	const [muscles, setMuscles] = useState<Muscle[]>(exercise.musclesWorked);
	const [openAccordion, setOpenAccordion] = useState(false);
	const [editMode, setEditMode] = useState(false);
	function handleEdit() {
		if (!openAccordion) {
			setOpenAccordion(!openAccordion);
		}
		setEditMode(!editMode);
	}
	return (
		<Accordion key={exercise.name} sx={styles.accordion} className="px-5" expanded={openAccordion}>
			<Box sx={{ display: "flex" }}>
				<AccordionSummary
					onClick={() => setOpenAccordion(!openAccordion)}
					expandIcon={<ChevronDown />}
					className="font-semibold text-primary text-2xl"
				>
					{exercise.name}
				</AccordionSummary>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<IconButton className="h-fit" onClick={() => handleEdit()}>
						<Pencil className="text-primary" />
					</IconButton>
					<IconButton className="h-fit">
						<Trash className="text-red-400" />
					</IconButton>
				</Box>
			</Box>
			<AccordionDetails sx={{padding: 3}} className="text-text flex flex-col gap-8">
				<Typography component={"div"} className="flex text-xl gap-3 text-primary justify-center items-center">
					<TextField
						fullWidth
						color="primary"
						size="small"
						label="Exercise Name"
						variant="outlined"
						value={exercise.name}
						disabled={!editMode}
					/>
				</Typography>
				<Typography component={"div"} className="flex text-xl gap-3 text-primary justify-center items-center">
					<TextField color="primary" size="small" label="Sets" variant="outlined" value={exercise.sets} disabled={!editMode} />
					x
					<TextField color="primary" size="small" label="Repetitions" variant="outlined" value={exercise.reps} disabled={!editMode} />
				</Typography>
				<Typography component={"div"} className="flex flex-col">
					<FormControl>
						<InputLabel id="muscles-worked-label">Muscles Worked</InputLabel>
						<Select
							multiple
							size="small"
							className="w-full"
							labelId="muscles-worked-label"
							label="Muscles Worked"
							value={muscles}
							disabled={!editMode}
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
					</FormControl>
				</Typography>
				<Typography className="flex flex-col">
					<TextField
						fullWidth
						className="w-23"
						color="primary"
						size="small"
						label="Notes"
						variant="outlined"
						value={exercise.notes}
						disabled={!editMode}
					/>
				</Typography>
			</AccordionDetails>
		</Accordion>
	);
}
