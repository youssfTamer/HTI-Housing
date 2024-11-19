export class ApiFeature {
    constructor(mongooseQuery, querydata) {
        this.mongooseQuery = mongooseQuery
        this.querydata = querydata
    }

    pagination() {
        let { page, size } = this.querydata
        if (!page || page <= 0) { page = 1 }
        if (!size || size <= 0) { size = 5 }
        const skip = (page - 1) * size
        this.mongooseQuery.limit(size).skip(skip)
        return this
    }

    sort() {
        let {sort} = this.querydata
        sort = sort?.replaceAll(',', ' ')
        this.mongooseQuery.sort(sort)
        return this
    }

    select() {
        let {select} = this.querydata
        select = select?.replaceAll(',', ' ')
        this.mongooseQuery.sort(select)
        return this
    }

    filter() {
        let { page, size, sort, select, ...filter } = this.querydata
        filter = JSON.parse(JSON.stringify(filter).replace(/'gte|gt|lte|lt'/g, match => `$${match}`))
        this.mongooseQuery.find(filter)
        return this
    }
}
