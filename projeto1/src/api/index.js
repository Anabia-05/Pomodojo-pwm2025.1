import axios from "axios";

const urlFilme = "https://parseapi.back4app.com/classes/DadosFilmes";
const headers = {
  'X-Parse-Application-Id': 'y252xv9Jnq4yizmwdMoY9zmbrxOOLZVL3GHtEZYZ',
  'X-Parse-REST-API-Key': 'ufZphZCaRGrpPEHErZtPKQ67mwnGlduk2aUqrAxI',
    
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

export async function getFilmes() {
  try {
    const response = await axios.get(urlFilme, { headers: headers });
    if (response.status / 100 === 2) {
      console.log("filmes", response.data.results);
      return response.data.results;
    } else {
      console.log("status:", response.status);
      console.log("statusText:", response.statusText);
    }
  } catch (err) {
    console.log("getFilmes err:", err);
  }
  return [];
}

export async function addFilmes(novoFilme) {
  try {
    const response = await axios.post(urlFilme, novoFilme, {
      headers: headersJson,
    });
    if (response.status === 201) {
      return { ...novoFilme, ...response.data };
    } else {
      console.log("status:", response.status);
      console.log("statusText:", response.statusText);
    }
  } catch (err) {
    console.log("addFilmes err:", err);
  }
  return null;
}