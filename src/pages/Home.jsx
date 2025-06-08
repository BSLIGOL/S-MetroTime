import React, { useState } from 'react';
import Search from '../components/ui/Search';
import Card from '../components/ui/Card';
import BookMark from '../assets/BookMark.png';
import MetroLogo from '../assets/MetroLogo.png';


function Home() {
    const [cardData] = useState([
      {
        id:1,
        iconSrc: BookMark,
        title: '즐겨찾기',
      },
      {
        id:2,
        iconSrc: MetroLogo,
        title:'지하철 노선도'
      }
    ]);

  return (
    <div className={`flex flex-col items-center flex-grow py-8`}>
      <Search className="mt-28 mb-8" />
      <div className="flex flex-row gap-24 justify-center mt-20 mb-auto">
        {cardData.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}

export default Home;