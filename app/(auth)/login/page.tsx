'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Car, AlertCircle } from 'lucide-react';
import { CustomBtn, Logo } from '@/components/shared';
import { FormField, PasswordField } from '@/components/Form';
import { EmailSchema, PasswordSchema, useField } from '@/lib';

const LoginPage = () => {
  const { value: email, error: emailError, handleChange: handleEmailChange } = useField("", EmailSchema);

  const {
    value: password,
    error: passwordError,
    handleChange: handlePasswordChange,
  } = useField("", PasswordSchema);


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { handleLogin } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await handleLogin(email, password);

    if (!success) {
      setError('Invalid email or password. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <Logo />

        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <AlertDescription className="text-sm">
              <strong>Demo Credentials:</strong><br />
              Email: admin@carplatform.com<br />
              Password: admin123
            </AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={onSubmit} className="w-full">
            <div className="grid w-full items-start gap-4 py-4">
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

              <div>

                <PasswordField
                  PasswordText="Password"
                  placeholderText="Enter your password"
                  passwordError={passwordError}
                  handlePasswordChange={handlePasswordChange}
                />

              </div>
            </div>
            <div className="text-center">
              <CustomBtn
                type="submit"
                isLoading={isLoading}
                className="bg-emerald-600 text-white rounded-lg cursor-pointer px-4 font-semibold text-lg"
              >
                Login
              </CustomBtn>

            </div>

          </form>



          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Forgot password? Contact system administrator</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage