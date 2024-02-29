import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.jpg";

const images = [image1, image2, image3];

const ProductCard = ({ title, description, imageSrc }) => (
  <Col>
    <Card>
      <Card.Img variant="top" src={imageSrc} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

const ProductCards = () => {
  const cardData = [
    {
      title: "Utak Dual Screen",
      description:
        "Modern and Powerful without the heavy price tag. Maximize your counter with a 2nd Display that doubles as marketing and e-payment tool.",
      imageSrc: images[0],
    },
    {
      title: "Utak with Bluetooth Printer",
      description:
        "Reliable POS partner for high volume printing. Print out order slips, receipts, and Z-readings with just one click.",
      imageSrc: images[1],
    },
    {
      title: "Explore your new POS!",
      description:
        "Interact with the bubbles to see the high quality features offered to you!",
      imageSrc: images[2],
    },
  ];

  return (
    <Row xs={1} md={3} className="g-4">
      {cardData.map((card, idx) => (
        <ProductCard key={idx} {...card} />
      ))}
    </Row>
  );
};

export default ProductCards;
