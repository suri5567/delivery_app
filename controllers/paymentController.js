/**
 * @swagger
 * /drivers/calculate-payment:
 *   post:
 *     summary: Calculate payment for a driver based on completed orders, online hours, and distance traveled
 *     tags: [Drivers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ordersCompleted:
 *                 type: integer
 *                 description: The number of orders the driver has completed
 *                 example: 20
 *               hoursOnline:
 *                 type: integer
 *                 description: The number of hours the driver was online
 *                 example: 8
 *               distanceTraveled:
 *                 type: number
 *                 description: The distance (in kilometers) the driver traveled
 *                 example: 100.5
 *     responses:
 *       200:
 *         description: Calculated payment for the driver
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPayment:
 *                   type: number
 *                   description: Total calculated payment for the driver
 *                   example: 750.5
 *       400:
 *         description: Error in calculating driver payment
 */
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
