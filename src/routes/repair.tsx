import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WHATSAPP_NUMBER } from '@/data/products';

export const Route = createFileRoute('/repair')({
  component: RepairPage,
});

function RepairPage() {
  const message = "Hello, I would like to inquire about repairing my device.";
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <div className="container mx-auto py-8">
      <Card className="glass-strong">
        <CardHeader>
          <CardTitle>Device Repair Services</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            We offer expert repair services for a wide range of electronic devices, including smartphones, laptops, and more. Our experienced technicians are here to help you get your devices back in working order.
          </p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button>Contact us on WhatsApp</Button>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
