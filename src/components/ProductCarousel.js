import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.jpg";
import "../App.css";

export default function ProductCarousel() {
  return (
    <div className="container-fluid text-dark min-vw-100 p-3 p-md-5 py-5 py-lg-5">
      <div className="row">
        <div className="col-md-6 my-lg-auto mt-md-5">
          <Carousel data-bs-theme="dark">
            <Carousel.Item>
              <img
                className="d-block  img-fluid "
                src={image1}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block  img-fluid "
                src={image2}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block  img-fluid"
                src={image3}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="col-md-6 pl-md-5 py-lg-5 my-auto">
          <p className="mb-0">Best Quality Products</p>
          <h1 className="mt-2 text-md-left">Your Negosyo Partner!</h1>
          <p>
            Engage with your customers even through a distance with UTAK ONLINE!
            Eliminate the need for complicated coordination across multiple
            channels as your customers can effortlessly add items to their cart
            and check out on your website
          </p>
          <Link to="/" className="btn btn-primary">
            Buy Now!
          </Link>
        </div>
      </div>
    </div>
  );
}
