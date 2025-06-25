import { useState, useEffect } from 'react';

const useBookmarks = () => {
  // localStorage에서 초기 북마크 목록을 불러오거나, 없으면 빈 배열을 사용합니다.
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const stored = localStorage.getItem('bookmarks');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to parse bookmarks from localStorage:", error);
      return [];
    }
  });

  // bookmarks 상태가 변경될 때마다 localStorage에 저장합니다.
  useEffect(() => {
    try {
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } catch (error) {
      console.error("Failed to save bookmarks to localStorage:", error);
    }
  }, [bookmarks]);

  // 북마크를 추가하는 함수
  const addBookmark = (stationName, lineNumber) => {
    setBookmarks(prevBookmarks => {
      // 이미 존재하는 북마크인지 확인 (역 이름과 호선 모두 일치해야 함)
      const exists = prevBookmarks.some(
        item => item.stationName === stationName && item.lineNumber === lineNumber
      );
      if (exists) {
        return prevBookmarks; // 이미 존재하면 변경하지 않고 기존 배열 반환
      }
      // 새로운 북마크를 추가하여 새 배열 반환
      return [...prevBookmarks, { stationName, lineNumber }];
    });
  };

  // 북마크를 삭제하는 함수
  const removeBookmark = (stationName, lineNumber) => {
    setBookmarks(prevBookmarks => {
      // 삭제할 북마크를 제외하고 새로운 배열 반환
      return prevBookmarks.filter(
        item => !(item.stationName === stationName && item.lineNumber === lineNumber)
      );
    });
  };

  // 특정 역이 북마크되었는지 확인하는 함수
  const isBookmarked = (stationName, lineNumber) => {
    return bookmarks.some(
      item => item.stationName === stationName && item.lineNumber === lineNumber
    );
  };

  // 훅에서 제공할 값들을 반환합니다.
  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    setBookmarks // 북마크 목록을 직접 설정해야 할 경우를 대비하여 추가 (선택 사항)
  };
};

export default useBookmarks;