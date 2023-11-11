import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";

const DeletedUser = () => {
  return (
    <Container> 
    <Row style={{height: '100vh',}} className=''>
        <Col xs={3}></Col>
        <Col xs={6} className='d-flex flex-column justify-content-center'>
            <Image className='align-self-center m-5' src='https://i.ibb.co/B6bJ359/1699386580-trimmy-sweeticon-removebg-preview-1.png'/>
            <Card className='align-self-center'>
              <Card.Body>
              Your account has been deleted!
              </Card.Body>
            </Card>

        </Col>
        <Col xs={3}></Col>
    </Row>
    </Container>
)
}

export default DeletedUser