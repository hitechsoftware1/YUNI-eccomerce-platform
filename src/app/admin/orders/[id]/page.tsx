
import * as React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getOrderById } from '@/lib/user-orders';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { UpdateStatusForm } from './components/update-status-form';
import type { Order } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Building, Mail, Phone, User } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const order = getOrderById(params.id);

  if (!order) {
    notFound();
  }

  const { items = [], shippingAddress, customer } = order;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-headline">Order {order.id}</h1>
            <p className="text-muted-foreground">
                Placed on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
                variant={order.status === 'Cancelled' ? 'destructive' : 'secondary'}
                className={cn('capitalize text-base',
                    order.status === 'Fulfilled' && 'bg-green-600 text-primary-foreground hover:bg-green-600/80',
                    order.status === 'Pending' && 'bg-yellow-500 text-primary-foreground hover:bg-yellow-500/80'
                )}
            >
                {order.status}
            </Badge>
            <UpdateStatusForm orderId={order.id} currentStatus={order.status} />
          </div>
      </div>
      
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 space-y-6">
          <Card>
              <CardHeader>
                  <CardTitle>Order Items ({items.length})</CardTitle>
              </CardHeader>
              <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16 hidden sm:table-cell">Image</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead className="w-24 text-center">Quantity</TableHead>
                        <TableHead className="w-32 text-right">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map(item => (
                          <TableRow key={item.id}>
                              <TableCell className="hidden sm:table-cell">
                                <div className="relative h-12 w-12 rounded-md border">
                                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" data-ai-hint={item.dataAiHint} />
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell className="text-center">{item.quantity}</TableCell>
                              <TableCell className="text-right">UGX {(item.price * item.quantity).toLocaleString()}</TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
              </CardContent>
              <CardFooter className="bg-secondary flex justify-end">
                  <div className="flex justify-between font-bold text-lg w-full">
                      <span>Total</span>
                      <span>UGX {order.total.toLocaleString()}</span>
                  </div>
              </CardFooter>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
              <CardHeader>
                  <CardTitle>Customer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{customer.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${customer.email}`} className="text-primary hover:underline">{customer.email}</a>
                  </div>
                  {shippingAddress?.phoneNumber && (
                     <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                         <a href={`tel:${shippingAddress.phoneNumber}`} className="text-primary hover:underline">{shippingAddress.phoneNumber}</a>
                    </div>
                  )}
              </CardContent>
          </Card>
           {shippingAddress && (
              <Card>
                  <CardHeader>
                      <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 text-sm text-muted-foreground">
                      <p className="font-semibold text-foreground">{shippingAddress.fullName}</p>
                      <p>{shippingAddress.addressLine1}</p>
                      <p>{shippingAddress.city}, {shippingAddress.postalCode}</p>
                      <p>{shippingAddress.country}</p>
                  </CardContent>
              </Card>
          )}
        </div>
      </div>
    </div>
  );
}
