import Modal from 'react-bootstrap/Modal';

export const LoginNotificationModal = ({isShow, setIsShow, setLoginShow}) => {

  const gotoLogin = () => {
    setIsShow(false);
    setLoginShow(true);
  };

  return (
    <Modal
      contentClassName={"notificationModal"}
      onEscapeKeyDown={() => setIsShow(false)}
      keyboard={true}
      backdrop={true}
      onHide={() => setIsShow(false)}
      show={isShow}
      centered
    >
      <Modal.Body>
        <div style={{ padding: "10px 12px" }}>
          <div className={"d-flex flex-row justify-content-end mb-5"} >
            <button className="border-0 bg-transparent" onClick={() => setIsShow(false)}>
              <img src="/images/x.svg" />
            </button>
          </div>
          <div className={"mb-5"}>
          <h3 className={"fw-bold text-center"}>
              You are not logged in
            </h3>
          </div>
          <div style={{ fontSize: "16px" }} className={"text-center mb-5"}>
            To access this feature you need to login first
          </div>
          <div className={"text-center mb-3"}>
            <button
              className={"btn btn-light btn-lg"}
              type="button"
              onClick={gotoLogin}
            >
              Login
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
