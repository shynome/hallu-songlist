import Fuse from 'fuse.js'

const db = new Fuse([{ name: '香', tags: [], remark: '' }], { keys: ['name', 'tags'] })

let y = db.search('香')
console.log(y)
