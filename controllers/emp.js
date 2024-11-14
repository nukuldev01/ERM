const Labour = require("../models/emp");

async function Getalltask(req, res) {

    
    try {
        const userTasks = await Labour.find();
        if (!userTasks || userTasks.length === 0) {
            return res.status(404).json({ message: "No tasks found" });
        }

        
        return res.status(200).json(userTasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    Getalltask,
};