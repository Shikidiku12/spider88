import { LoginForm } from './LoginForm';
import { LoginBanner } from './LoginBanner';
import Modal from 'react-bootstrap/Modal';
import '../../sass/components/login.scss';

export const LoginModal = ({
  setToastMessage,
  setUser,
  user,
  isShow,
  setIsShow,
  errors
}) => {
  return (
    <Modal
      onEscapeKeyDown={() => setIsShow(false)}
      keyboard={true}
      backdrop={true}
      onHide={() => setIsShow(false)}
      show={isShow}
      centered
    >
      <Modal.Body className="login-modal">
        <div className="row">
          <div className="col">
            <LoginForm
              setToastMessage={setToastMessage}
              user={user}
              setUser={setUser}
              errors={errors}
              setIsShow={setIsShow}
            />
          </div>

        </div>
      </Modal.Body>
    </Modal>
  );
};
