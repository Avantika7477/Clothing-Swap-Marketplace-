import api from "./api";

export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);
export const getMe = () => api.get("/auth/me");
export const updateProfile = (data) => {
  if (data instanceof FormData) {
    return api.put("/auth/profile", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  return api.put("/auth/profile", data);
};
export const changePassword = (data) => api.put("/auth/change-password", data);
export const getUserById = (id) => api.get(`/auth/users/${id}`);

export const getListings = (params) => api.get("/listings", { params });
export const getListingById = (id) => api.get(`/listings/${id}`);
export const getMyListings = () => api.get("/listings/mine");
export const getNearbyListings = (params) =>
  api.get("/listings/nearby", { params });
export const createListing = (formData) =>
  api.post("/listings", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateListing = (id, data) => {
  if (data instanceof FormData) {
    return api.put(`/listings/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  return api.put(`/listings/${id}`, data);
};
export const deleteListing = (id) => api.delete(`/listings/${id}`);
export const estimateValue = (data) => api.post("/listings/estimate-value", data);

export const createSwap = (data) => api.post("/swaps", data);
export const getMySwaps = (params) => api.get("/swaps", { params });
export const getSwapById = (id) => api.get(`/swaps/${id}`);
export const respondToSwap = (id, data) => api.put(`/swaps/${id}/respond`, data);
export const completeSwap = (id) => api.put(`/swaps/${id}/complete`);
export const cancelSwap = (id) => api.put(`/swaps/${id}/cancel`);

export const getConversations = () => api.get("/chat/conversations");
export const getMessages = (swapId) => api.get(`/chat/${swapId}`);
export const sendMessage = (swapId, content) =>
  api.post(`/chat/${swapId}`, { content });

export const getAdminAnalytics = () => api.get("/admin/analytics");
export const getAdminUsers = (params) => api.get("/admin/users", { params });
export const toggleUserStatus = (id) => api.put(`/admin/users/${id}/toggle`);
export const getAdminListings = (params) =>
  api.get("/admin/listings", { params });
export const adminRemoveListing = (id) => api.delete(`/admin/listings/${id}`);
export const getAdminSwaps = (params) => api.get("/admin/swaps", { params });
export const resolveDispute = (id, data) =>
  api.put(`/admin/swaps/${id}/resolve`, data);
