import { styled } from 'styled-components';

export const S = {
  ProfileBox: styled.div`
    display: flex;
    gap: 40px;
  `,
  ImgBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: none;
    overflow: hidden;
    width: 140px;
    height: 140px;
    margin: 16px 0;
    border-radius: 100%;

    img {
      width: 100%;
    }
  `,
  RowBox: styled.div`
    width: 100%;
  `,
  Row: styled.div`
    display: flex;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    width: 100%;
    padding: 16px 0;
    border-bottom: 1px solid #dee2e6;
    line-height: 1.8;

    > label {
      width: 20%;
      font-weight: 500;
      color: ${(props) => props.theme.fontGray};
    }
    > div {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      width: 75%;
    }
  `,
  PageBtnBox: styled.div`
    display: flex;
    justify-content: center;
    gap: 16px;
    margin: 40px 0;
  `
};
