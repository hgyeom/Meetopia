import { styled } from 'styled-components';
import { ButtonXs, ButtonXsGray } from './Common.styled';

export const StF = styled.form`
  display: flex;
  justify-content: center;
  padding: 12px 0;

  > button {
    flex: none;
  }
`;

export const AddBtn = styled(ButtonXs)`
  margin-left: 15px;
`;

export const CommentBox = styled.div`
  border-bottom: 2px solid #dedede;
  padding: 10px;
  margin: 10px;
`;

export const DeletedBtn = styled(ButtonXsGray)`
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
