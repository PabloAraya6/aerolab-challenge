import './App.css';
import ProductsContextProvider from './contexts/ProductsContext';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <ProductsContextProvider>
      <ProductsPage />
    </ProductsContextProvider>
  );
}

export default App;
