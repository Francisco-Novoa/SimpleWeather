import axios from "axios";

const get = async url => {
  try {
    return (await axios.get(url)).data;
  } catch (error) {
    console.error(error);
  }
};

export { get };
