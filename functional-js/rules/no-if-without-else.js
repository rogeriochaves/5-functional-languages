"use strict";

const create = function (context) {
    return {
        IfStatement: (node) => {
            if (!node.alternate) {
                void context.report({
                    node,
                    message: "Unallowed use of `if` without `else`. Add an `else` clause"
                });
            } else {
                return;
            }
        },
    };
};

module.exports = {
    create,
    meta: {
        docs: {
            description: "Forbid the use of ifs without elses.",
            recommended: "error",
        }
    }
};