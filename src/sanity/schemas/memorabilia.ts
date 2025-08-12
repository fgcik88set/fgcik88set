import { defineField, defineType } from 'sanity'

const memorabiliaSchema = defineType({
  name: 'memorabilia',
  title: 'Memorabilia',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'The name or title of the memorabilia item',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required(),
      description: 'Detailed description of the memorabilia item',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Price of the item (e.g., "₦5,000", "Free", "Contact for price")',
    }),
    defineField({
      name: 'image',
      title: 'Memorabilia Image',
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
          description: 'Alternative text for accessibility',
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Optional caption for the image',
        }),
      ],
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
      description: 'URL-friendly identifier',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Clothing & Apparel', value: 'clothing-apparel' },
          { title: 'Books & Publications', value: 'books-publications' },
          { title: 'Accessories', value: 'accessories' },
          { title: 'Collectibles', value: 'collectibles' },
          { title: 'Home & Office', value: 'home-office' },
          { title: 'Sports & Recreation', value: 'sports-recreation' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: Rule => Rule.required(),
      description: 'Category to organize memorabilia items',
    }),
    defineField({
      name: 'isAvailable',
      title: 'Available for Purchase',
      type: 'boolean',
      initialValue: true,
      description: 'Mark as false if item is sold out or no longer available',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Item',
      type: 'boolean',
      initialValue: false,
      description: 'Mark as true to highlight this item prominently',
    }),
    defineField({
      name: 'stockQuantity',
      title: 'Stock Quantity',
      type: 'number',
      description: 'Number of items available (leave empty if unlimited)',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords to help with search and categorization',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      price: 'price',
      category: 'category',
      available: 'isAvailable',
    },
    prepare(selection) {
      const { title, media, price, category, available } = selection
      const statusIcon = available ? '🟢' : '🔴'
      
      return {
        title: `${statusIcon} ${title}`,
        subtitle: `${price} • ${category}`,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Title (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Title (Z-A)',
      name: 'titleDesc',
      by: [{ field: 'title', direction: 'desc' }],
    },
    {
      title: 'Category',
      name: 'category',
      by: [{ field: 'category', direction: 'asc' }],
    },
    {
      title: 'Featured First',
      name: 'featured',
      by: [{ field: 'isFeatured', direction: 'desc' }, { field: 'title', direction: 'asc' }],
    },
  ],
})

export default memorabiliaSchema 