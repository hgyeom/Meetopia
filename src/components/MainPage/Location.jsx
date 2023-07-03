import React, { useState } from 'react';
import { styled } from 'styled-components';
import { locations } from '../../redux/modules/location';
import { useDispatch, useSelector } from 'react-redux';
import { changeLocation } from '../../redux/modules/location';

function Location() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const location = useSelector((state) => state.location);

  const onSelectedOptionHandler = (item) => {
    setIsOpen(!isOpen);
    dispatch(changeLocation(item));
  };

  return (
    <StyledSelectSection>
      <StyledSelectHeader
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div>{location}</div>
      </StyledSelectHeader>
      {isOpen && (
        <StyledSelectItemList>
          {locations.map((item) => (
            <StyledSelectItem key={item} onClick={() => onSelectedOptionHandler(item)}>
              {item}
            </StyledSelectItem>
          ))}
        </StyledSelectItemList>
      )}
    </StyledSelectSection>
  );
}

export default Location;

/* styled components */

const StyledSelectSection = styled.section`
  border: 1px solid #ccc;
  width: 100px;
  height: 25px;
  border-radius: 5px;
  padding: 5px;
`;

const StyledSelectHeader = styled.div`
  padding: 3px;
  cursor: pointer;
`;
const StyledSelectItemList = styled.ul`
  border-top: 1px solid #ccc;
  position: absolute;
  width: 100px;
  border: 1px solid #ccc;
  background-color: #ffffff;
  z-index: 99;
`;
const StyledSelectItem = styled.li`
  margin-top: 3px;
  padding: 3px;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;
