import Modal from "react-bootstrap/Modal";
import '../../sass/components/game-dialog.scss';

export const GameDialog = ({ isShow, setIsShow, gameURL}) => {

  return (
    <Modal
      onEscapeKeyDown={() => setIsShow(false)}
      keyboard={false}
      backdrop={false}
      onHide={() => setIsShow(false)}
      fullscreen
      show={isShow}
      centered
    >
      <Modal.Header closeButton className="border-bottom-0">
      </Modal.Header>
      <Modal.Body className="p-0">
        <div className="game-dialog">
          <iframe src={gameURL}
                  frameBorder='0'
                  id="gameWindow"
                  allowFullScreen
                  className="iframe"
          >
          </iframe>
          {/*<div className="game-dialog__action action">*/}
          {/*  <button type="button" className="action__close" onClick={() => setIsShow(false)}>X</button>*/}
          {/*</div>*/}
        </div>
    </Modal.Body>
</Modal>
)
  ;
};
