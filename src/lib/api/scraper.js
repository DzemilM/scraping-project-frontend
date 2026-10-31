export async function scrape(url, format, token) {
  const address = `http://localhost:8000/scrape?url=${encodeURIComponent(url)}&output=${format}`;
  const response = await fetch(address, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    
    if(response.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    }

    const result = await response.json();
    throw new Error(result.detail || "Scrape failed");  
  }

  const type = response.headers.get("content-type");
  
  if(type.includes("json")) {
    return await response.json();
  } else {
    return await response.text();
  }
}
