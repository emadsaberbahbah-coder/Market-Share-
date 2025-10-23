
import React from 'react';

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return (
    <div className="p-4 mb-4 text-sm text-red-200 bg-red-800 rounded-lg" role="alert">
      <span className="font-medium">Error:</span> {message}
    </div>
  );
};

export default ErrorAlert;
