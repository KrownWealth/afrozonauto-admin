'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { CustomBtn } from '@/components/shared/CustomBtn';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { ConfirmModal } from '@/components/shared/ConfirmModal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePayments, useInitiateRefund } from '@/lib/hooks';
import { CreditCard, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

export default function PaymentsPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const { data: payments, isLoading } = usePayments();
  const initiateRefund = useInitiateRefund();

  const filteredPayments = payments?.filter(payment =>
    statusFilter === 'all' || payment.status === statusFilter
  );

  const handleRefundClick = (paymentId: string) => {
    setSelectedPayment(paymentId);
    setRefundModalOpen(true);
  };

  const confirmRefund = () => {
    if (selectedPayment) {
      const payment = payments?.find(p => p.id === selectedPayment);
      if (payment) {
        initiateRefund.mutate(
          { paymentId: payment.id, amount: payment.amount },
          {
            onSuccess: () => {
              setRefundModalOpen(false);
              setSelectedPayment(null);
            },
          }
        );
      }
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    return <CreditCard className="h-4 w-4" />;
  };

  const payment = payments?.find(p => p.id === selectedPayment);

  return (
    <div>
      <Header
        title="Payments"
      // description="Track payment transactions and process refunds"
      />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Filters */}
        {/* Summary Stats */}
        {payments && (
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{payments.length}</div>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  ${payments
                    .filter(p => p.status === 'completed')
                    .reduce((sum, p) => sum + p.amount, 0)
                    .toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {payments.filter(p => p.status === 'pending').length}
                </div>
                <p className="text-sm text-muted-foreground">Pending</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  ${payments
                    .filter(p => p.status === 'refunded')
                    .reduce((sum, p) => sum + (p.refundAmount || 0), 0)
                    .toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Refunded</p>
              </CardContent>
            </Card>
          </div>
        )}

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <LoadingSpinner text="Loading payments..." />
            ) : filteredPayments && filteredPayments.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-mono text-sm">
                          {payment.transactionId}
                        </TableCell>
                        <TableCell
                          className="font-mono text-sm text-blue-600 cursor-pointer hover:underline"
                          onClick={() => router.push(`/orders/${payment.orderId}`)}
                        >
                          {payment.orderId}
                        </TableCell>
                        <TableCell className="font-medium">
                          ${payment.amount.toLocaleString()}
                          {payment.refundAmount && (
                            <div className="text-xs text-red-600">
                              Refunded: ${payment.refundAmount.toLocaleString()}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getPaymentMethodIcon(payment.method)}
                            <span className="capitalize">{payment.method.replace('_', ' ')}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={payment.status} />
                        </TableCell>
                        <TableCell className="text-sm">
                          {format(new Date(payment.createdAt), 'MMM d, yyyy HH:mm')}
                        </TableCell>
                        <TableCell>
                          {payment.status === 'completed' && (
                            <CustomBtn
                              size="sm"
                              variant="bordered"
                              onClick={() => handleRefundClick(payment.id)}
                            >
                              <DollarSign className="h-3 w-3 mr-1" />
                              Refund
                            </CustomBtn>
                          )}
                          {payment.status === 'refunded' && payment.refundedAt && (
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(payment.refundedAt), 'MMM d, yyyy')}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <EmptyState
                icon={CreditCard}
                title="No payments found"
                description="Payment transactions will appear here"
              />
            )}
          </CardContent>
        </Card>


      </div>

      {/* Refund Confirmation Modal */}
      <ConfirmModal
        open={refundModalOpen}
        onOpenChange={setRefundModalOpen}
        title="Initiate Refund"
        description="Process a refund for this transaction"
        message={`Are you sure you want to refund $${payment?.amount.toLocaleString()} for transaction ${payment?.transactionId}? This action cannot be undone.`}
        onConfirm={confirmRefund}
        isLoading={initiateRefund.isPending}
        variant="warning"
        confirmText="Process Refund"
      />
    </div>
  );
}