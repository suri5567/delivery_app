export const calculateDriverPayment = async (req, res) => {
    try {
      const { ordersCompleted, hoursOnline, distanceTraveled } = req.body;
  
      const paymentPerOrder = 50;
      const hourlyRate = 10;
      const ratePerKm = 5;
  
      const totalPayment = (ordersCompleted * paymentPerOrder) +
                           (hoursOnline * hourlyRate) +
                           (distanceTraveled * ratePerKm);
  
      res.status(200).json({ totalPayment });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  