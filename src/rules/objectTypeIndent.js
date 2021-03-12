// import {spacingFixers} from '../utilities';

const schema = [
  {
    additionalProperties: false,
    properties: {
      indent: {
        type: 'number',
      },
    },
    type: 'object',
  },
];

const meta = {
  fixable: 'code',
};

const create = (context) => {
  const indent = context?.options[0]?.indent ?? 2;
  const sourceCode = context.getSourceCode();

  return {
    ObjectTypeAnnotation (node) {
      const {
        properties,
      } = node;

      if (properties.length === 0 ||
          !indent ||
          sourceCode.lines.length === 1
      ) {
        return;
      }

      let invalidIndent = false;
      sourceCode.lines.forEach((line, index) => {
        if (index === 0 ||
            line.startsWith('|}') ||
            line.startsWith('}')
        ) {
          return;
        }

        line.split('').forEach((char, ind) => {
          if (invalidIndent) {
            return;
          }
          if (ind < indent && char !== ' ' ||
              ind === indent && char === ' ') {
            invalidIndent = true;
          }
        });
      });

      if (invalidIndent) {
        context.report({
          data: {
            indent,
          },

          // fix: spacingFixers.addSpaceAfter(opener),
          message: 'Object type expected indentation of {{indent}} spaces',
          node,
        });
      }
    },
  };
};

export default {
  create,
  meta,
  schema,
};
