const CHANGE_CATEGORY = 'CHANGE_CATEGORY';

export const categorys = [
  {
    id: 0,
    category: '모두보기'
  },
  {
    id: 1,
    category: '공부'
  },
  {
    id: 2,
    category: '스포츠'
  },
  {
    id: 3,
    category: '음악'
  },
  {
    id: 4,
    category: '영화'
  },
  {
    id: 5,
    category: '프로그래밍'
  },
  {
    id: 6,
    category: '반려동물'
  },
  {
    id: 7,
    category: '기타'
  }
];

export const changeCategory = (payload) => {
  return {
    type: CHANGE_CATEGORY,
    payload
  };
};

const initialState = '모두보기';

const category = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return action.payload;
    default:
      return state;
  }
};

export default category;
