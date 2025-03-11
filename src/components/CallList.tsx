import React, { useMemo } from "react";
import { Call } from "../lib/types";
import { useCallContext } from "../context/CallContext";
import { Accordion } from "./ui/accordion";
import CallItem from "./CallItem";

const formatDate = (date: string) => new Date(date).toLocaleDateString();

const groupCallsByDate = (calls: Call[]) => {
  return calls.reduce((acc, call) => {
    const date = formatDate(call.created_at);
    if (!acc[date]) acc[date] = [];
    acc[date].push(call);
    return acc;
  }, {} as Record<string, Call[]>);
};

interface CallListProps {
  filter: "active" | "archived";
}

const CallList: React.FC<CallListProps> = ({ filter }) => {
  const { calls, archivedCalls, archiveCall, unarchiveCall } = useCallContext();

  const filteredCalls = useMemo(
    () => (filter === "archived" ? archivedCalls : calls),
    [calls, archivedCalls, filter]
  );

  // Group the filtered calls by date
  const groupedCalls = useMemo(() => groupCallsByDate(filteredCalls), [filteredCalls]);

  return (
    <div className="activity-feed h-[90%]">
      <div className="call-list">
        {Object.entries(groupedCalls).map(([date, callsForDate]) => (
          <div key={date} className="border rounded-lg p-2 mb-5">
            <h2 className="date-title py-5 flex text-sm justify-center bg-slate-200 items-center h-5 mb-2">
              {date}
            </h2>
            <Accordion type="single" collapsible className="flex flex-col gap-2">
              {callsForDate.map((call: Call) => (
                <CallItem
                  call={call}
                  key={call.id}
                  archiveCall={archiveCall}
                  unarchiveCall={unarchiveCall}
                />
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallList;
