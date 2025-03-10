import Home from './pages/Home';
import Header from './components/layout/Header';
import { useState } from 'react';

const App = () => {
  const [filter, setFilter] = useState<"active" | "archived">("active");
  return (
    <div className='container w-full h-full md:max-h-[800px] md:max-w-[800px]'>
      <Header />
      <div className="container-main">
        <Home filter={filter} setFilter={setFilter} />
      </div>
    </div>
  );
};

export default App;
