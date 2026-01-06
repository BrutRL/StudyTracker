import { url } from "./url";

export const all = async () => {
  const response = await fetch(`${url}/subject/all`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return await response.json();
};

export const count = async () => {
  const response = await fetch(`${url}/subject/count`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return await response.json();
};

export const create = async (body) => {
  const response = await fetch(`${url}/subject/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  return await response.json();
};
export const update = async (id, body) => {
  const response = await fetch(`${url}/subject/update/${id}?_method=PATCH`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  return await response.json();
};

export const destroy = async (id) => {
  const response = await fetch(`${url}/subject/delete/${id}?_method=DELETE`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return await response.json();
};
