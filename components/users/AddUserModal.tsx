'use client';

import { useState } from 'react';
import { Modal } from '@/components/shared/Modal';
import { toast } from 'sonner';
import { UserRole } from '@/types';
import { EmailSchema, FullNameSchema, PhoneSchema, useField } from '@/lib';
import { CountrySelect, FormField, SelectField } from '../Form';

const roleOptions = [
  { value: "ADMIN", label: "Admin" },
  { value: "OPERATION", label: "operation" },
]

interface AddUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddUserModal({ open, onOpenChange }: AddUserModalProps) {
  const { value: fullName, error: fullNameError, handleChange: handleFullNameChange } = useField("", FullNameSchema);
  const { value: phone, error: phoneError, handleChange: handleTelePhoneChange } = useField("", PhoneSchema);
  const { value: email, error: emailError, handleChange: handleEmailChange } = useField("", EmailSchema);

  const [selectedRole, setSelectedRole] = useState<UserRole | "">("");
  const [country, setCountry] = useState<string>("");
  const [roleError, setRoleError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!fullName || !email || !phone || !selectedRole) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('User added successfully');
      onOpenChange(false);
    } catch {
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
          reqValue="*"
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
          required
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
          reqValue="*"
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

        <div className='w-full'>
          <SelectField
            label="Role"
            htmlFor="role"
            id="role"
            placeholder="Select Role"
            isInvalid={!!roleError}
            errorMessage={roleError}
            value={selectedRole}
            onChange={(value: string) => {
              setSelectedRole(value as UserRole);
              setRoleError("");
            }}
            options={roleOptions}
            required
            reqValue="*"
          />
        </div>

      </div>
    </Modal>
  );
}
