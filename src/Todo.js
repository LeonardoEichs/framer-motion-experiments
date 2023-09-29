import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { ArrowRight, X } from "react-bootstrap-icons";

const initialTodos = [
  {
    id: 1,
    title: "Lorem 1",
    completed: false,
  },
  {
    id: 2,
    title: "Lorem 2",
    completed: false,
  },
  {
    id: 3,
    title: "Lorem 3",
    completed: false,
  },
  {
    id: 4,
    title: "Lorem 4",
    completed: false,
  },
  {
    id: 5,
    title: "Lorem 5",
    completed: false,
  },
  {
    id: 6,
    title: "Lorem 6",
    completed: false,
  },
  {
    id: 7,
    title: "Lorem 7",
    completed: false,
  },
  {
    id: 8,
    title: "Lorem 8",
    completed: false,
  },
  {
    id: 9,
    title: "Lorem 9",
    completed: false,
  },
];

const Todo = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState("");

  const controls = useAnimationControls();

  let startedAnimation = useRef(false);
  let hasRenderedRemindersRef = useRef(false);
  useEffect(() => {
    hasRenderedRemindersRef.current = true;
    return () => {
      hasRenderedRemindersRef.current = false;
    };
  }, []);

  const handleClick = (i) => {
    setTodos(
      todos.map((todo, index) =>
        index === i ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleAddTodo = () => {
    if (!newTodo) {
      if (!startedAnimation.current) {
        controls.start("shake");
        startedAnimation.current = setTimeout(() => {
          controls.stop();
          startedAnimation.current = false;
        }, 500);
      }
      return;
    }
    setTodos([
      ...todos,
      { id: Math.random(), title: newTodo, completed: false },
    ]);
    setNewTodo("");
  };

  return (
    <div className="h-screen w-screen bg-blue-200">
      <div className="flex items-center justify-center h-full">
        <div className="w-1/2 bg-white min-h-[50%] rounded shadow-md p-4 pb-6 flex flex-col gap-4">
          <h1 className="text-xl font-semibold">Todos</h1>
          <div className="relative">
            <motion.input
              className="bg-white border border-black rounded w-full py-2 text-xs px-2"
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTodo(e);
                }
              }}
              value={newTodo}
              variants={{
                shake: {
                  x: [-10, 0, 10, 0, -10, 0, 10, 0, -10, 0, 10, 0],
                },
              }}
              animate={controls}
            />
            <ArrowRight
              className="absolute right-2 top-2 text-gray-800 cursor-pointer hover:text-gray-600"
              onClick={handleAddTodo}
            />
          </div>
          <ul className="flex flex-col gap-4 mt-4">
            {todos.map((todo, i) => (
              <>
                <AnimatePresence>
                  {!todo.completed && (
                    <motion.li
                      key={todo.id}
                      variants={{
                        hidden: (i) => ({ opacity: 0, y: -10 * i }),
                        visible: (i) => ({
                          opacity: 1,
                          transition: {
                            delay: i * 0.025,
                          },
                          y: 0,
                        }),
                        removed: {
                          opacity: 0,
                        },
                      }}
                      initial={
                        hasRenderedRemindersRef.current ? "visible" : "hidden"
                      }
                      whileInView="visible"
                      exit="removed"
                      custom={i}
                      className="text-lg flex justify-between w-full"
                    >
                      <span>{todo.title}</span>
                      <div className="relative flex items-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileTap={{ scale: 1.25 }}
                          className="absolute inset-0 bg-gray-50 rounded-full"
                        />
                        <X
                          className="relative cursor-pointer w-6 h-6 text-gray-500 hover:text-gray-400 hover:transition-colors hover:duration-300"
                          onClick={() => handleClick(i)}
                        />
                      </div>
                    </motion.li>
                  )}
                </AnimatePresence>
              </>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
