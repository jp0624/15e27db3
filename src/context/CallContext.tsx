import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Call, CallContextType } from '../lib/types';

const BASE_URL = 'https://aircall-api.onrender.com/';

const CallContext = createContext<CallContextType | undefined>(undefined);

type CallProviderProps = {
  children: ReactNode;
};

export const CallProvider: React.FC<CallProviderProps> = ({ children }) => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [archivedCalls, setArchivedCalls] = useState<Call[]>([]);

  const fetchCalls = async () => {
    try {
      const response = await fetch(`${BASE_URL}activities`);
      if (!response.ok) throw new Error('Failed to fetch calls');
      const data = await response.json();
      setCalls(data.filter((call: Call) => !call.is_archived));
      setArchivedCalls(data.filter((call: Call) => call.is_archived));
    } catch (error) {
      console.error('Error fetching calls:', error);
    }
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  const archiveCall = async (callId: string) => {
    try {
      const response = await fetch(`${BASE_URL}activities/${callId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_archived: true }),
      });

      if (!response.ok) throw new Error('Failed to archive call');
      fetchCalls();
    } catch (error) {
      console.error('Error archiving call:', error);
    }
  };

  const unarchiveCall = async (callId: string) => {
    try {
      const response = await fetch(`${BASE_URL}activities/${callId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_archived: false }),
      });

      if (!response.ok) throw new Error('Failed to unarchive call');
      fetchCalls();
    } catch (error) {
      console.error('Error unarchiving call:', error);
    }
  };

  const archiveAllCalls = async () => {
    try {
      for (let call of calls) {
        await archiveCall(call.id);
      }
    } catch (error) {
      console.error('Error archiving all calls:', error);
    }
  };

  const unarchiveAllCalls = async () => {
    try {
      for (let call of archivedCalls) {
        await unarchiveCall(call.id);
      }
    } catch (error) {
      console.error('Error unarchiving all calls:', error);
    }
  };

  const resetCalls = async () => {
    try {
      const response = await fetch(`${BASE_URL}reset`, {
        method: 'PATCH',
      });

      if (!response.ok) throw new Error('Failed to reset calls');
      fetchCalls();
    } catch (error) {
      console.error('Error resetting calls:', error);
    }
  };

  return (
    <CallContext.Provider
      value={{
        calls,
        archivedCalls,
        fetchCalls,
        archiveCall,
        unarchiveCall,
        archiveAllCalls,
        unarchiveAllCalls,
        resetCalls,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export const useCallContext = (): CallContextType => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error('useCallContext must be used within a CallProvider');
  }
  return context;
};
