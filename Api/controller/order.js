import order from "../model/order.js"

export const processPayment = async (req, res) => {
    try {
  
      const { user, amount, orderDescription, orderType } = req.body;
  

      const newOrder = new order({
        user,
        amount,
        orderDescription,
        orderType,
      });
  
   
      await newOrder.save();
  
   
      return res.status(200).json({ message: 'Order successfully paid and saved.' });
    } catch (error) {
      return res.status(500).json({ error: 'Error processing payment and saving order.' });
    }
  };