import { personalInfoKeysOrder } from "../../constants/States";

const PersonalInfo = ({ userData }) => {
  const formatHeader = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (char) => char.toUpperCase());
  };

  const formatDateForPlaceholder = (val) => {
    const d = new Date(val);
    if (isNaN(d)) return "";
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };
  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{ display: "flex", gap: "2%" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "17px" }}
          >
            {personalInfoKeysOrder?.map((field, index) => {
              return <p key={index}>{formatHeader(field)}:</p>;
            })}
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "17px" }}
          >
            {personalInfoKeysOrder?.map((field, index) => {
              return field === "birthDate" ? (
                <p key={index}>{formatDateForPlaceholder(userData[field])}</p>
              ) : (
                <p key={index}>{userData[field]}</p>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
