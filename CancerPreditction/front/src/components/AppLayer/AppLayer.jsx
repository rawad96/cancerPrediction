const AppLayer = ({ closeLayer }) => {
  return (
    <>
      <div
        onClick={() => closeLayer()}
        style={{
          position: "absolute",
          left: "0",
          right: "0",
          top: "0",
          bottom: "0",
          backgroundColor: "rgba(0,0,0,0.6)",
          cursor: "pointer",
          zIndex: 10,
        }}
      ></div>
    </>
  );
};

export default AppLayer;
