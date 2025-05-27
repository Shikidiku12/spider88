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
          <img src="/images/banner_2_mobile.jpg" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="/images/banner-mobile-02.png" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="/images/banner-mobile-03.png" className="d-block w-100" alt="..." />
        </div>
      </div>
    </div>
  );
}
