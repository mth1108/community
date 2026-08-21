import MainRouter from "./routes/MainRouter.tsx";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainRouter/>
      </BrowserRouter>
    </>
  )
}

export default App
