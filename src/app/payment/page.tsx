import PaymentPageDisplay from "@/components/payment/payment-page";
import ProtectedRoute from "@/context/ProtectedRoute";

export default function PaymentPage() {
  return (
    <ProtectedRoute>
      <PaymentPageDisplay />
    </ProtectedRoute>
  );
}
