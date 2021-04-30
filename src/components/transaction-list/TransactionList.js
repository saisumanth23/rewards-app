import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { calculateRewards } from '../../utils/reward-util';

const TransactionList = ({ transactions }) => {
    const [allTransactions, setAllTransactions] = useState([]);
    const [selectedTransactions, setSelectedTransactions] = useState([]);

    useEffect(() => {
        const updatedTransactions = transactions.map(t => ({ ...t, date: new Date(t.date), reward: calculateRewards(t.amount) }));
        setAllTransactions(updatedTransactions.sort((a, b) => b.date - a.date));
        setSelectedTransactions(updatedTransactions);
    }, [transactions]);

    const getLastThreeMonthsTransactions = () => {
        var today = new Date();
        const startDate = today.setMonth(today.getMonth() - 3);
        return allTransactions.filter(t => t.date > startDate);
    }

    const showLastThreeMonthTransactions = () => {
        setSelectedTransactions(getLastThreeMonthsTransactions().sort((a, b) => b.date - a.date));
    }

    const showAllTransactions = () => {
        setSelectedTransactions(allTransactions);
    }

    const showMonthlyTransactions = () => {
        const threeMonthTrans = getLastThreeMonthsTransactions();
        let monthlyTransactions = [];
        for (let i = 0; i < 3; i++) {
            let filteredList = threeMonthTrans.filter(t => t.date.getMonth() === (new Date()).getMonth() - i);
            const currentMonthTransaction = {amount: 0, reward: 0};
            filteredList.forEach(t => {
                currentMonthTransaction.amount += currentMonthTransaction.amount + t.amount;
                currentMonthTransaction.reward += currentMonthTransaction.reward + t.reward;
            });
            monthlyTransactions.push(currentMonthTransaction);
        }
        setSelectedTransactions(monthlyTransactions);
    }

    return (
        <div className="transaction-list">
            <div>
                <button onClick={showAllTransactions}>Show All Transactions</button>
                <button onClick={showLastThreeMonthTransactions}>Show Last 3 Month Transactions</button>
                <button onClick={showMonthlyTransactions}>Show Last Three Months Monthly Transactions</button>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Transaction Amount</th>
                        <th>Reward Points</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        selectedTransactions.map((t, idx) => (
                            <tr key={idx}>
                                <th scope="row">{idx + 1}</th>
                                <th>{t.date?.toDateString()}</th>
                                <td>{t.amount}</td>
                                <td>{t.reward}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

        </div>
    );
};

export default TransactionList;