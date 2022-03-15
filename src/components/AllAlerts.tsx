import Alert from "./Alert";
import { useAlert, useUpdateAlert } from "./AlertProvider";


export default function AllAlerts() {
  const alertState = useAlert();
  const updateAlertState = useUpdateAlert();

  return (
    <div>
      <Alert 
        show={!!alertState.error} 
        onClose={() => updateAlertState.setError("")}
        message={alertState.error}
        severity="error" 
      />
      <Alert 
        show={!!alertState.success} 
        onClose={() => updateAlertState.setSuccess("")}
        message={alertState.success}
        severity="success" 
      />
    </div>
  )
}
