import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, storage } from '../firebase';
import { updateProfile } from 'firebase/auth';
import { updateCurrentUser } from '../redux/modules/users';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { S } from './Profile.styled';

const ProfileForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 테스트 코드
  console.log('프로필입력p / 현재 로그인한 유저의 정보 확인 : ', auth.currentUser);
  const test = useSelector((state) => {
    return state.users;
  });
  console.log('프로필입력p / 리덕스 users정보 확인 : ', test);

  // 변수
  const { email, nickname, profileImg } = useSelector((state) => {
    return state.users.currentUser;
  });
  //   const { currentUser } = useSelector((state) => {
  //     return state.users;
  //   });
  const [reNickname, setReNickname] = useState(nickname);
  //   const [, updateState] = useState();
  //   const forceUpdate = useCallback(() => updateState({}), []);

  // 메서드
  const onChange = ({ target }) => {
    setReNickname(target.value);
  };

  const onClickCancelButtonHandler = () => {
    navigate('/mypage');
  };

  // 파일 업로드
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  //   useEffect(() => {
  //     console.log('❤️currentUser =======> ', currentUser);
  //   }, [currentUser]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // 파이어스토어에 이미지 전달
    const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
    await uploadBytes(imageRef, selectedFile);
    const downloadURL = await getDownloadURL(imageRef);

    // 리덕스에 수정할 유저정보 전달
    console.log('디스패치 전 => ');
    dispatch(
      updateCurrentUser({
        nickname: reNickname,
        profileImg: downloadURL
      })
    );
    console.log('디스패치 후 => ');
    // 파이어베이스에 수정할 유저정보 전달
    await updateProfile(auth.currentUser, {
      displayName: reNickname,
      photoURL: downloadURL
    });

    // navigate('/mypage');

    // 임시방편 코드..
    // window.location.reload();
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <S.ProfileBox>
          {/* <div> */}
          <S.ImgBox>
            <img src={profileImg} alt="프로필 사진" />
          </S.ImgBox>
          {/* <input type="file" onChange={handleFileSelect} />
          </div> */}
          <S.RowBox>
            <S.Row>
              <label>이메일</label>
              <div>{email}</div>
            </S.Row>
            <S.Row>
              <label>닉네임</label>
              <div>
                <input type="text" defaultValue={nickname} name="nickname" onChange={onChange} />
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
          <button onClick={onClickCancelButtonHandler}>취소</button>
          <button>저장</button>
        </S.PageBtnBox>
      </form>
    </>
  );
};

export default ProfileForm;
