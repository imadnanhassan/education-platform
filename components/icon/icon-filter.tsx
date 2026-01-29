import { FC } from 'react';

interface IconFilterProps {
  className?: string;
}

const IconFilter: FC<IconFilterProps> = ({ className }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M4.25 5.61C6.27 8.2 10 13 10 13V19C10 19.55 10.45 20 11 20H13C13.55 20 14 19.55 14 19V13C14 13 17.73 8.2 19.75 5.61C20.25 4.95 19.78 4 18.95 4H5.04C4.21 4 3.74 4.95 4.25 5.61Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconFilter;