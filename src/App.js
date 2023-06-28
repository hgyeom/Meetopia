import './App.css';
import Router from './shared/Router';

import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCurrentUser } from './redux/modules/users';

function App() {
  const dispatch = useDispatch();

  console.log('APP!');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(
        addCurrentUser({
          userid: user.uid,
          email: user.email,
          nickname: user.displayName,
          profileImg: user.photoURL
        })
      );
      // console.log('현재 로그인한 유저의 정보3', auth.currentUser);
      // console.log(user.uid);
      // console.log(user.displayName);
    });
  }, []);

  return <Router />;
}

export default App;
