import axios from "axios";

export const generateBrowserLoginUniqueId = () =>
  Math.random().toString(36).substring(2, 15);

// Function to extract values from the access token
export const extractValuesFromToken = async (token) => {
  try {
    // Send the token to the backend for extraction (optional)
    // Alternatively, you can extract values directly on the frontend if needed
    const { data } = await axios.post("/extract-values-from-token", {
      token,
    });
    return data;
  } catch (error) {
    console.error("Error extracting values from token:", error);
    return null;
  }
};
