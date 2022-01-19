import { AxiosInstance } from "axios";
import { Request, Response } from "express";

import APIClient from "../../website/server";

type ApiRoute = (
	discord: AxiosInstance,
	client: APIClient,
	req: Request,
	res: Response
) => void;

export default ApiRoute;
