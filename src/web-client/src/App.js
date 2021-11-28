import './App.css';
import Header from './components/header/Header';
import Item from './components/item/Item';

function App() {
  return (
    <>
      <Header />
      <div className="main-container">
        <h1 className="title-header">Almacén</h1>
        <div className="listing-container">
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
          <buttom className="buttom-load">CARGAR MAS</buttom>
      </div>
    </>
  );
}

export default App;
