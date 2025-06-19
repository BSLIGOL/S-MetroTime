import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';
import BookMark from './pages/BookMark';
import NotFound from './pages/NotFound';
import StationMap from './pages/StationMap';
import Header from './components/templates/Header';
import Footer from './components/templates/Footer';
import {StationListProvider} from './contexts/StationListProvider';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className='flex-grow'>
      <StationListProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookMark" element={<BookMark />} />
            <Route path="/stationmap" element={<StationMap />} />
            <Route path="/result/:stationName/:lineNumber" element={<Result />} />
            <Route path="/notfound" element={<NotFound/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </StationListProvider>
      </main>
      <Footer />
    </div>
  );
}

export default App;