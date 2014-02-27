var ko = require('knockout'),
	esprima = require('esprima'),
	escodegen = require('escodegen'),
	estraverse = require('estraverse');

function rewriteArrowFunctionExpressionNode(node) {
	return {
		type: 'CallExpression',
		arguments: [
			{
				type: 'ThisExpression'
			}
		],
		callee: {
			type: 'MemberExpression',
			object: {
				type: 'FunctionExpression',
				params: node.params,
				body: {
					type: 'BlockStatement',
					body: [
						{
							type: 'ReturnStatement',
							argument: {
								type: 'CallExpression',
								arguments: [
									node.body
								],
								callee: {
									type: 'MemberExpression',
									object: {
										type: 'Identifier',
										name: 'ko'
									},
									property: {
										type: 'Identifier',
										name: 'unwrap'
									}
								}
							}
						}
					]
				}
			},
			property: {
				type: 'Identifier',
				name: 'bind'
			}
		}
	};
}

function rewriteBindingValue(stringFromMarkup) {
	var ast = esprima.parse(stringFromMarkup);
	estraverse.replace(ast, {
		enter: function (node, parent) {
			if (node.type === 'ArrowFunctionExpression') {
				return rewriteArrowFunctionExpressionNode(node);
			}
		}
	})
	return escodegen.generate(ast);
}

Object.keys(ko.bindingHandlers).forEach(function(key) {
	// A bit of fudging to make sure we don't clobber any existing preprocessors
	var originalPreprocess = ko.bindingHandlers[key].preprocess;
	ko.bindingHandlers[key].preprocess = function(stringFromMarkup) {
		if (originalPreprocess) {
			stringFromMarkup = originalPreprocess(stringFromMarkup);
		}
		return rewriteBindingValue(stringFromMarkup);
	};
});