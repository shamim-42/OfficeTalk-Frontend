import { Button, Card, Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const StyleGuideUi = () => {
  return (
    <section aria-label="Style Guide for available classes">
      <>
        <Row>
          <Col className="text-center">
            <h1 className="secondary-font font-bold mt-3"> Style Guide for available classes</h1>
            <p>if we need theses styles we can use following classes, no need to write any extra css code,
              our goal is to write less css code as possible, Thank you!</p>
          </Col>
        </Row>
        <Row className>
          <Col lg={8} className="m-auto">
            <Card className="p-3 my-3 shadow-lg border-0">
              <h1 className="primary-color mb-2">Heading H1 with - ".primary-color"</h1>
              <h1 className="primary-color font-bold mb-2">Heading H1 with - ".font-bold"</h1>
              <h2 className="primary-color mb-2">Heading H2 with - ".primary-color"</h2>
              <h2 className="title-lg primary-color mb-2">Heading H2 with - ".title-lg"</h2>
              <h2 className="section-title primary-color mb-2">Heading H2 with - ".section-title"</h2>
              <h2 className="secondary-font primary-color mb-2">Heading H2 with - ".secondary-font"</h2>
              <h2 className="font-normal primary-color mb-2">Heading H2 with - ".font-normal"</h2>
              <h3 className="primary-color mb-2">Heading H3</h3>
              <h4 className="primary-color mb-2">Heading H4</h4>
              <p className="body-text-1 mb-2">Body text with - ".body-text-1", lorem ipsum dolor sit amet lorem ipsum dolor</p>
              <p className="body-text-1 text-gray-alpha-39 mb-2">Body text with - ".body-text-1 .text-gray-alpha-39", lorem ipsum dolor sit amet lorem ipsum dolor</p>
              <p className="body-text-2 mb-2">Body text with - ".body-text-2", lorem ipsum dolor sit amet lorem ipsum dolor</p>
              <p className="body-text-2 mb-2">Body text with - ".body-text-2", lorem ipsum dolor sit amet lorem ipsum dolor</p>
              <p>body text without any className </p>
              <p className="caption mb-2">p with ".caption" </p>
              <p className="caption as-option mb-2">p with ".caption .as-option" </p>
              <lable className="form-label mb-2">label with ".form-label" </lable>
              <div className="d-flex justify-content-center aling-items-center flex-grow flex-wrap gap-3 mt-5">
                <Button className="btn-theme-primary " role="Button" aria-label='Tag'>Tag</Button>
                <Button className="btn-theme-primary medium-size filled-btn" role="Button" aria-label='Tag'>Tag</Button>
                <Button className="btn-theme-primary medium-size filled-btn" role="Button" aria-label='Tag'>Tag</Button>
                <Button className="btn-theme-primary medium-size filled-btn" role="Button" aria-label='Tag'>Tag</Button>
                <Button className="btn-theme-primary medium-size filled-btn" role="Button" aria-label='Tag'>Tag</Button>

                <Link to="/">
                  <Button className="btn-theme-primary medium-size filled-btn" ariaLabel='Tag'>
                    Tag
                  </Button>
                </Link>
                <Link to="/">
                  <Button className="btn-theme-primary medium-size outlined-btn" ariaLabel='Tag'>
                    Tag
                  </Button>
                </Link>
                <Link to="/">
                  <Button className="btn-theme-primary medium-size outlined-btn" ariaLabel='Tag'>
                    Tag
                  </Button>
                </Link>
                <Link to="/">
                  <Button className="btn-theme-primary medium-size outlined-btn" ariaLabel='Tag'>
                    Tag
                  </Button>
                </Link>
                <Link to="/">
                  <Button className="btn-theme-primary medium-size outlined-btn" ariaLabel='Tag'>
                    Tag
                  </Button>
                </Link>
                <Link to="/">
                  <Button className="btn-theme-primary medium-size outlined-btn" ariaLabel='Tag'>
                    Tag
                  </Button>
                </Link>
                <Button className="btn-theme-black-normal " role="Button" aria-label='Tag'>Tag</Button>
                <Button className="btn-theme-black-normal outlined-btn" role="Button" aria-label='Tag'>Tag</Button>
                <Button className="btn-theme-black-normal outlined-btn" role="Button" aria-label='Tag'>Tag</Button>
                <Button className="btn-theme-black-normal outlined-btn" role="Button" aria-label='Tag'>Tag</Button>
                <Button className="btn-theme-black-normal outlined-btn" role="Button" aria-label='Tag'>Tag</Button>
              </div>
              <Row className="mt-5 gap-2">
                <Col lg={12}><Button className="btn-theme-primary-fluid medium-size outlined-btn" role="Button" aria-label='Tag'>Tag</Button></Col>
                <Col lg={12}><Button className="btn-theme-primary-fluid filled-btn" role="Button" aria-label='Tag'>Tag</Button></Col>
                <Col lg={12}><Button className="btn-theme-primary-fluid outlined-btn" role="Button" aria-label='Tag'>Tag</Button></Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </>
    </section>
  );
};

export default StyleGuideUi;