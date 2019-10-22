import axios from "axios";

const HOST =
  process.env.NODE_ENV === "production"
    ? "https://albicelestes.com"
    : "http://localhost:1986";

const API_URL = `${HOST}/api/`;

export default async (resource: string) => {
  try {
    const url = API_URL + resource;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
