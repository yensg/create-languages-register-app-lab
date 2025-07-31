import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";
import LanguageDisplay from "./components/LanguageDisplay";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container border border-primary">
        <LanguageDisplay />
      </div>
    </QueryClientProvider>
  );
}

export default App;
