const Account = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  console.log("code", code);
  return <></>;
};

export default Account;
