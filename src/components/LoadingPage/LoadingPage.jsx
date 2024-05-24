const LoadingPage = () => {
  return (
    <div
      style={{
        opacity: 0.5,
      }}
      className="fixed-top vh-100 m-auto d-flex align-items-center align-content-center justify-content-center bg-secondary "
    >
      <div
        style={{ width: "20rem", height: "20rem" }}
        className="spinner-border text-primary"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingPage;
