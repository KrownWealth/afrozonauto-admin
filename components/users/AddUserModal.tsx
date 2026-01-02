'use client';

import { useState } from 'react';
import { Modal } from '@/components/shared/Modal';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@nextui-org/react';
import { toast } from 'sonner';
import { UserRole } from '@/types';
import { EmailSchema, FullNameSchema, PhoneSchema, useField } from '@/lib';
import { CountrySelect, CustomSelect, FormField } from '../Form';

const roleOptions = [
  { value: "ADMIN", label: "Admin" },
  { value: "OPERATION", label: "operation" },
]

interface AddUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddUserModal({ open, onOpenChange }: AddUserModalProps) {
  const { value: fullName, error: fullNameError, handleChange: handleFullNameChange, reset: resetFullName } = useField("", FullNameSchema);
  const { value: phone, error: phoneError, handleChange: handleTelePhoneChange, reset: resetPhone } = useField("", PhoneSchema);
  const { value: email, error: emailError, handleChange: handleEmailChange, reset: resetEmail } = useField("", EmailSchema);

  const [selectedRole, setSelectedRole] = useState<UserRole | "">("");
  const [country, setCountry] = useState<string>("");
  const [active, setAvailable] = useState(true);
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [roleError, setRoleError] = useState("");


  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // Validation
    if (!fullName || !email || !phone || !selectedRole) {
      toast.error('Please fill in all required fields');
      return;
    }
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('User added successfully');
      onOpenChange(false);

    } catch (error) {
      toast.error('Failed to add user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Add New User"
      description="Create a new admin user account"
      size="lg"
      showFooter
      onConfirm={handleSubmit}
      confirmText="Add User"
      isLoading={isLoading}
    >
      <div className="space-y-4">
        <FormField
          label="Full Name"
          id="fullName"
          type="text"
          htmlFor="fullName"
          placeholder="Firstname"
          value={fullName}
          onChange={handleFullNameChange}
          isInvalid={!!fullNameError}
          errorMessage={fullNameError}
          disabled={isLoading}
          required
        />

        <FormField
          label="Email address"
          id="email"
          type="email"
          htmlFor="email"
          placeholder="Enter your email address"
          value={email}
          onChange={handleEmailChange}
          isInvalid={!!emailError}
          errorMessage={emailError}
          reqValue="*"
          className="text-sm"
        />


        <FormField
          label="Phone Number"
          id="phone"
          type="tel"
          htmlFor="phone"
          placeholder="Phone Number"
          value={phone}
          onChange={handleTelePhoneChange}
          isInvalid={!!phoneError}
          errorMessage={phoneError}
          disabled={isLoading}
          required
        />

        <CountrySelect
          label="Country"
          value={country}
          onChange={(c) => setCountry(c)}
          placeholder="Select a country"
          required
          isInvalid={!country && isLoading === false}
          errorMessage={!country ? "Country is required" : undefined}
        />

        <CustomSelect
          label="Role"
          placeholder="Select role"
          value={selectedRole}
          options={roleOptions}
          onChange={(v) => {
            setSelectedRole(v as UserRole);
            setRoleError('');
          }}
        />


        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="space-y-0.5">
            <label>Account Status</label>
            <p className="text-sm text-muted-foreground">
              Activate or deactivate this user account
            </p>
          </div>
          <Switch
            isSelected={active}
            onValueChange={setAvailable}
          />

        </div>

        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <strong>Note:</strong> A temporary password will be sent to the user's email address.
            They will be required to change it on first login.
          </p>
        </div>
      </div>
    </Modal>
  );
}
