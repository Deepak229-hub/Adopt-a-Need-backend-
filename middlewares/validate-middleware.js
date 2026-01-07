const validate = (schema) => async (req, res, next) => {
    try {
        let parseBody = await schema.parseAsync(req.body);
        parseBody = req.body;
        next();
    } catch (error) {
        return res.status(400).json({message: "enter valid details", extraDetails: error.flatten().fieldErrors});
    }
};

export default validate;