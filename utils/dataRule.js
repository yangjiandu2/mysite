// 数据验证规则

// 博客分类规则验证
module.exports.blogTypeRule = {
    name: {
        presence: {
            allowEmpty: false
        },
        type: "string"
    },
    order: {
        presence: {
            allowEmpty: false
        },
        type: "string"
    }
}


// 博客规则验证
module.exports.blogRule = {
    title: {
        presence: {
            allowEmpty: false
        },
        type: "string"
    },
    description: {
        presence: {
            allowEmpty: true
        },
        type: "string"
    },
    htmlContent: {
        presence: {
            allowEmpty: false
        },
        type: "string"
    },
    thumb: {
        presence: {
            allowEmpty: true
        },
        type: "string"
    },
    toc: {
        presence: {
            allowEmpty: true
        },
        type: "string"
    },
    scanNumber: {
        presence: {
            allowEmpty: true
        },
        type: "integer"
    },
    commentNumber: {
        presence: {
            allowEmpty: true
        },
        type: "integer"
    },
    createDate: {
        presence: {
            allowEmpty: false
        },
        type: "integer"
    },
    categoryId: {
        presence: true,
    },
}