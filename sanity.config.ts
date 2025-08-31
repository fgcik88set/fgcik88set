import schemas from '@/sanity/schemas'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'


export default defineConfig({
  name: 'FGCIK88',
  title: 'FGCIK88',
  projectId: 'nb6nouyz',
  dataset: 'production',
  apiVersion: '2025-07-18',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {types: schemas},
})