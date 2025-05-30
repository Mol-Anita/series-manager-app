import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { setup2FA, verify2FA, enable2FA } from '@/lib/services/authService';
import { QRCodeSVG } from 'qrcode.react';

interface TwoFactorSetupProps {
  onSetupComplete?: () => void;
  onSetupError?: (error: string) => void;
}

export default function TwoFactorSetup({ onSetupComplete, onSetupError }: TwoFactorSetupProps) {
  const { isLoggedIn } = useAuth();
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleStartSetup = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await setup2FA();
      console.log('Setup response:', response);
      setQrCodeUrl(response.QrCodeUrl);
      setSecret(response.Secret);
    } catch (err) {
      console.error('Setup error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to setup 2FA';
      setError(errorMessage);
      onSetupError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!verificationCode) {
      const errorMessage = 'Please enter the verification code';
      setError(errorMessage);
      onSetupError?.(errorMessage);
      return;
    }

    if (!secret) {
      const errorMessage = 'Please complete the setup first';
      setError(errorMessage);
      onSetupError?.(errorMessage);
      return;
    }

    // Ensure the code is exactly 6 digits
    const code = verificationCode.trim();
    if (!/^\d{6}$/.test(code)) {
      const errorMessage = 'Please enter a valid 6-digit code';
      setError(errorMessage);
      onSetupError?.(errorMessage);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      console.log('Verifying code:', code);
      await enable2FA(code);
      setIsVerified(true);
      onSetupComplete?.();
    } catch (err) {
      console.error('Verification error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to verify code';
      setError(errorMessage);
      onSetupError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerified) {
    return (
      <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">2FA Setup Complete</h2>
        <p className="text-gray-300 mb-4">
          Two-factor authentication has been successfully enabled for your account.
        </p>
        <p className="text-gray-300">
          You will now be required to enter a verification code when logging in.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Setup Two-Factor Authentication</h2>
      
      {!qrCodeUrl ? (
        <div>
          <p className="text-gray-300 mb-4">
            Enhance your account security by enabling two-factor authentication.
          </p>
          <button
            onClick={handleStartSetup}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Setting up...' : 'Start Setup'}
          </button>
        </div>
      ) : (
        <div>
          <p className="text-gray-300 mb-4">
            Scan this QR code with your authenticator app (like Google Authenticator or Authy):
          </p>
          <div className="flex justify-center mb-4">
            <div className="bg-white p-4 rounded-lg">
              <QRCodeSVG value={qrCodeUrl} size={200} />
            </div>
          </div>
          <p className="text-gray-300 mb-4">
            Or enter this code manually: <span className="font-mono bg-gray-700 px-2 py-1 rounded">{secret}</span>
          </p>
          <div className="mb-4">
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter verification code"
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              maxLength={6}
              pattern="[0-9]*"
              inputMode="numeric"
            />
          </div>
          <button
            onClick={handleVerify}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Verify and Enable 2FA'}
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200">
          {error}
        </div>
      )}
    </div>
  );
} 