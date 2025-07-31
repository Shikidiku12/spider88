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
      className="game-window"
    >
      <Modal.Body className="p-0 overflow-hidden">
        <div className="game-window__wrapper">
          <iframe src={gameURL}
                  id="gameWindow"
                  allowFullScreen
                  className="iframe"
          >
          </iframe>
          <div className="game-window__action action">
            <button type="button" className="action__close" onClick={() => setIsShow(false)}>
              <img src="/images/close.png"/>
            </button>
          </div>
        </div>
        <div className="game-window__bg-decoration game-window__bg-decoration-bottom-left"></div>
        <div className="game-window__bg-decoration game-window__bg-decoration-top-right"></div>
      </Modal.Body>
    </Modal>
  )
    ;
};
