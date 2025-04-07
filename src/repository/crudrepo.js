class CrudRepo {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const newData = await this.model.create(data);
        return newData;
    }

    async findAll() {
        const data = await this.model.find();
        return data;
    }

    async findById(id) {
        const data = await this.model.findById(id);
        return data;
    }

    async update(id, data) {
        const updatedData = await this.model.findByIdAndUpdate(id, data, { new: true });
        return updatedData;
    }

    async delete(id) {
        const deletedData = await this.model.findByIdAndDelete(id);
        return deletedData;
    }
}
module.exports = CrudRepo;