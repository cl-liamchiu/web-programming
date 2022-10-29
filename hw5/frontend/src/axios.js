import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:4000/api/guess" });

const startGame = async () => {
    try {
        const {
            data: { msg },
          } = await instance.post("/start");
          return msg;
    }catch (error){
        return "503 Service Unavailable"
    }
};

const guess = async (number) => {
  try {
    const {
      data: { msg, range },
    } = await instance.get("/guess", { params: { number } });
    console.log(msg)
    console.log(range)
    return {msg, range};
  } catch (error) {
    const errorMessage = error.message
    if (errorMessage === "Request failed with status code 406") {
        const {
            data: { msg },
          } =  error.response
        return {msg};
    }else{
        return "503 Service Unavailable"
    }
  }
};

const restart = async () => {
    try {
        const {
            data: { msg },
          } = await instance.post("/restart");
          return msg;
    }catch (error){
        return "503 Service Unavailable"
    }
  };

export { startGame, guess, restart };
