import { defineField, defineType } from 'sanity'

const botAchievementsSchema = defineType({
  name: 'botAchievements',
  title: 'BOT Achievements',
  type: 'document',
  fields: [
    defineField({
      name: 'yearRange',
      title: 'Year Range',
      type: 'string',
      description: 'e.g., "2023-2025", "2021-2023", "2018-2022"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Achievement Title',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Achievement Description',
              type: 'text',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'images',
              title: 'Achievement Images',
              type: 'array',
              of: [
                {
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    defineField({
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                      validation: Rule => Rule.required(),
                    }),
                    defineField({
                      name: 'caption',
                      title: 'Caption',
                      type: 'string',
                    }),
                  ],
                },
              ],
              validation: Rule => Rule.required().min(1),
            }),
            defineField({
              name: 'date',
              title: 'Achievement Date',
              type: 'date',
              description: 'When this achievement was accomplished',
            }),
          ],
        },
      ],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'description',
      title: 'Period Description',
      type: 'text',
      description: 'Brief description of this BOT period and their overall impact',
    }),
  ],
  preview: {
    select: {
      title: 'yearRange',
      subtitle: 'description',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: `BOT ${title}`,
        subtitle: subtitle ? subtitle.substring(0, 50) + '...' : 'No description',
      }
    },
  },
})

export default botAchievementsSchema 