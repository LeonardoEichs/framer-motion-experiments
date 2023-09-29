import { motion } from "framer-motion";
import "./index.css";
import StepPage from "./StepPage";
import Email from "./Email";
import ResizablePanel from "./Panel";
import Todo from "./Todo";

function App() {
  return (
    <>
      <div className="h-screen w-screen bg-green-200">
        <div className="font-bold text-[10rem]">
          <motion.h1
            initial={{
              x: "-50%",
            }}
            animate={{
              x: 0,
              transition: {
                delay: 1,
              },
            }}
          >
            Welcome
          </motion.h1>
          <h1>to</h1>
          <motion.h1
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
              transition: {
                delay: 1,
              },
            }}
          >
            homepage
          </motion.h1>
        </div>
      </div>
      <div className="h-screen w-screen bg-red-200 flex flex-col items-center justify-center">
        <div className="font-bold text-[12rem]">
          <motion.h1
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
              transition: {
                delay: 1,
              },
            }}
          >
            Welcome
          </motion.h1>
        </div>
      </div>
      <Todo />
      <StepPage />
      <Email />
      <ResizablePanel />
    </>
  );
}

export default App;
