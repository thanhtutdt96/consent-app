import { FC, ReactNode } from 'react';
import './styles.scss';

interface Props {
  children?: ReactNode;
  icon?: ReactNode;
  iconUrl?: string;
  rounded?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  [x: string]: unknown;
}

const Button: FC<Props> = ({
  children,
  className,
  size = 'md',
  icon,
  iconUrl,
  rounded,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`flex items-center justify-center ${className} ${
        rounded ? 'button--rounded' : ''
      } ${size ? `button--${size}` : ''}`}
    >
      {children}
      {icon}
      {iconUrl && <img src={iconUrl} alt={iconUrl} className={`${children ? 'ml-sm' : ''}`} />}
    </button>
  );
};

export default Button;
