import { useState, createContext, useContext } from "react";

const AlertContext = createContext({ error: "", success: "" });
const AlertUpdateContext = createContext({ 
  setError: (msg: string) => {},
  setSuccess: (msg: string) => {},
});

export function useAlert() {
  return useContext(AlertContext);
}

export function useUpdateAlert() {
  return useContext(AlertUpdateContext);
}

export function AlertProvider(props: { children?: JSX.Element }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const setter = {
    setError: (msg: string) => { setError(msg); },
    setSuccess: (msg: string) => { setSuccess(msg); },
  }

  return (
    <AlertContext.Provider value={{ error, success }}>
      <AlertUpdateContext.Provider value={setter}>
        {props.children}
      </AlertUpdateContext.Provider>
    </AlertContext.Provider>
  )
}
