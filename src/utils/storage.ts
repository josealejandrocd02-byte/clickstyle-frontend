export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};
export const removeToken = () => {
  localStorage.removeItem("token");
};


export const saveRole = (role: string) => {
  localStorage.setItem("role", role);
};
export const getRole = (): string | null => {
  return localStorage.getItem("role");
};
export const removeRole = () => {
  localStorage.removeItem("role");
};



export const saveUsername = (token: string) => {
  localStorage.setItem("username", token);
};

export const getUsername = () => {
  return localStorage.getItem("username");
};
export const removeUsername = () => {
  localStorage.removeItem("username");
};

