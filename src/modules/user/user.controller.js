import { User } from "../../../db/models/user.model.js";

export const getAdmins = async (req, res) => {
    const users = await User.find(
        { role: { $in: ['staff', 'manager'] } },
        { password: 0, gender: 0 }
    );
    return res.status(200).json({ message: "Success", users });
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, phone } = req.body;

    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;

    await user.save();
    return res.status(200).json({ message: "User updated successfully", user });
};

export const getStudents = async (req, res) => {
    const query = { role: 'student', status: 'waiting_admin_approval' };
    //console.log("Querying for users with:", query);
    const users = await User.find(query, { password: 0, gender: 0 });
    return res.status(200).json({ message: "Success", users });
};
