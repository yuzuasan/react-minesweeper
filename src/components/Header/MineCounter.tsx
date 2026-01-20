import styles from "./MineCounter.module.css";

type Props = {
  remainingMines: number;
};

export const MineCounter = ({ remainingMines }: Props) => {
  return <div className={styles.counter}>💣 {remainingMines}</div>;
};
