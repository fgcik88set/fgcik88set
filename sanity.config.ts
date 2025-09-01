import schemas from '@/sanity/schemas'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'


export default defineConfig({
  name: 'FGCIK88set_Data-House',
  title: 'FGCIK88',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-07-18',
  basePath: process.env.NEXT_PUBLIC_SANITY_BASE_PATH!,
  plugins: [structureTool()],
  schema: {types: schemas},
})