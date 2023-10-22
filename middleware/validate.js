const validator = require('../helpers/validate');

const saveRecipe = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        source: 'required|string', 
        ingredients: 'required|string',
        instructions: 'required|string',
        servings: 'required|numeric',
        prepTime: 'required|numeric',
        totalTime: 'required|numeric'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status){
            res.status(412).send({
                success: false,
                message: 'Invalid recipe format',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveRecipe
}