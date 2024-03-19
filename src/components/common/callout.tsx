import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle, BanIcon, CheckCircle2, InfoIcon } from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'error' | 'success';

interface Props {
  type: CalloutType;
  title: string;
  children: React.ReactElement;
}

const Callout = ({ title, type, children }: Props) => {
  const IconByCalloutType = ({ type }: { type: CalloutType }) => {
    switch (type) {
      case 'info':
        return <InfoIcon color="#aeaeae" className="h-4 w-4" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4" />;
      case 'error':
        return <BanIcon color="#ef3333" className="h-4 w-4" />;
      case 'success':
        return <CheckCircle2 color="#32cd32" className="h-4 w-4" />;

      default:
        break;
    }
  };

  const getVariant = (type: CalloutType) => {
    switch (type) {
      case 'error':
        return 'destructive';
      case 'success':
      case 'info':
      case 'warning':
        return 'default';

      default:
        break;
    }
  };
  return (
    <Alert variant={getVariant(type)}>
      <IconByCalloutType type={type} />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
};

export default Callout;
