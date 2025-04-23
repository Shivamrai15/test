import { db } from '../../db.js';
import { generateToken } from '../../lib/token.js';
import { sendEmail } from '../../lib/email.js';
import { getConfirmationTemplate } from '../../templates/confirmation-template.js';

export const updatePaymentController = async (req, res) => {
  try {
    const { id } = req.params;
    const paymentEvent = await db.paymentEvent.findUnique({
      where: {
        id,
        isActive: true
      },
      select: {
        id: true,
        isActive: true,
        paymentDate: true,
        employee: {
          select: {
            id: true,
            email: true
          }
        }
      }
    });

    if (!paymentEvent) {
      return res.status(404).json({
        status: false,
        message: 'Payment event not found',
        data: {}
      });
    }

    if (paymentEvent.paymentDate) {
      return res.status(400).json({
        status: false,
        message: 'Payment already confirmed',
        data: {}
      });
    }

    const updatedPaymentEvent = await db.paymentEvent.update({
      where: {
        id: paymentEvent.id
      },
      data: {
        paymentDate: new Date()
      }
    });

    if (!updatedPaymentEvent) {
      return res.status(500).json({
        status: false,
        message: 'Error while updating payment event',
        data: {}
      });
    }

    const token = generateToken({
      eventId: updatedPaymentEvent.id,
      employeeId: paymentEvent.employee.id,
      employeeEmail: paymentEvent.employee.email
    });

    const paymentConfirmationLink = `${process.env.ORIGIN}/api/v1/payment/confirmPayment?token=${token}`;
    await sendEmail({
      to: paymentEvent.employee.email,
      subject: 'Payment Confirmation',
      message: getConfirmationTemplate(paymentConfirmationLink)
    });

    return res.status(200).json({
      status: true,
      message: 'Payment event updated successfully',
      data: updatedPaymentEvent
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error. ${error?.message}`,
      data: {}
    });
  }
};
