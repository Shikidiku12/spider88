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
      size={"xl"}
      dialogClassName={"modal-90w"}
      centered
    >
      <Modal.Body>
        <div className="row py-3 login-container">
          <div className="col p-4">
            <LoginForm 
              setToastMessage={setToastMessage}
              user={user} 
              setUser={setUser} 
              errors={errors} 
            />
          </div>
          <div className="d-none d-lg-block col">
            <LoginBanner />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
