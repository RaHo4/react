import React from 'react';
import ReactDOM from 'react-dom/client';
import data from './data.json';
import styles from './styles2.module.css';

const Statistics = ({title, data}) => {
  return (
    <section className={styles.statistics}>

    {title != null && (<h2 className={styles.title}>{title}</h2>)}
  
    <ul className={styles.stat_list}>
    
    {data.map(element => (
      <li key={element.id} className={styles.item}>
        <span className={styles.label}>
          {element.label}
        </span>
        <span className={styles.percentage}>
          {element.percentage}%
        </span>
      </li>
    ))}
    </ul>
  </section>
)};

export default function task2() {
  return (
    <>
    <Statistics data={data}/>
    <Statistics title = "Upload Stats" data={data} />
  </>
  )
};