import './App.css';
import TransactionList from './components/transaction-list/TransactionList';
import { MockTransactions } from './data/mock-transactions';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h2>Reward App</h2>
      </header>
      <div className="content-container">
        <TransactionList transactions={MockTransactions} />
     </div>
    </div>
  );
}

export default App;
