// import './App.css';
// import PriceMonitor from './PriceMonitor';
// import Security from './Security';

// function App() {
//   return (
//     <div className="App">
//       <Security />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Security from './Security';
import PriceMonitor from './PriceMonitor';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Security />} />
                <Route path="/price_monitor" element={<PriceMonitor />} />
            </Routes>
        </Router>
    );
};

export default App;
