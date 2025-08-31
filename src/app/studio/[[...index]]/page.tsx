"use client";

import { NextStudio } from "next-sanity/studio";
import config  from "../../../../sanity.config";

export const runtime = "nodejs";

export default function Studio() {
  return <NextStudio config={config} />;
}