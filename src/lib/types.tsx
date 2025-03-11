export type Call = {
    id: string;
    created_at: string;
    direction: 'inbound' | 'outbound';
    from: string;
    to: string;
    via: string;
    duration: number;
    is_archived: boolean;
    call_type: 'missed' | 'answered' | 'voicemail';
  };
  
  export type CallContextType = {
    isLoading: boolean;
    calls: Call[];
    archivedCalls: Call[];
    fetchCalls: () => void;
    archiveCall: (callId: string) => void;
    unarchiveCall: (callId: string) => void;
    archiveAllCalls: () => void;
    unarchiveAllCalls: () => void;
    resetCalls: () => void;
  };
  