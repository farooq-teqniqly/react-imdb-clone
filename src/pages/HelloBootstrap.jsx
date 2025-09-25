import {
  Container,
  Navbar,
  Nav,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Alert,
} from "react-bootstrap";

export const HelloBootstrap = () => {
  return (
    <>
      {/* Bootstrap Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React Bootstrap Demo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <Container>
          <Row>
            <Col>
              <h1 className="display-4">Bootstrap is Working! 🎉</h1>
              <p className="lead">
                This page demonstrates that React Bootstrap has been
                successfully configured in your Vite React project.
              </p>
              <Button variant="light" size="lg">
                Get Started
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="my-5">
        {/* Success Alert */}
        <Alert variant="success" className="mb-4">
          <Alert.Heading>Configuration Complete!</Alert.Heading>
          <p>
            React Bootstrap and Bootstrap CSS have been successfully installed
            and configured. All unnecessary CSS files have been removed.
          </p>
        </Alert>

        {/* Feature Cards */}
        <Row>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>
                  Responsive Grid <Badge bg="primary">New</Badge>
                </Card.Title>
                <Card.Text>
                  Bootstrap's responsive grid system automatically adapts to
                  different screen sizes. This card is part of a 3-column layout
                  on desktop and stacks on mobile.
                </Card.Text>
                <Button variant="primary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>
                  React Components <Badge bg="success">Ready</Badge>
                </Card.Title>
                <Card.Text>
                  All Bootstrap components are available as React components
                  with proper state management and event handling built-in.
                </Card.Text>
                <Button variant="success">Explore</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>
                  No jQuery <Badge bg="info">Clean</Badge>
                </Card.Title>
                <Card.Text>
                  React Bootstrap doesn't require jQuery or Bootstrap's
                  JavaScript, keeping your bundle size smaller and avoiding
                  conflicts.
                </Card.Text>
                <Button variant="info">Details</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Typography and Spacing Demo */}
        <Row className="mt-5">
          <Col>
            <h2>Typography & Spacing</h2>
            <p className="lead">
              Bootstrap's typography and spacing utilities are working
              perfectly.
            </p>
            <p>
              This paragraph demonstrates normal text styling with Bootstrap's
              default typography. The spacing between elements is handled by
              Bootstrap's margin and padding utilities.
            </p>

            <div className="d-flex gap-2 flex-wrap">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="success">Success</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="info">Info</Button>
              <Button variant="light">Light</Button>
              <Button variant="dark">Dark</Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <Container>
          <p className="mb-0">
            React Bootstrap Demo - Configuration Complete ✅
          </p>
        </Container>
      </footer>
    </>
  );
};
