import { FC } from "react";

const ShareInternalGroupPage: FC = () => {
  return (
    <div className='container h-full'>
      <iframe src={process.env.NEXT_PUBLIC_SHARE_GROUP_EMBED_URI} title="Internal single sharing frame" loading="eager" width="100px" height="500px" className="!w-full !h-full"></iframe>
    </div>
  );
}

export default ShareInternalGroupPage;
