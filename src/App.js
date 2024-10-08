// import logo from './logo.svg';
import './App.css';
import StyleGlobal from './components/StyleGlobal';
import AppRouter from './routes/Router';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  return (
    <StyleGlobal>
      <div className="App">
        <AppRouter />
      </div>
    </StyleGlobal>
  );
}

export default App;
