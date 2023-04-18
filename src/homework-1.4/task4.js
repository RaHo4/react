import React from 'react'
import transactions from "./transactions.json"
import styles from "./styles.module.css"

const TransactionHistory = ({transactions}) => {
    return (
    <table className={styles.TransactionHistory}>
        <thead>
            <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Currency</th>
            </tr>
        </thead>

        <tbody>
        {transactions.map(element => (
            <tr key={element.id}>
                <td>{element.type}</td>
                <td>{element.amount}</td>
                <td>{element.currency}</td>
            </tr> 
        ))}
        </tbody>
    </table>
    );
}

export default function task4 () {
    return (
        <TransactionHistory transactions={transactions}/>
    )
}