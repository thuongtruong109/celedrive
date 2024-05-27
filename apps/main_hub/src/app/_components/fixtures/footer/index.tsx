import { FC, memo } from "react";

const Footer: FC = () => {
  return (
    <footer className="text-center p-2 text-gray-400 text-sm">
      <p>Copyright of @Thuong Truong, 2024</p>
    </footer>
  );
}

export default memo(Footer)