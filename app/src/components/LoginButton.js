import API from "../api";
import GoogleLogin from "react-google-login";
import React from "react";
import Section from "./Section";
import { useHistory } from "react-router-dom";

export default () => {
	const [error, setError] = React.useState();
	const [loading, setLoading] = React.useState();

	const handleClick = () => {
		setLoading("Signing you in...");
	};

	const handleSuccess = async (user) => {
		const { id_token } = user.getAuthResponse();

		localStorage.setItem("google_auth_token", id_token);

		const { success, content } = await API.get(
			`token?id_token=${id_token}`
		);

		if (success) {
			localStorage.setItem("ts-role", content.role);
			if (window.location.pathname !== "/") window.location.href = "/";
			else window.location.reload();
		} else {
			setError(content);
		}
	};

	const handleFailure = (response) => {
		console.log("Failure", response);
	};

	return (
		<Section error={error} loading={loading}>
			<div onClick={handleClick}>
				<GoogleLogin
					clientId="218807385555-cnlc8e780kouun416qag1fe5r0uenioq.apps.googleusercontent.com"
					buttonText="Login with Google"
					onSuccess={handleSuccess}
					onFailure={handleFailure}
					// cookiePolicy={"single_host_origin"}
				/>
			</div>
		</Section>
	);
};
