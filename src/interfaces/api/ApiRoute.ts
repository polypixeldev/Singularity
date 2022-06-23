import type { AxiosInstance } from "axios";
import type { Request, Response } from "express";

import type APIClient from "../../website/server.js";

type ApiRoute = (
	discord: AxiosInstance,
	client: APIClient,
	req: Request,
	res: Response
) => void;

export default ApiRoute;
