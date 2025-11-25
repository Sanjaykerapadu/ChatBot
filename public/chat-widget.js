(function () {
  // Create floating button
  const button = document.createElement("div");
  button.innerHTML = "💬";
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.width = "60px";
  button.style.height = "60px";
  button.style.background = "#4f46e5";
  button.style.color = "#fff";
  button.style.borderRadius = "50%";
  button.style.display = "flex";
  button.style.justifyContent = "center";
  button.style.alignItems = "center";
  button.style.fontSize = "28px";
  button.style.cursor = "pointer";
  button.style.zIndex = "99999";
  document.body.appendChild(button);

  // Create iframe (hidden initially)
  const iframe = document.createElement("iframe");
  iframe.src = "https://chat-bot-woad-pi.vercel.app"; // your chatbot URL
  iframe.style.position = "fixed";
  iframe.style.bottom = "100px";
  iframe.style.right = "20px";
  iframe.style.width = "380px";
  iframe.style.height = "500px";
  iframe.style.border = "1px solid #ddd";
  iframe.style.borderRadius = "12px";
  iframe.style.display = "none";
  iframe.style.zIndex = "99999";
  document.body.appendChild(iframe);

  // Toggle iframe
  button.addEventListener("click", () => {
    iframe.style.display = iframe.style.display === "none" ? "block" : "none";
  });
})();
