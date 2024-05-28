import { FC } from "react";

const ShareInternalMultiPage: FC = () => {
  return (
    <div className='container h-full'>
      <iframe src="https://celedrive-internal-multi.vercel.app" title="Internal single sharing frame" loading="eager" width="100px" height="500px" className="!w-full !h-full"></iframe>
    </div>
  );
}

export default ShareInternalMultiPage;
