import { LoginForm } from './LoginForm';
import { LoginBanner } from './LoginBanner';
import Modal from 'react-bootstrap/Modal';

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
      dialogClassName={"modal-90w modal-md"}
      centered
    >
      <Modal.Body>
        <div className="row login-container">
          <div className="col">
            <LoginForm
              setToastMessage={setToastMessage}
              user={user}
              setUser={setUser}
              errors={errors}
            />
          </div>

        </div>
      </Modal.Body>
    </Modal>
  );
};
