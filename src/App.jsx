import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';
import Bookmark from './pages/Bookmark';
import TestPage from './pages/TestPage';
import NotFound from './pages/NotFound';
import StationMap from './pages/StationMap';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import {SubwayArrivalProvider} from './contexts/SubwayArrivalContext';
import {StationListProvider} from './contexts/StationListContext';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <StationListProvider>
        <SubwayArrivalProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookmark" element={<Bookmark />} />
            <Route path="/stationmap" element={<StationMap />} />
            <Route path="/result" element={<Result />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SubwayArrivalProvider>
      </StationListProvider>
      <Footer />
    </div>
  );
}

export default App;