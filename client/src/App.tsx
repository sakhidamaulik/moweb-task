import { Provider } from 'react-redux';
import Dashboard from './components/Dashboard';
import LeftNavbar from './components/LeftNavbar';
import Navbar from './components/Navbar';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <div id="layoutSidenav">
          <LeftNavbar />
          <Dashboard />
        </div>
      </div>
    </Provider>
  );
}

export default App;
