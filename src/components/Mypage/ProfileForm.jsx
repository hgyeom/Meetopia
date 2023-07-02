import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, storage } from '../../firebase';
import { updateProfile } from 'firebase/auth';
import { updateCurrentUser } from '../../redux/modules/users';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { S } from './Profile.styled';
import { ButtonSm, ButtonSmGray, Input } from '../Common.styled';

const ProfileForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, nickname, profileImg } = useSelector((state) => {
    return state.users.currentUser;
  });
  const [reNickname, setReNickname] = useState(nickname);
  const [previewImg, setPreviewImg] = useState(profileImg);
  useEffect(() => {
    setPreviewImg(profileImg);
  }, [profileImg]);

  const onChange = ({ target }) => {
    setReNickname(target.value);
  };

  const onClickCancelButtonHandler = () => {
    navigate('/mypage');
  };

  // 파일 업로드
  const [selectedFile, setSelectedFile] = useState(null);
  let theFile;
  const handleFileSelect = (event) => {
    theFile = event.target.files[0];

    setSelectedFile(theFile);

    if (theFile) {
      // 프로필이미지 미리보기
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result }
        } = finishedEvent;
        setPreviewImg(result);
      };
      reader.readAsDataURL(theFile);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    let downloadURL;

    if (!selectedFile) {
      // 리덕스에 수정할 유저정보 전달
      dispatch(
        updateCurrentUser({
          nickname: reNickname
        })
      );
      // 파이어베이스에 수정할 유저정보 전달
      await updateProfile(auth.currentUser, {
        displayName: reNickname
      });
    } else {
      // 파이어스토어에 이미지 전달
      const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
      await uploadBytes(imageRef, selectedFile);
      downloadURL = await getDownloadURL(imageRef);

      // 리덕스에 수정할 유저정보 전달
      dispatch(
        updateCurrentUser({
          nickname: reNickname,
          profileImg: downloadURL
        })
      );
      // 파이어베이스에 수정할 유저정보 전달
      await updateProfile(auth.currentUser, {
        displayName: reNickname,
        photoURL: downloadURL
      });
    }

    navigate('/mypage');
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <S.ProfileBox>
          <S.ImgBox>
            <img src={previewImg} alt="프로필 사진" />
          </S.ImgBox>
          <S.RowBox>
            <S.Row>
              <label>이메일</label>
              <div>{email}</div>
            </S.Row>
            <S.Row>
              <label>닉네임</label>
              <div>
                <Input
                  type="text"
                  onChange={onChange}
                  defaultValue={nickname}
                  name="nickname"
                  placeholder="닉네임을 입력해주세요"
                />
              </div>
            </S.Row>
            <S.Row>
              <label>프로필 사진</label>
              <div>
                <input type="file" onChange={handleFileSelect} />
              </div>
            </S.Row>
          </S.RowBox>
        </S.ProfileBox>
        <S.PageBtnBox>
          <ButtonSmGray onClick={onClickCancelButtonHandler}>취소</ButtonSmGray>
          <ButtonSm>저장</ButtonSm>
        </S.PageBtnBox>
      </form>
    </>
  );
};

export default ProfileForm;
