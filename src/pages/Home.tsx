import CallList from "../components/CallList";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ScrollArea } from "../components/ui/scroll-area"
import { useCallContext } from "../context/CallContext";
import { BsArchiveFill } from "react-icons/bs";
import { BsArchive } from "react-icons/bs";


interface HomeProps {
  filter: "active" | "archived";
  setFilter: (filter: "active" | "archived") => void;
}

const Home: React.FC<HomeProps> = ({ filter, setFilter }) => {
  const { archiveAllCalls, unarchiveAllCalls } = useCallContext();
  return (
  <div>
    <Tabs className="tabs-container" value={filter} onValueChange={(value) => setFilter(value as "active" | "archived")}>
      <TabsList className="tabs-list">
        <TabsTrigger className="tabs-list-item" value="active">Active</TabsTrigger>
        <TabsTrigger className="tabs-list-item" value="archived">Archived</TabsTrigger>
      </TabsList>
    </Tabs>
    <ScrollArea className="h-[575px] rounded-md border">
      {filter === "archived" ? (
          <CallList filter={"archived"} />
        ) : (
          <CallList filter={"active"} />
        )
      }
    </ScrollArea>
    <nav className="flex justify-start gap-2 mt-2">
      {filter === "archived" ? (
        <button className="flex items-center text-slate-800 bg-slate-300 hover:bg-slate-600 hover:text-slate-100 py-2 px-3 text-sm"
          onClick={() => unarchiveAllCalls()}>
            <><BsArchive /> <span className="ml-2">Un-Archive all calls</span></>
        </button>
      ) : (
        <button className="flex items-center text-slate-800 bg-slate-300 hover:bg-slate-600 hover:text-slate-100 py-2 px-3 text-sm"
          onClick={() => archiveAllCalls()}>
            <><BsArchiveFill /> <span className="ml-2">Archive all calls</span></>
        </button>
      )}
    </nav>
  </div>)
};

export default Home;