import React from 'react';

export interface IContextProviderProps {
  value: Array<any>;
  id: string;
}

const UiSdkContext = React.createContext<[any, (newModel: any) => void] | null>(null);

export default UiSdkContext;
