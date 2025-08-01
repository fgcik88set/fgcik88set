import { defineField, defineType } from 'sanity'

const pastExecutivesSchema = defineType({
  name: 'pastExecutives',
  title: 'Past Executives',
  type: 'document',
  fields: [
    defineField({
      name: 'yearRange',
      title: 'Year Range',
      type: 'string',
      description: 'e.g., "2021-2023", "2019-2021", "2017-2019"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'executives',
      title: 'Executives for this period',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'position',
              title: 'Position',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'email',
              title: 'Email',
              type: 'string',
            }),
            defineField({
              name: 'linkedIn',
              title: 'LinkedIn',
              type: 'url',
            }),
          ],
        },
      ],
      validation: Rule => Rule.required().min(1),
    }),
  ],
}) 

export default pastExecutivesSchema;
