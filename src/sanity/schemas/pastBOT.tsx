import { defineField, defineType } from 'sanity'

const pastBOTSchema = defineType({
  name: 'pastBOT',
  title: 'Past BOT',
  type: 'document',
  fields: [
    defineField({
      name: 'yearRange',
      title: 'Year Range',
      type: 'string',
      description: 'e.g., "2018-2022", "2014-2018", "2010-2014"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'BOT',
      title: 'BOT for this period',
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

export default pastBOTSchema;
