import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';
import Bookmark from './pages/Bookmark';
import NotFound from './pages/NotFound';
import StationMap from './pages/StationMap';
import Header from './components/templates/Header';
import Footer from './components/templates/Footer';
import {StationListProvider} from './contexts/StationListContext';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <StationListProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookmark" element={<Bookmark />} />
            <Route path="/stationmap" element={<StationMap />} />
            <Route path="/result/:stationName/:lineNumber" element={<Result />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </StationListProvider>
      <Footer />
    </div>
  );
}

export default App;