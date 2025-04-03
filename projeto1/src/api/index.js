import axios from "axios";

const urlEvento = "https://parseapi.back4app.com/classes/Eventos";
const headers = {
  'X-Parse-Application-Id': 'y252xv9Jnq4yizmwdMoY9zmbrxOOLZVL3GHtEZYZ',
    'X-Parse-REST-API-Key': 'ufZphZCaRGrpPEHErZtPKQ67mwnGlduk2aUqrAxI',
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

export async function getEventos() {
  try {
    const response = await axios.get(urlEvento, { headers: headers });
    if (response.status / 100 === 2) {
      console.log("eventos", response.data.results);
      return response.data.results;
    } else {
      console.log("status:", response.status);
      console.log("statusText:", response.statusText);
    }
  } catch (err) {
    console.log("getEventos err:", err);
  }
  return [];
}

export async function addEvento(novoEvento) {
  try {
    console.log("Enviando evento:", JSON.stringify(novoEvento, null, 2));
    const response = await axios.post(urlEvento, novoEvento, {
      headers: headersJson,
    });
    if (response.status === 201) {
      return { ...novoEvento, ...response.data };
    } else {
      console.log("status:", response.status);
      console.log("statusText:", response.statusText);
    }
  } catch (err) {
    console.log("addEvento err:", err);
  }
  return null;
}

export async function deleteEvento(eventoDeletado) {
  try {
    const response = await axios.delete(
      urlEvento + "/" + eventoDeletado.objectId,
      {
        headers: headers,
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("status:", response.status);
      console.log("statusText:", response.statusText);
    }
  } catch (err) {
    console.log("deleteEvento err:", err);
  }
  return null;
}