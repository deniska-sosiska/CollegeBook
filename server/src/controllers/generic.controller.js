import boom from 'boom';

const genericCrud = (Model) => ({
    async get({ params: { id } }, res) {
        try {
            const item = await Model.findById(id);
            return res.status(200).send(item);
        } catch (error) {
            return res.status(400).send(boom.boomify(error));
        }
    },
    async getAll(req, res) {
        try {
            const items = await Model.find();
            return res.status(200).send(items);
        } catch (error) {
            return res.status(400).send(boom.boomify(error));
        }
    },
    async create({ body }, res) {
        try {
            const item = new Model(body);
            const newItem = await item.save();
            return res.status(200).send(newItem);
        } catch (error) {
            return res.status(400).send(boom.boomify(error));
        }
    },
    async update({ params: { id }, body }, res) {
        try {
            const item = await Model.findByIdAndUpdate(id, body, { new: true });
            return res.status(200).send(item);
        } catch (error) {
            return res.status(400).send(boom.boomify(error));
        }
    },
    async delete({ params: { id } }, res) {
        try {
            await Model.findByIdAndDelete(id);
            return res.status(200).send(
                { status: 200, message: 'The object has been deleted' },
            );
        } catch (error) {
            return res.status(400).send(boom.boomify(error));
        }
    },
});

export { genericCrud };
