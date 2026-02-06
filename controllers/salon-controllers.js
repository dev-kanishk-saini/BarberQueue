import { initializeSalon , getallSalons } from "../models/salon.model.js";


const createSalon = async (req, res, next) => {

         console.log("createSalon executed!");
    try {
        const { name,owner , address,pin ,  openAt , closeAt } = req.body;
        const salon = await initializeSalon({ name, owner, address,pin ,  openAt ,closeAt });
        res.status(201).json({
            message: 'Salon created successfully',
            salon: {
                id: salon.id,
                name: salon.name,
                address: salon.address,
                openAt : salon.openAt,
                closeAt : salon.closeAt,
                pin: salon.pin,
                owner: salon.owner
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating salon',
            error: error.message
        });
        console.error(error);
    }
};



const getSalons = async (req, res, next) => {

    try {
        const salons = await getallSalons(); // Assuming a function to retrieve all salons exists
        res.status(200).json({
            message: 'Salons retrieved successfully',
            salons: salons
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving salons',
            error: error.message
        });
        console.error(error);
    }
};

export { createSalon , getSalons };