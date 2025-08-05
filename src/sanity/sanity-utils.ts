import { createClient, groq } from "next-sanity";

export async function getCurrentExecutives() {
  const client = createClient({
    projectId: "nb6nouyz",
    dataset: "production",
    apiVersion: "2025-07-18",
  });

  return client.fetch(
    groq`*[_type == "currentExecutives"]{
        "id": _id,
        "name": name,
        "position": position,
        "term": yearHeld,
        "email": email,
        "linkedIn": linkedIn,
        "image": image.asset->url,
        "imageAlt": image.alt,
    }`
  );
}

export async function getPastExecutives() {
  const client = createClient({
    projectId: "nb6nouyz",
    dataset: "production",
    apiVersion: "2025-07-18",
  });

  return client.fetch(
    groq`*[_type == "pastExecutives"]{
        "id": _id,
        "yearRange": yearRange,
        "executives": executives[]{
          "id": _key,
          "name": name,
          "position": position,
          "term": ^.yearRange,
          "email": email,
          "linkedIn": linkedIn,
          "image": image.asset->url,
          "imageAlt": image.alt,
        }
    }`
  );
}

export async function getCurrentBOT() {
  const client = createClient({
    projectId: "nb6nouyz",
    dataset: "production",
    apiVersion: "2025-07-18",
  });

  return client.fetch(
    groq`*[_type == "currentBOT"]{
        "id": _id,
        "name": name,
        "position": position,
        "term": yearHeld,
        "email": email,
        "linkedIn": linkedIn,
        "image": image.asset->url,
        "imageAlt": image.alt,
    }`
  );
}

export async function getPastBOT() {
  const client = createClient({
    projectId: "nb6nouyz",
    dataset: "production",
    apiVersion: "2025-07-18",
  });

  return client.fetch(
    groq`*[_type == "pastBOT"]{
        "id": _id,
        "yearRange": yearRange,
        "BOT": BOT[]{
          "id": _key,
          "name": name,
          "position": position,
          "term": ^.yearRange,
          "email": email,
          "linkedIn": linkedIn,
          "image": image.asset->url,
          "imageAlt": image.alt, 
        }
    }`
  );
}

export async function getPastTrustees() {
  const client = createClient({
    projectId: "nb6nouyz",
    dataset: "production",
    apiVersion: "2025-07-18",
  });

  return client.fetch(
    groq`*[_type == "pastTrustees"]{
        "id": _id,
        "yearRange": yearRange,
        "trustees": trustees[]{
          "id": _key,
          "name": name,
          "position": position,
          "term": ^.yearRange,
          "email": email,
          "linkedIn": linkedIn,
          "image": image.asset->url,
          "imageAlt": image.alt,
        }
    }`
  );
}
