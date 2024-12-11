import AppRoutes from './hocs/routes/routes'; 
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './hocs/layout/Layout';

function App() {
  return (
    <div className="bg-gray-100">
      <Layout>
        <Provider store={store}>
          <Router>
            <AppRoutes />
          </Router>
        </Provider>
      </Layout>
    </div>
    
  );
}

export default App;
