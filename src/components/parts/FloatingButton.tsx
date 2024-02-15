import { Button } from 'antd-mobile';
import { AddOutline } from 'antd-mobile-icons';

interface FloatingButtonProps {
  handleRouter: () => void;
}

function FloatingButton({ handleRouter }: FloatingButtonProps) {
  return (
    <div className="fixed bottom-8 z-100 right-8 floatingButton">
      <Button color="primary" fill="solid" shape="rounded" size="large" onClick={() => handleRouter()}>
        <AddOutline />
      </Button>
    </div>
  );
}

export default FloatingButton;
