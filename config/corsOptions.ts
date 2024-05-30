const whitelist: string[] = ["http://localhost:3600"];

const corsOptions = {
  origin: (
    origin: string,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log("not allowed by Cors");
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;
