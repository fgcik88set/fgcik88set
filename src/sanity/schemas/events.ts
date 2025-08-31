import { defineField, defineType } from 'sanity'

const eventsSchema = defineType({
  name: 'events',
  title: 'Events',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Event Date & Time',
      type: 'datetime',
      validation: Rule => Rule.required(),
      description: 'Set the date and time when this event will occur',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date & Time',
      type: 'datetime',
      description: 'Optional: Set if the event spans multiple days or has a specific end time',
    }),
    defineField({
      name: 'location',
      title: 'Location',
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
      name: 'image',
      title: 'Event Image',
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
      name: 'eventStatus',
      title: 'Event Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Past', value: 'past' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'upcoming',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'General Meeting', value: 'general-meeting' },
          { title: 'Alumni Reunion', value: 'alumni-reunion' },
          { title: 'Workshop', value: 'workshop' },
          { title: 'Seminar', value: 'seminar' },
          { title: 'Social Event', value: 'social-event' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Event',
      type: 'boolean',
      description: 'Mark as true to highlight this event prominently',
      initialValue: false,
    }),
    defineField({
      name: 'registrationRequired',
      title: 'Registration Required',
      type: 'boolean',
      description: 'Mark as true if attendees need to register',
      initialValue: false,
    }),
    defineField({
      name: 'maxAttendees',
      title: 'Maximum Attendees',
      type: 'number',
      description: 'Leave empty if unlimited',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      date: 'date',
      location: 'location',
      status: 'eventStatus',
    },
    prepare(selection) {
      const { title, media, date, location, status } = selection
      const statusColors = {
        upcoming: '🟢',
        ongoing: '🟡',
        past: '🔴',
        cancelled: '⚫'
      }
      const statusIcon = statusColors[status as keyof typeof statusColors] || ''
      
      return {
        title: `${statusIcon} ${title}`,
        subtitle: `${date ? new Date(date).toLocaleDateString() : ''}${location ? ` • ${location}` : ''} • ${status}`,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Date (Newest First)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Date (Oldest First)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
    {
      title: 'Status',
      name: 'status',
      by: [{ field: 'eventStatus', direction: 'asc' }],
    },
  ],
})

export default eventsSchema 