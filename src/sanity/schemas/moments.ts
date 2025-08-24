import { defineField, defineType } from 'sanity'

const momentsSchema = defineType({
  name: 'moments',
  title: 'Moments',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'isCategory',
      title: 'Is this a main category?',
      type: 'boolean',
      description: 'Check this if this is a main category (like "Celebrations") that will contain subcategories',
      initialValue: false,
    }),
    defineField({
      name: 'subCategories',
      title: 'Subcategories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              options: {
                source: 'title',
                maxLength: 96,
              },
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'images',
              title: 'Images',
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
          ],
        },
      ],
      hidden: ({ document }) => document?.isCategory !== true,
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'images',
      title: 'Images',
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
      hidden: ({ document }) => document?.isCategory === true,
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this item should be displayed (lower numbers first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      date: 'date',
      isCategory: 'isCategory',
      subCategoriesCount: 'subCategories',
    },
    prepare(selection) {
      const { title, media, date, isCategory, subCategoriesCount } = selection
      return {
        title: title,
        subtitle: isCategory 
          ? `📁 Category with ${subCategoriesCount?.length || 0} subcategories` 
          : date 
            ? new Date(date).toLocaleDateString() 
            : '📄 Individual moment',
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'title', direction: 'asc' }
      ]
    },
    {
      title: 'Date',
      name: 'dateDesc',
      by: [
        { field: 'date', direction: 'desc' }
      ]
    }
  ]
})

export default momentsSchema 