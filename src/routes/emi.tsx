import { createFileRoute } from '@tanstack/react-router';
import EmiCalculator from '../components/emi-calculator';

export const Route = createFileRoute('/emi')({
  component: EmiPage,
});

function EmiPage() {
  return (
    <div className="container mx-auto py-8">
      <EmiCalculator />
    </div>
  );
}
