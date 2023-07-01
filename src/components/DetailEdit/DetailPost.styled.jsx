import { styled } from 'styled-components';

export const MainTitle = styled.h2`
  font-size: larger;
  font-weight: 600;
  margin: 10px;
`;

export const ContentBox = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;
  border-bottom: 4px solid #ffcd4a;
  margin: 10px;
  padding: 10px;

  > label {
    flex: none;
    width: 170px;
  }
`;

export const PostLayout = styled.div`
  margin-left: 385px;
  margin-right: 385px;
`;

export const ContentWriteBox = styled.div`
  border-bottom: 4px solid #ffcd4a;
  margin: 10px;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

export const ContentWriteLabel = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  padding-top: 12px;
`;

export const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

export const ContentBox2 = styled(ContentBox)`
  /* border-bottom: 4px solid #ffcd4a;
  margin: 10px;
  margin-top: 36px;
  padding: 10px; */
`;
export const WriterLabel = styled.span`
  display: block;
  width: 100%;
`;
