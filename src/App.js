import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThankYou from "./pages/thankYou/ThankYou";
import { useState } from "react";
import OrderSummary from "./pages/summary/OrderSummary";

function App() {
  const [orderNum, setOrderNum] = useState(null);
  const handleOrderNumber = (orderNumber) => {
    setOrderNum(() => orderNumber);
  };
  return (
    <Container>
      <OrderDetailsProvider>
        <Routes>
          <Route path="/" element={<OrderEntry />} />
          <Route
            path="/order-summary"
            element={<OrderSummary handleOrderNumber={handleOrderNumber} />}
          />
          <Route
            path="/thankyou"
            element={<ThankYou orderNumber={orderNum} />}
          />
        </Routes>
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
