export const Carousel = () => {
  return (
    <div
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="4000"
      data-bs-pause="false"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/images/laicai/banner/banner_web.jpg" className="d-block w-100" alt="..." />
          <div className="image-overlay"></div>
        </div>
        <div className="carousel-item">
          <img src="/images/laicai/banner/banner_web.jpg" className="d-block w-100" alt="..."/>
          <div className="image-overlay"></div>
        </div>
        <div className="carousel-item">
          <img src="/images/laicai/banner/banner_web.jpg" className="d-block w-100" alt="..."/>
          <div className="image-overlay"></div>
        </div>
      </div>
    </div>
  );
};
