
'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCountdown } from '@/hooks/use-countdown';
import { getFlashSaleProducts } from '@/lib/flash-sales-data';
import { Zap } from 'lucide-react';

const CountdownTimer = ({ targetDate }: { targetDate: number }) => {
  const { hours, minutes, seconds } = useCountdown(targetDate);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-1.5 font-mono text-lg font-bold">
      <span className="rounded-md bg-primary px-2 py-1 text-primary-foreground">{formatTime(hours)}</span>
      <span>:</span>
      <span className="rounded-md bg-primary px-2 py-1 text-primary-foreground">{formatTime(minutes)}</span>
      <span>:</span>
      <span className="rounded-md bg-primary px-2 py-1 text-primary-foreground">{formatTime(seconds)}</span>
    </div>
  );
};

export function FlashSaleStatus() {
  const [targetDate, setTargetDate] = React.useState(0);
  const flashSaleProducts = getFlashSaleProducts();

  React.useEffect(() => {
    // Set a future date for the countdown timer when the component mounts
    setTargetDate(new Date().getTime() + 3 * 60 * 60 * 1000);
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Flash Sale Status</CardTitle>
                <CardDescription>Currently active flash sale.</CardDescription>
            </div>
            <Zap className="h-6 w-6 text-yellow-500" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Time Remaining</h4>
          {targetDate > 0 && <CountdownTimer targetDate={targetDate} />}
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium text-muted-foreground">
            On Sale Products ({flashSaleProducts.length})
          </h4>
          <div className="space-y-3">
            {flashSaleProducts.slice(0, 3).map((product) => (
              <div key={product.id} className="flex items-center gap-3">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-primary">UGX {product.price.toLocaleString()}</p>
                    {product.originalPrice && (
                        <p className="text-xs text-muted-foreground line-through">
                            UGX {product.originalPrice.toLocaleString()}
                        </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
