const getAuthToken = () => {
  const value = localStorage.getItem("jwtToken");
  return value === null ? "" : value;
};

export default getAuthToken;
