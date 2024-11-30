class APIFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "size", "fields", "search"];
    excludedFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|in)\b/g,
      (match) => `$${match}`
    );
    const parsedQueryString = JSON.parse(queryStr);
    //Price
    if (parsedQueryString.price) {
      const arrPrice = parsedQueryString.price.split(",");
      this.query = this.query.find({
        price: {
          $lt: arrPrice[1],
          $gt: arrPrice[0],
        },
      });
      return this;
    }
    //Star Ratings
    if (parsedQueryString.rating) {
      const rating = parsedQueryString.rating;
      console.log(rating);
      this.query = this.query.find({
        "rating.rate": {
          $gte: parseFloat(rating),
        },
      });
      return this;
    }
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  search() {
    if (this.queryString.search) {
      let searchTerm = this.queryString.search;
      this.query = this.query.find({
        $or: [
          {
            title: {
              $regex: searchTerm,
              $options: "i",
            },
          },
          {
            description: {
              $regex: searchTerm,
              $options: "i",
            },
          },
        ],
      });
    }
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy); //sort is mongoose method not js native method
    } else {
      this.query = this.query.sort("-createdAt"); //- means desc
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.find({}).select(fields);
    } else {
      this.query = this.query.find({}).select("-__v");
    }
    return this;
  }
  paginate() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.size * 1 || 15;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
export default APIFeature;
