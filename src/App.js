import logo from "./logo.svg";
import styles from "./App.module.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const MainMenu = () => {
  return (
    <div className={styles.MainMenu}>
      <Link className={styles.Link} to="/homework-1.1">
        Homework 1.1
        <br />
      </Link>
      <Link className={styles.Link} to="/homework-1.2">
        Homework 1.2
        <br />
      </Link>
      <Link className={styles.Link} to="/homework-1.3">
        Homework 1.3
        <br />
      </Link>
      <Link className={styles.Link} to="/homework-1.4">
        Homework 1.4
        <br />
      </Link>
      <Link className={styles.Link} to="/homework-2.1">
        Homework 2.1
        <br />
      </Link>
      <Link className={styles.Link} to="/homework-2.2">
        Homework 2.2 + 3.1 (added localStorage)
        <br />
      </Link>
      <Link className={styles.Link} to="/homework-3.2">
        Homework 3.2
        <br />
      </Link>
      <Link className={styles.Link} to="/homework-4">
        Homework 4<br />
      </Link>
      <Link className={styles.Link} to="/homework-6">
        Homework 6<br />
      </Link>
      <Link className={styles.Link} to="/homework-7">
        Homework 7<br />
      </Link>
      <Link className={styles.Link} to="/homework-8">
        Homework 8<br />
      </Link>
      <Link className={styles.Link} to="/lab-4">
        Lab 4
      </Link>
      <Link className={styles.Link} to="/lab-5">
        Lab 5
      </Link>
    </div>
  );
};

export default MainMenu;
