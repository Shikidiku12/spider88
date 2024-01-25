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
          <img src="/images/banner-01.jpg" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="/images/banner-02.jpg" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="/images/banner-03.jpg" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="/images/banner-04.jpg" className="d-block w-100" alt="..." />
        </div>
      </div>
    </div>  
  );
};
