import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import { changeCategory, categorys } from '../../redux/modules/category';

function Category() {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);

  const setCategory = (id, category) => {
    setIndex(id);
    dispatch(changeCategory(category));
  };

  useEffect(() => {
    dispatch(changeCategory('모두보기'));
  }, []);

  return (
    <StyledCategorySection>
      <StyledCategoryList>
        {categorys.map((item) => (
          <StyledCategory
            key={item.id}
            className={index === item.id ? 'active' : null}
            onClick={() => setCategory(item.id, item.category)}
          >
            {item.category}
          </StyledCategory>
        ))}
      </StyledCategoryList>
      <StlyedHr />
    </StyledCategorySection>
  );
}

export default Category;

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
