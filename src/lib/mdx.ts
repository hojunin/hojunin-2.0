// https://yceffort.kr - blog 코드 참조
import { visit } from 'unist-util-visit';

type TokenType =
  | 'tag'
  | 'attr-name'
  | 'attr-value'
  | 'deleted'
  | 'inserted'
  | 'punctuation'
  | 'keyword'
  | 'string'
  | 'function'
  | 'boolean'
  | 'comment';

const tokenClassNames: { [key in TokenType]: string } = {
  tag: 'text-code-red',
  'attr-name': 'text-code-yellow',
  'attr-value': 'text-code-green',
  deleted: 'text-code-red',
  inserted: 'text-code-green',
  punctuation: 'text-code-white',
  keyword: 'text-code-purple',
  string: 'text-code-green',
  function: 'text-code-blue',
  boolean: 'text-code-red',
  comment: 'text-gray-400 italic',
} as const;

export function parseCodeSnippet() {
  return (tree: Node) => {
    visit(tree, 'element', (node: any) => {
      const [token, type]: [string, TokenType] =
        node.properties.className || [];
      if (token === 'token') {
        node.properties.className = [tokenClassNames[type]];
      }
    });
  };
}
