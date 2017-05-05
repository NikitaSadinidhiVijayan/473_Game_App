import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  question(i) {
    return `Yo ${i}`;
  },
  a: 'chicken',
  b: 'rabbit',
  c: 'moose',
  d: 'snake',
  answer: 'b'
});
