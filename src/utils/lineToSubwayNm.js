export const lineToSubwayNm = {
    '1호선': '1001',
    '2호선': '1002',
    '3호선': '1003',
    '4호선': '1004',
    '5호선': '1005',
    '6호선': '1006',
    '7호선': '1007',
    '8호선': '1008',
    '9호선': '1009',
    '수인분당선': '1075',
    '신분당선': '1077',
    '공항철도': '1065',
    '경의중앙선': '1063',
    '경춘선': '1067',
    '우이신설선': '1092',
    '서해선': '1093',
    '경강선': '1081',
    'GTX-A': '1032',
}

export const subwayIdToLineNumber = Object.entries(lineToSubwayNm).reduce((acc, [lineName, id]) => {
    acc[id] = lineName;
    return acc;
  }, {});