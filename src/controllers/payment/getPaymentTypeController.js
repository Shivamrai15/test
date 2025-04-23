import { PAYMENTTYPE } from '@prisma/client';

export const getPaymentTypeController = async (req, res) => {
  try {
    const paymentTypes = Object.values(PAYMENTTYPE);

    return res.status(200).json({
      success: true,
      message: 'Payment types fetched successfully',
      data: paymentTypes
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error. ${error?.message}`,
      data: {}
    });
  }
};
