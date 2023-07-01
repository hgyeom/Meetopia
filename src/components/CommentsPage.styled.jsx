import { styled } from 'styled-components';

export const StF = styled.form`
  display: flex;
  justify-content: center;
`;

export const AddBtn = styled.button`
  margin-left: 15px;
`;

export const CommentBox = styled.div`
  border-bottom: 2px solid #dedede;
  padding: 10px;
  margin: 10px;
`;

export const DeletedBtn = styled.button`
  /* background-color: white;
  border: none; */
  /* 지영님 이건 어떤가요 */
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

export const MainLabel = styled.label`
  margin-left: 17px;
  font-size: 22px;
  font-weight: 600;
`;

export const Label = styled.span`
  font-weight: 600;
`;
