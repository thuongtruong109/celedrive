import { FC, memo } from "react";

const Footer: FC = () => {
  return (
    <footer className="text-center text-gray-400 text-xs mt-2">
      <p>Build by @Thuong Truong, 2024</p>
    </footer>
  );
}

export default memo(Footer)