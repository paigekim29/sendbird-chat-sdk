import { SpinLoading } from 'antd-mobile';

function Loading() {
  return (
    <div className="flex justify-center mt-6">
      <SpinLoading color="primary" />
    </div>
  );
}

export default Loading;
