import styles from "./Timer.module.css";

type Props = {
  elapsedTime: number;
};

export const Timer = ({ elapsedTime }: Props) => {
  return <div className={styles.timer}>⏱ {elapsedTime}</div>;
};
