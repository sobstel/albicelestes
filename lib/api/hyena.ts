import axios from "axios";

const API_URL =
  "https://gf0tywygmf.execute-api.eu-west-2.amazonaws.com/prod/hyena?func=";

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
