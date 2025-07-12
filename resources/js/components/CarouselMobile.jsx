export const CarouselMobile = () => {
  return (
    <div
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="4000"
      data-bs-pause="false"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/images/spider/banner/mb1.jpg" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item active">
          <img src="/images/spider/banner/mb2.jpg" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="/images/spider/banner/mb3.jpg" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="/images/spider/banner/mb4.jpg" className="d-block w-100" alt="..." />
        </div>
      </div>
    </div>
  );
}
