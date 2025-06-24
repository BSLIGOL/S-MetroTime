import React from 'react';
import Search from '../components/ui/Search';
import Card from '../components/ui/Card';
import BookMark from '../assets/BookMark.png';
import MetroLogo from '../assets/MetroLogo.png';
import usePageTitle from '../hooks/usePageTitle';

function Home() {
    usePageTitle('S-MetroTime');
    const cardData = [
      {
        id:1,
        iconSrc: BookMark,
        title: '즐겨찾기',
        path: '/bookmark'
      },
      {
        id:2,
        iconSrc: MetroLogo,
        title:'지하철 노선도',
        path: '/stationmap'
      }
    ];

  return (
    <div className="flex flex-col items-center flex-grow py-8">
      <Search />
      <div className="flex flex-row gap-24 justify-center mt-auto mb-auto">
        {cardData.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}

export default Home;