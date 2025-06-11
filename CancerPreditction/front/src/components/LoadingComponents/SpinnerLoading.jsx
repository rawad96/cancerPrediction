import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import "./LoadingStyles.css";

const SpinnerLoading = () => {
  return (
    <>
      <Container className="spinnercontainer">
        <div className="text-center">
          <Spinner animation="grow" role="status"></Spinner>
          <br />
          <span className="text-black">Loading...</span>
        </div>
      </Container>
    </>
  );
};

export default SpinnerLoading;
