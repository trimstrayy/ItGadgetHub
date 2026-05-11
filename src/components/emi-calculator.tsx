import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Slider } from './ui/slider';

const banks = [
  { name: 'Himalayan Bank', interestRate: 6.99 },
  { name: 'Global IME', interestRate: 0 },
  { name: 'Nabil Bank', interestRate: 9.5 },
  { name: 'Siddhartha Bank', interestRate: 12 },
  { name: 'Machhapuchre Bank', interestRate: 8.5 }, // Using average for 7-10%
];

const EmiCalculator = () => {
  const [amount, setAmount] = useState(20000);
  const [interest, setInterest] = useState(8.5);
  const [tenure, setTenure] = useState(12);

  const handleAmountChange = (value: number[]) => {
    setAmount(value[0]);
  };

  const handleInterestChange = (value: number[]) => {
    setInterest(value[0]);
  };

  const handleTenureChange = (value: number[]) => {
    setTenure(value[0]);
  };

  const monthlyEmi = useMemo(() => {
    if (amount > 0 && interest > 0) {
      const principal = amount;
      const rateOfInterest = interest / 100 / 12;
      const numberOfPayments = tenure;
      const emiValue =
        (principal * rateOfInterest * Math.pow(1 + rateOfInterest, numberOfPayments)) /
        (Math.pow(1 + rateOfInterest, numberOfPayments) - 1);
      return emiValue;
    }
    return amount / tenure;
  }, [amount, interest, tenure]);

  const totalAmount = useMemo(() => monthlyEmi * tenure, [monthlyEmi, tenure]);
  const totalInterest = useMemo(() => totalAmount - amount, [totalAmount, amount]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="glass-strong">
          <CardHeader>
            <CardTitle>$ Loan Details</CardTitle>
            <p className="text-muted-foreground text-sm">Enter your loan information to calculate EMI</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="amount" className="font-semibold">Loan Amount</label>
              <div className="flex items-center gap-4">
                <Slider id="amount" min={1000} max={5000000} step={1000} value={[amount]} onValueChange={handleAmountChange} />
                <Input className="w-48" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>NPR 1,000</span>
                <span>NPR 50,00,000</span>
              </div>
            </div>
            <div>
              <label htmlFor="interest" className="font-semibold">Annual Interest Rate (%)</label>
              <div className="flex items-center gap-4">
                <Slider id="interest" min={0} max={30} step={0.1} value={[interest]} onValueChange={handleInterestChange} />
                <Input className="w-48" type="number" value={interest} onChange={(e) => setInterest(Number(e.target.value))} />
              </div>
               <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span>
                <span>30%</span>
              </div>
            </div>
            <div>
              <label htmlFor="tenure" className="font-semibold">Loan Tenure (Months)</label>
              <div className="flex items-.center gap-4">
                <Slider id="tenure" min={1} max={360} step={1} value={[tenure]} onValueChange={handleTenureChange} />
                <Input className="w-48" type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1 Month</span>
                <span>30 Years</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="glass-strong mb-4">
          <CardHeader>
            <CardTitle>Bank EMI Interest Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {banks.map(bank => (
                <li key={bank.name} className="flex justify-between">
                  <span>{bank.name}</span>
                  <span className="font-semibold">{bank.interestRate}%</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="glass-strong">
          <CardHeader>
            <CardTitle>EMI Calculation Results</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-lg bg-primary/10">
                <div className="text-sm text-muted-foreground">Monthly EMI</div>
                <div className="text-2xl font-bold">NPR {monthlyEmi.toFixed(2)}</div>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10">
                <div className="text-sm text-muted-foreground">Total Amount</div>
                <div className="text-2xl font-bold">NPR {totalAmount.toFixed(2)}</div>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10">
                <div className="text-sm text-muted-foreground">Total Interest</div>
                <div className="text-2xl font-bold">NPR {totalInterest.toFixed(2)}</div>
              </div>
               <div className="p-4 rounded-lg bg-purple-500/10">
                <div className="text-sm text-muted-foreground">Principal Amount</div>
                <div className="text-2xl font-bold">NPR {amount}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmiCalculator;
