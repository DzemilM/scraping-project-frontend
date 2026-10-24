export async function login(email, password) {
  const response = await fetch("http://localhost:8000/login", {
    method: "POST",
    body: new URLSearchParams({
        username: email,
        password: password
    })
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Login failed");
  }

  return result;
}
