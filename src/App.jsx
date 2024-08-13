
import Navbar from "./components/navbar/Navbar";
import { TaskProvider } from "./context/TaskContext"; 

const App = () => {
  return (
    <TaskProvider>
      <Navbar />
      
    </TaskProvider>
  );
};

export default App;
