import axios from "axios";

// Create an Axios instance with custom configuration
export const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_TMDB_URL,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS}`, // Replace with your actual access token
	},
});
