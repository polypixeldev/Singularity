import React, { Component, useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import axios from "axios";

function useLogin(props) {
	let query = new URLSearchParams(useLocation().search);

	useEffect(() => {
		if (query.get("code")) {
			axios.post("https://discord.com/api/v8/oauth2/token", {
				client_id: process.env.CLIENT_ID,
				client_secret: process.env.CLIENT_SECRET,
				grant_type: "authorization_code",
				code: query.get("code"),
				redirect_uri: "https://singularitybot.glitch.me/dashboard",
			});
		}

		if (props.userInfo) {
			window.location.pathname = "/dashboard";
		} else {
			window.location.href =
				"https://discord.com/api/oauth2/authorize?client_id=860552124064202812&redirect_uri=https%3A%2F%2Fsingularitybot.glitch.me%2Flogin&response_type=code&scope=identify%20email%20guilds";
		}
	});
}

export default useLogin;
