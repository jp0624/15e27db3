import { formatPhoneNumber } from "../lib/utils";
import { Call } from "../lib/types";
import CallDetail from "./CallDetail";
import { AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";
import { BsFillTelephoneInboundFill, BsFillTelephoneOutboundFill } from "react-icons/bs";
import { BsArchiveFill } from "react-icons/bs";
import { BsArchive } from "react-icons/bs";

interface CallItemProps {
  call: Call;
  archiveCall: (id: string) => void;
  unarchiveCall: (id: string) => void;
}

const CallItem: React.FC<CallItemProps> = ({ call, archiveCall, unarchiveCall }) => {
  return (
    <AccordionItem key={call.id} value={call.id}>
      <AccordionTrigger className="rounded-lg border py-1 pr-2 pl-3 hover:no-underline flex items-center gap-3">
        {call.direction === "inbound" ? (
          <span className="bg-green-500 rounded-full w-5 h-5 flex justify-center items-center">
            <BsFillTelephoneInboundFill className="text-white text-xs" />
          </span>
        ) : (
          <span className="bg-blue-500 rounded-full w-5 h-5 flex justify-center items-center">
            <BsFillTelephoneOutboundFill className="text-white text-xs" />
          </span>
        )}

        <ul className="text-xs w-[50%] flex-col gap-5 my-2 justify-between">
          {call.direction === "inbound" ? (
            <li>
              <span className="text-fontSize-xxxs">From:</span>{" "}
              <em className="font-bold text-sm">{formatPhoneNumber(call.from)}</em>
            </li>
          ) : (
            <li>
              <span className="text-fontSize-xxxs">To:</span>{" "}
              <em className="font-bold text-sm">{formatPhoneNumber(call.to)}</em>
            </li>
          )}
          <li className="mt-1">
            <span
              className={`text-fontSize-xxxs text-slate-500 rounded px-2 block
                ${call.call_type === "missed" ? "text-red-500 bg-red-100" : ""}
                ${call.call_type === "answered" ? "text-green-500 bg-green-100" : ""}
                ${!call.call_type ? "text-slate-500 bg-slate-100" : ""}
              `}
            >
              {call.call_type || "N/A"}
            </span>
          </li>
        </ul>
      </AccordionTrigger>

      <AccordionContent className="border-t p-4 text-sm">
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <CallDetail call={call} />
          <button
                onClick={() => {
                  if (call.is_archived) {
                    unarchiveCall(call.id);
                  } else {
                    archiveCall(call.id);
                  }
                }}
                className="text-slate-800 bg-slate-300 hover:bg-slate-600 hover:text-slate-100 py-1 px-3 text-sm flex items-center gap-2"
              >
              {call.is_archived ? (
                <>
                  <BsArchive /> <span>Unarchive</span>
                </>
              ) : (
                <>
                  <BsArchiveFill /> <span>Archive</span>
                </>
              )}
            </button>

        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default CallItem;
