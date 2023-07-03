const CHANGE_LOCATION = 'CHANGE_LOCATION';

export const locations = [
  '모두보기',
  '서울',
  '경기',
  '인천',
  '대전',
  '대구',
  '부산',
  '울산',
  '광주',
  '강원',
  '세종',
  '충북',
  '충남',
  '경북',
  '경남',
  '전북',
  '전남',
  '제주'
];

export const changeLocation = (payload) => {
  return {
    type: CHANGE_LOCATION,
    payload
  };
};
const initialState = '모두보기';

const location = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOCATION:
      return action.payload;
    default:
      return state;
  }
};

export default location;
