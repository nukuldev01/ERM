const Labour = require("../models/emp");




async function Getallemp(req , res) {

    try {
        const Emp = await Labour.find();
         res.status(200).json(Emp);
    } catch (error) {
        res.status(500).json({message:"not found"})
        
    }  
}

async function AddnewEmp(req, res) {
    const { name,  assignedDate, lastDate, work, area, inTime, outTime } = req.body;

    
    if (!name || !assignedDate || !lastDate || !work || !area) {
        return res.status(400).json({ message: "All required fields must be provided" });
    }

    try {
       
        const newLabour = await Labour.create({
            name,
            assignedDate,
            lastDate,
            work,
            area,
            inTime,
            outTime
        });

        
        res.status(200).json({
            message: "Employee (Labour) added successfully",
            labour: newLabour
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding new employee" });
    }
}

const mongoose = require('mongoose');

async function UpdateEmp(req, res) {
    const { id } = req.params;

    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Labour ID' });
    }

    const { name, assignedSalesManager, assignedDate, lastDate, work, area, inTime, outTime } = req.body;

    try {
        const updatedLabour = await Labour.findByIdAndUpdate(
            id,
            { name, assignedSalesManager, assignedDate, lastDate, work, area, inTime, outTime },
            { new: true }
        );

        if (!updatedLabour) {
            return res.status(404).json({ message: "Labour not found" });
        }

        res.status(200).json({
            message: "Employee (Labour) updated successfully",
            labour: updatedLabour
        });
    } catch (error) {
        console.error('Error during update:', error);
        res.status(500).json({ message: "Error updating employee", error: error.message });
    }
}




async function DeleteEmp(req, res) {
    const { id } = req.params;

    try {
        
        const deletedLabour = await Labour.findByIdAndDelete(id);

        if (!deletedLabour) {
            return res.status(404).json({ message: "Labour not found" });
        }

        res.status(200).json({
            message: "Employee (Labour) deleted successfully",
            labour: deletedLabour
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting employee" });
    }
}

module.exports = {
    Getallemp,
    AddnewEmp,
    UpdateEmp,
    DeleteEmp
};