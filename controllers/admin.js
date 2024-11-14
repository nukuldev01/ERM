const { User } = require("../models/user");


async function showAllSalesManagers(req, res) {
    try {
        const salesManagers = await User.find()
        
        if (salesManagers.length === 0) {
            console.log("No sales managers found in the database.");
            return res.status(404).json({ message: "No sales managers found" });
        }
        
        res.status(200).json(salesManagers);
    } catch (error) {
        console.error("Error fetching sales managers:", error);
        res.status(500).json({ message: "Sales Managers not found" });
    }
}

async function addNewSalesManager(req, res) {
    const { loginId, name, role } = req.body;
if (!loginId || !name || !role) {
    return res.status(400).json({ message: 'Missing required fields' });
}
    try {
        if (role !== 'salemanger') {
            return res.status(400).json({ message: 'Role must be Sales Manager' });
        }

        
        const newSalesManager = await User.create({ loginId, name, role });
        res.status(200).json({ message: 'Sales Manager successfully added', newSalesManager });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'New Sales Manager not added' });
    }
}

async function updateSalesManager(req, res) {
    const { id } = req.params;
    const { loginId, name, role, createdBy } = req.body;

    try {
        // Ensure role is Sales Manager
        const updatedSalesManager = await User.findOneAndUpdate(
            { _id: id, role: 'SalesManager' }, // Ensuring only Sales Managers can be updated
            { loginId, name, role, createdBy },
            { new: true }
        );

        if (!updatedSalesManager) {
            return res.status(404).json({ message: 'Sales Manager not found' });
        }

        res.status(200).json({ message: 'Sales Manager updated successfully', updatedSalesManager });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update Sales Manager' });
    }
}

async function deleteSalesManager(req, res) {
    const { id } = req.params;

    try {
        const deletedSalesManager = await User.findOneAndDelete(
            { _id: id, role: 'SalesManager' } // Ensuring only Sales Managers can be deleted
        );

        if (!deletedSalesManager) {
            return res.status(404).json({ message: 'Sales Manager not found' });
        }

        res.status(200).json({ message: 'Sales Manager deleted successfully', deletedSalesManager });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete Sales Manager' });
    }
}

// Employee CRUD Operations for Labour Role
async function showAllLabours(req, res) {
    try {
        const labours = await User.find({ role: 'Labour' });
        res.status(200).json(labours);
    } catch (error) {
        res.status(500).json({ message: "Labours not found" });
    }
}

async function addNewLabour(req, res) {
    const { loginId, name, role } = req.body;
    try {
        if (role !== 'Labour') {
            return res.status(400).json({ message: 'Role must be Labour' });
        }

        const newLabour = await User.create({ loginId, name, role });
        res.status(200).json({ message: 'Labour successfully added', newLabour });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'New Labour not added' });
    }
}

async function updateLabour(req, res) {
    const { id } = req.params;
    const { loginId, name, role } = req.body;

    try {
        // Ensure role is Labour
        const updatedLabour = await User.findOneAndUpdate(
            { _id: id, role: 'Labour' }, // Ensuring only Labours can be updated
            { loginId, name, role },
            { new: true }
        );

        if (!updatedLabour) {
            return res.status(404).json({ message: 'Labour not found' });
        }

        res.status(200).json({ message: 'Labour updated successfully', updatedLabour });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update Labour' });
    }
}

async function deleteLabour(req, res) {
    const { id } = req.params;

    try {
        const deletedLabour = await User.findOneAndDelete(
            { _id: id, role: 'Labour' } // Ensuring only Labours can be deleted
        );

        if (!deletedLabour) {
            return res.status(404).json({ message: 'Labour not found' });
        }

        res.status(200).json({ message: 'Labour deleted successfully', deletedLabour });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete Labour' });
    }
}

module.exports = {
    showAllSalesManagers,
    addNewSalesManager,
    updateSalesManager,
    deleteSalesManager,
    showAllLabours,
    addNewLabour,
    updateLabour,
    deleteLabour
};