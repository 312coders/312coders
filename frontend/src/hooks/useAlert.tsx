import { ReactNode, createContext, useContext, useMemo, useReducer } from "react"

export const DEFAULT_ALERT_TIMEOUT = 5000;

type State = {
  msg: string,
  status: 'info' | 'warning' | 'error' | 'success'
  displayMs?: number,
}

type Action =
  | { type: 'setMsg'; payload: Omit<State, 'displayMs'> }
  | { type: 'setDisplayMs', payload: number }

const initialState: State = {
  msg: '',
  status: 'info',
  displayMs: DEFAULT_ALERT_TIMEOUT,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setMsg':
      return { ...state, msg: action.payload.msg, status: action.payload.status };
    case 'setDisplayMs':
      return { ...state, displayMs: action.payload }
  }
}

interface IAlertContext {
  alertState: State,
  setMsg: (msg: string, status?: State["status"]) => void
  setDisplayMs: (displayMs: number) => void
}

const AlertContext = createContext<IAlertContext>({} as IAlertContext);

export function AlertContextProvider ({ children }: { children: ReactNode }) {
  const [alertState, dispatch] = useReducer(reducer, initialState);

  const setMsg = (msg: string, status?: State["status"]) => {
    dispatch({type: "setMsg", payload: {msg: msg, status: status ?? 'info'}})
  }

  const setDisplayMs = (displayMs: number) => {
    dispatch({type: "setDisplayMs", payload: displayMs});
  }

  const value = useMemo(() => ({
    alertState,
    setMsg,
    setDisplayMs
  }), [alertState, dispatch])

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}