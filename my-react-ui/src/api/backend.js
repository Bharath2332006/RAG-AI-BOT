export const API_BASE = "http://127.0.0.1:8000";

/* -------------------------------
   Upload Resume
--------------------------------*/
export async function uploadResume(file) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_BASE}/upload/resume`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Server error: ${res.status} ${res.statusText} - ${errorText}`
    );
  }
  return res.json();
}

/* -------------------------------
   Upload HR Document
--------------------------------*/
export async function uploadHRDoc(file) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_BASE}/upload/hr-document`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Server error: ${res.status} ${res.statusText} - ${errorText}`
    );
  }
  return res.json();
}

/* -------------------------------
   SUPER CHATBOT ENDPOINT
--------------------------------*/
export async function chat(question, resumeId = null) {
  const payload = { question };

  if (resumeId) payload.resume_id = resumeId;

  const res = await fetch(`${API_BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Server error: ${res.status} ${res.statusText} - ${errorText}`
    );
  }
  return res.json();
}

/* -------------------------------
   Recommend Role
--------------------------------*/
export async function recommendRole(resumeId) {
  const res = await fetch(`${API_BASE}/api/recommend-role`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resume_id: resumeId }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Server error: ${res.status} ${res.statusText} - ${errorText}`
    );
  }
  return res.json();
}
