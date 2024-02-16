import Loading from '@/components/parts/Loading';

interface CustomSuspenseProps {
  isLoading: boolean;
  hasData: boolean;
  children?: React.ReactNode;
  emptyContext?: string;
}

function CustomSuspense({ isLoading, hasData, children, emptyContext }: CustomSuspenseProps) {
  const getUI = () => {
    if (isLoading) {
      return <Loading />;
    }
    if (hasData) {
      return <>{children}</>;
    }
    return (
      <div className="flex justify-center mt-6 text-2xl font-bold">
        <h1>{emptyContext}</h1>
      </div>
    );
  };

  return <>{getUI()}</>;
}

export default CustomSuspense;
