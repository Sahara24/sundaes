import logo from "./logo.svg";
import "./App.css";
import SummaryForm from "./pages/summary/SummaryForm";
import Options from "./pages/entry/Options";

function App() {
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <SummaryForm />
    </div>
  );
}

export default App;
