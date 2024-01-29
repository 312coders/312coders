import { useEffect, useMemo } from "react";
import { useAlert, DEFAULT_ALERT_TIMEOUT } from "../hooks/useAlert";


const Alert = () => {
  const { alertState, setMsg } = useAlert();

  const color = useMemo(() => {
    switch (alertState.status) {
      case "error": return "red";
      case "info": return "blue";
      case "success": return "green";
      case "warning": return "yellow";
      default: return "gray";
    }
  }, [alertState.status])

  useEffect(() => {
    if (alertState.msg === '') return;

    const timer = setTimeout(() => {
      setMsg('')
    }, alertState.displayMs ?? DEFAULT_ALERT_TIMEOUT);
    return () => clearTimeout(timer);
  }, [alertState])

  if (alertState.msg === '') {
    return null;
  }

  return (
    <div className={`flex items-center p-4 mb-4 text-white rounded-lg bg-${color}-500 fixed bottom-0 right-0 m-8`} role="alert">
      <div className="ml-3 text-sm font-medium mr-2">
        {alertState.msg}
      </div>
      <button
          className={`ml-auto -mx-1.5 -my-1.5 bg-${color}-500 text-white rounded-lg focus:ring-2 p-1.5 hover:bg-${color}-300 inline-flex items-center justify-center h-8 w-8`}
          onClick={() => {
            setMsg('');
          }}
      >
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
  )
}

export default Alert;