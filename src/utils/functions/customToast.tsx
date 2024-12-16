import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import Button from "@/shared/components/button/Button";

type ToastType = "success" | "error" | "warning";

interface ToastConfig {
  svg: JSX.Element;
  backGround: string;
}

const toastConfig: Record<ToastType, ToastConfig> = {
  success: {
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-check-big"
      >
        <path d="M21.801 10A10 10 0 1 1 17 3.335" />
        <path d="m9 11 3 3L22 4" />
      </svg>
    ),
    backGround: "#16a34a",
  },
  error: {
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-alert"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
      </svg>
    ),
    backGround: "#e11d48",
  },
  warning: {
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-triangle-alert"
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    ),
    backGround: "#f59e0b",
  },
};

export const customToast = (type: ToastType, msg: string) => {
  toast.custom((t) => (
    <motion.div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: toastConfig[type].backGround,
        color: "#f2f2f2",
        borderRadius: "10px",
        padding: "15px 20px",
        gap: "20px",
        fontWeight: "600",
        minWidth: "250px",
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent:"center" }}>
        {toastConfig[type].svg}
        <span>{msg}</span>
      </div>
      <Button properties={{ type: "toast", onClickfn: () => toast.dismiss(t.id) }}>
          X
        </Button>
    </motion.div>
  ));
};
