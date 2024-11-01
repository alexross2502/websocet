export default async function formSubmit(
  isRegister,
  { login, password, username = null }
) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_PATH}api/${
        isRegister ? "login" : "registration"
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          login,
          password,
          ...(username && { username }),
        }),
      }
    );

    return response;
  } catch (error) {
    console.error("Ошибка:", error);
    return `${error}`;
  }
}
