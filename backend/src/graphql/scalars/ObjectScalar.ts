import { GraphQLScalarType } from 'graphql'

export const ObjectScalar = new GraphQLScalarType({
  name: 'Object',
  description: 'An Object scalar',
  serialize: (value: string) => {
    // FIXME: not called
    console.log('s', value)
    return JSON.parse(value)
  },
  parseValue: (value: string) => {
    return value
    // console.log('pv', value);
    // return JSON.stringify(value)
  },
  // FIXME: not called
  // parseLiteral: (ast, value) => {
  //   // return JSON.parse(value as string);
  //   return 'haha';
  // },
})
