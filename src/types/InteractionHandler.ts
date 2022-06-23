import { Interaction } from "discord.js";

import Singularity from "../interfaces/singularity.js";

type InteractionHandler = (
	client: Singularity,
	interaction: Interaction
) => void;

export default InteractionHandler;
