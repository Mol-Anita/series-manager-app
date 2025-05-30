import { useState, useEffect } from 'react';
import { disable2FA, get2FAStatus } from '@/lib/services/authService';
import TwoFactorSetup from './TwoFactorSetup';
import { useAuth } from '@/contexts/AuthContext';

export default function TwoFactorManagement() {
  const { isTwoFactorEnabled, update2FAStatus } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDisableForm, setShowDisableForm] = useState(false);
  const [password, setPassword] = useState('');

  const check2FAStatus = async () => {
    try {
      const status = await get2FAStatus();
      update2FAStatus(status);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDisable = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await disable2FA(password);
      update2FAStatus(false);
      setShowDisableForm(false);
      setPassword('');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetupComplete = () => {
    update2FAStatus(true);
    setError(null);
  };

  const handleSetupError = (errorMessage: string) => {
    setError(errorMessage);
  };

  // Check 2FA status on component mount
  useEffect(() => {
    check2FAStatus();
  }, []);

  if (isTwoFactorEnabled === null) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <p className="text-center text-gray-300">Loading...</p>
      </div>
    );
  }

  if (!isTwoFactorEnabled) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Two-Factor Authentication</h2>
        <p className="text-gray-300 mb-6 text-center">
          Two-factor authentication is not enabled for your account
        </p>
        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200">
            {error}
          </div>
        )}
        <TwoFactorSetup
          onSetupComplete={handleSetupComplete}
          onSetupError={handleSetupError}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Two-Factor Authentication</h2>
      <p className="text-gray-300 mb-6 text-center">
        Two-factor authentication is enabled for your account
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200">
          {error}
        </div>
      )}

      {!showDisableForm ? (
        <button
          onClick={() => setShowDisableForm(true)}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Disable 2FA
        </button>
      ) : (
        <form onSubmit={handleDisable} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => {
                setShowDisableForm(false);
                setPassword('');
                setError(null);
              }}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Disabling...' : 'Disable 2FA'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 