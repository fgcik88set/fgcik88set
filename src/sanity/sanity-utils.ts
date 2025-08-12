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

export async function getMoments() {
  const client = createClient({
    projectId: "nb6nouyz",
    dataset: "production",
    apiVersion: "2025-07-18",
  });

  return client.fetch(
    groq`*[_type == "moments"] | order(date desc) {
        "id": _id,
        "title": title,
        "description": description,
        "date": date,
        "slug": slug.current,
        "images": images[]{
          "url": asset->url,
          "alt": alt,
          "caption": caption,
        }
    }`
  );
}

export async function getMomentBySlug(slug: string) {
  const client = createClient({
    projectId: "nb6nouyz",
    dataset: "production",
    apiVersion: "2025-07-18",
  });

  return client.fetch(
    groq`*[_type == "moments" && slug.current == $slug][0] {
        "id": _id,
        "title": title,
        "description": description,
        "date": date,
        "slug": slug.current,
        "images": images[]{
          "url": asset->url,
          "alt": alt,
          "caption": caption,
        }
    }`,
    { slug }
  );
}

export async function getEvents() {
  const client = createClient({
    projectId: "nb6nouyz",
    dataset: "production",
    apiVersion: "2025-07-18",
  });

  return client.fetch(
    groq`*[_type == "events"] | order(date desc) {
        "id": _id,
        "title": title,
        "description": description,
        "date": date,
        "endDate": endDate,
        "location": location,
        "image": {
          "url": image.asset->url,
          "alt": image.alt,
          "caption": image.caption,
        },
        "eventStatus": eventStatus,
        "eventType": eventType,
        "isFeatured": isFeatured,
        "registrationRequired": registrationRequired,
        "maxAttendees": maxAttendees,
        "slug": slug.current,
    }`
  );
}

export async function getUpcomingEvents() {
  const client = createClient({
    projectId: "nb6nouyz",
    dataset: "production",
    apiVersion: "2025-07-18",
  });

  return client.fetch(
    groq`*[_type == "events" && (eventStatus == "upcoming" || eventStatus == "ongoing")] | order(date asc) {
        "id": _id,
        "title": title,
        "description": description,
        "date": date,
        "endDate": endDate,
        "location": location,
        "image": {
          "url": image.asset->url,
          "alt": image.alt,
          "caption": image.caption,
        },
        "eventStatus": eventStatus,
        "eventType": eventType,
        "isFeatured": isFeatured,
        "registrationRequired": registrationRequired,
        "maxAttendees": maxAttendees,
        "slug": slug.current,
    }`
  );
}

export async function getPastEvents() {
  const client = createClient({
    projectId: "nb6nouyz",
    dataset: "production",
    apiVersion: "2025-07-18",
  });

  return client.fetch(
    groq`*[_type == "events" && eventStatus == "past"] | order(date desc) {
        "id": _id,
        "title": title,
        "description": description,
        "date": date,
        "endDate": endDate,
        "location": location,
        "image": {
          "url": image.asset->url,
          "alt": image.alt,
          "caption": image.caption,
        },
        "eventStatus": eventStatus,
        "eventType": eventType,
        "isFeatured": isFeatured,
        "registrationRequired": registrationRequired,
        "maxAttendees": maxAttendees,
        "slug": slug.current,
    }`
  );
}

export async function getEventBySlug(slug: string) {
  const client = createClient({
    projectId: "nb6nouyz",
    dataset: "production",
    apiVersion: "2025-07-18",
  });

  return client.fetch(
    groq`*[_type == "events" && slug.current == $slug][0] {
        "id": _id,
        "title": title,
        "description": description,
        "date": date,
        "endDate": endDate,
        "location": location,
        "image": {
          "url": image.asset->url,
          "alt": image.alt,
          "caption": image.caption,
        },
        "eventStatus": eventStatus,
        "eventType": eventType,
        "isFeatured": isFeatured,
        "registrationRequired": registrationRequired,
        "maxAttendees": maxAttendees,
        "slug": slug.current,
    }`,
    { slug }
  );
}

export async function getMemorabilia() {
  const client = createClient({
    projectId: "nb6nouyz",
    dataset: "production",
    apiVersion: "2025-07-18",
  });

  return client.fetch(
    groq`*[_type == "memorabilia"] | order(isFeatured desc, title asc) {
        "id": _id,
        "title": title,
        "description": description,
        "price": price,
        "category": category,
        "image": {
          "url": image.asset->url,
          "alt": image.alt,
          "caption": image.caption,
        },
        "slug": slug.current,
        "isAvailable": isAvailable,
        "isFeatured": isFeatured,
        "stockQuantity": stockQuantity,
        "tags": tags,
    }`
  );
}

export async function getMemorabiliaByCategory(category: string) {
  const client = createClient({
    projectId: "nb6nouyz",
    dataset: "production",
    apiVersion: "2025-07-18",
  });

  const query = category === 'all' 
    ? groq`*[_type == "memorabilia"] | order(isFeatured desc, title asc)`
    : groq`*[_type == "memorabilia" && category == $category] | order(isFeatured desc, title asc)`;

  return client.fetch(
    groq`${query} {
        "id": _id,
        "title": title,
        "description": description,
        "price": price,
        "category": category,
        "image": {
          "url": image.asset->url,
          "alt": image.alt,
          "caption": image.caption,
        },
        "slug": slug.current,
        "isAvailable": isAvailable,
        "isFeatured": isFeatured,
        "stockQuantity": stockQuantity,
        "tags": tags,
    }`,
    { category }
  );
}

export async function getFeaturedMemorabilia() {
  const client = createClient({
    projectId: "nb6nouyz",
    dataset: "production",
    apiVersion: "2025-07-18",
  });

  return client.fetch(
    groq`*[_type == "memorabilia" && isFeatured == true] | order(title asc) {
        "id": _id,
        "title": title,
        "description": description,
        "price": price,
        "category": category,
        "image": {
          "url": image.asset->url,
          "alt": image.alt,
          "caption": image.caption,
        },
        "slug": slug.current,
        "isAvailable": isAvailable,
        "isFeatured": isFeatured,
        "stockQuantity": stockQuantity,
        "tags": tags,
    }`
  );
}

export async function getMemorabiliaBySlug(slug: string) {
  const client = createClient({
    projectId: "nb6nouyz",
    dataset: "production",
    apiVersion: "2025-07-18",
  });

  return client.fetch(
    groq`*[_type == "memorabilia" && slug.current == $slug][0] {
        "id": _id,
        "title": title,
        "description": description,
        "price": price,
        "category": category,
        "image": {
          "url": image.asset->url,
          "alt": image.alt,
          "caption": image.caption,
        },
        "slug": slug.current,
        "isAvailable": isAvailable,
        "isFeatured": isFeatured,
        "stockQuantity": stockQuantity,
        "tags": tags,
    }`,
    { slug }
  );
}
