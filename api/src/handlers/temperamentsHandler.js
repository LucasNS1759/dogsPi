const getAllTemperaments = require("../controllers/getAllTemperaments")

const getTemperamentsHadler =async (req,res) =>{
try {
    const result = await getAllTemperaments()
    res.status(200).json(result)
} catch (error) {
    res.status(400).json({error: error.message});
}
}



module.exports = getTemperamentsHadler

