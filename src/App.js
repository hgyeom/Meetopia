import './App.css';
import { app } from './firebase';
import Router from './shared/Router';

function App() {
  console.log('app', app);
  return <Router />;
}

export default App;
