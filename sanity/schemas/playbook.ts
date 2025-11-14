import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'playbook',
  title: 'Playbook',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required().min(5)
    }),
    defineField({
      name: 'summary',
      title: 'Resumo',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string'
    })
  ]
});
