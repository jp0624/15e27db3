import { Call } from "../lib/types";

interface CallDetailProps {
  call: Call;
}

function CallDetail({ call }: CallDetailProps) {
  return (
      <ul className="grid grid-cols-2 w-[50%] gap-2">
        <li>Direction: <span className="font-bold text-sm">{call.direction}</span></li>
        <li>Call Type: <span className="font-bold text-sm">{call.call_type}</span></li>
        <li>
          Call Time: <span className="font-bold text-sm">
          {new Date(call.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}</span>
        </li>
        <li>
            Call Date: <span className="font-bold text-sm">
            {new Date(call.created_at).toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
            })}</span>
        </li>
        <li>Duration: <span className="font-bold text-sm">{call.duration || 0} seconds</span></li>
      </ul>
  );
}

export default CallDetail;
