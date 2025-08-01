import { createClient , groq} from "next-sanity";


export async function getCurrentExecutives() {
  const client = createClient({
    projectId: "nb6nouyz",
    dataset: "production",
    apiVersion: "2025-07-18",
  });

  return client.fetch(
    groq`*[_type == "currentExecutives"]{
        ...,
        "id": _id,
        "name": name,
        "position": position,
        "yearHeld": yearHeld,
        "email": email,
        "linkedIn": linkedIn,
        "image": image.asset->url,
        "url": url,
        "imageAlt": image.alt,
    }`
  )
}
