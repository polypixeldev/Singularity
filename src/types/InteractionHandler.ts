import type { Interaction } from "discord.js";

import type Singularity from "../interfaces/singularity.js";

type InteractionHandler = (
	client: Singularity,
	interaction: Interaction
) => void;

export default InteractionHandler;
