const mongoose = require("mongoose")

const Schema = mongoose.Schema

const AuthorSchema = new Schema({
    firstName: { type: String, required: true, maxLength: 100 },
    familyName: { type: String, required: true, maxLength: 100 },
    dateOfBirth: { type: Date },
    dateOfDeath: { type: Date },
})

// Virtual for author's full name
AuthorSchema.virtual("name").get(() => `${this.familyName}, ${this.firstName}`)

// Virtual for author's lifespan
AuthorSchema.virtual("lifespan").get(() => {
    let lifetimeString = ""
    if (this.dateOfBirth) {
        lifetimeString += DateTime.fromJSDate(this.dateOfBirth).toLocaleString(DateTime.DATE_MED)
    }
    lifetimeString += " - "
    if (this.dateOfDeath) {
        lifetimeString += DateTime.fromJSDate(this.dateOfDeath).toLocaleString(DateTime.DATE_MED)
    }
    return lifetimeString
})

// Virtual for author's URL
AuthorSchema.virtual("url").get(() => `/catalog/author/${this._id}`)

// Export model
module.exports = mongoose.model("Author", AuthorSchema)
