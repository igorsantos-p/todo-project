import styles from './Button.module.css';

export function Button({
  children,
  ...rest
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button className={styles.button} {...rest}>
      {children}
    </button>
  );
}
