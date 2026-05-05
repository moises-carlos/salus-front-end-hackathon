const BASE_URL = "https://back-end-salus.onrender.com";

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
  }

  // Some endpoints might return text or empty bodies
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return response.text() as unknown as T;
}

export const api = {
  // Auth
  login: (data: any) => request("/api/v1/auth/login", { method: "POST", body: JSON.stringify(data) }),
  register: (data: any) => request("/api/v1/auth/register", { method: "POST", body: JSON.stringify(data) }),

  // Mood / Monitoring
  checkIn: (userId: string, data: { moodLevel: number; tags: string[]; notes: string }) => 
    request(`/api/v1/monitoring/check-in?userId=${userId}`, { method: "POST", body: JSON.stringify(data) }),
  getHistory: (userId: string) => 
    request<any[]>(`/api/v1/monitoring/history?userId=${userId}`),
  getPatterns: (userId: string) => 
    request<number>(`/api/v1/monitoring/patterns?userId=${userId}`),

  // Crisis
  activateCrisis: (userId: string, intensity: number) => 
    request(`/api/v1/crisis/activate?userId=${userId}`, { method: "POST", body: JSON.stringify({ intensity }) }),
  resolveCrisis: (userId: string, crisisId: string) => 
    request(`/api/v1/crisis/${crisisId}/resolve?userId=${userId}`, { method: "PUT" }),

  // Support
  getProfessionals: (specialty?: string) => 
    request<any[]>(`/api/v1/support/professionals${specialty ? `?specialty=${specialty}` : ""}`),

  // Health
  health: () => request<string>("/api/v1/health"),
};
