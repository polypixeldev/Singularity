import { Interaction } from "discord.js";

import Singularity from "../interfaces/singularity";

type InteractionHandler = (
	client: Singularity,
	interaction: Interaction
) => void;

export default InteractionHandler;
