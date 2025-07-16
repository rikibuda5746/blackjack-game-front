
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.homeTitle}>Welcome to the Blackjack Game!</h1>
      <p className={styles.homeText}>
        Challenge your skills in the classic Blackjack card game. Compete, improve your strategy, and aim for 21!
      </p>
      <Link to="/login" className={styles.homeLink}>
        Start Playing
      </Link>
    </div>
  );
};

export default Home;
