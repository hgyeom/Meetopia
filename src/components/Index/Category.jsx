import React, { useState } from 'react';
import { styled } from 'styled-components';

/* styled components */

// section
const StyledCategorySection = styled.section`
  max-width: 1300px;
  margin: 0 auto;
`;

// category list
const StyledCategoryList = styled.ul`
  display: flex;
`;

// category item
const StyledCategory = styled.li`
  // category 공용 속성
  font-size: 1.4rem;
  font-weight: 550;
  margin: 10px;
  color: grey;
  cursor: pointer;

  // active 클래스만
  &.active {
    color: black;
    border-bottom: 2px solid black;
  }
`;

// hr
const StlyedHr = styled.hr`
  border: 2px solid #d7b0ff;
  border-radius: 6px;
`;

function Category() {
  const [index, setIndex] = useState(0);

  const categorys = [
    {
      id: 0,
      title: '공부'
    },
    {
      id: 1,
      title: '스포츠'
    },
    {
      id: 2,
      title: '음악'
    },
    {
      id: 3,
      title: '영화'
    },
    {
      id: 4,
      title: '프로그래밍'
    },
    {
      id: 5,
      title: '반려동물'
    },
    {
      id: 6,
      title: '기타'
    }
  ];

  return (
    <StyledCategorySection>
      <StyledCategoryList>
        {categorys.map((item) => (
          <StyledCategory
            key={item.id}
            className={index === item.id ? 'active' : null}
            onClick={() => setIndex(item.id)}
          >
            {item.title}
          </StyledCategory>
        ))}
      </StyledCategoryList>
      <StlyedHr />
    </StyledCategorySection>
  );
}

export default Category;
