import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          borderRadius: "10px",
          padding: "12px",
          fontSize: "15px",
        },
      }}
    />
  );
}
