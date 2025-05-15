import { UpdateEmployeeSchema } from '../../schemas/employee.schema.js';
import { db } from '../../db.js';

export const updateEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const validatedData = await UpdateEmployeeSchema.safeParseAsync(body);

    if (!validatedData.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee data',
        data: {}
      });
    }

    const employee = await db.employee.findUnique({
      where: {
        id
      }
    });

    if (!employee || !employee.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
        data: {}
      });
    }

    const data = validatedData.data;

    const updatedEmployee = await db.employee.update({
      where: {
        id
      },
      data: {
        ...data,
        dateOfBirth: new Date(data.dateOfBirth),
        joiningDate: new Date(data.joiningDate),
        anniversaryDate: data.anniversaryDate ? new Date(data.anniversaryDate) : undefined,
        spouse: data.spouse
          ? {
              upsert: {
                create: {
                  ...data.spouse,
                  dateOfBirth: new Date(data.spouse.dateOfBirth),
                  updatedBy: 'Maninder Singh',
                  createdBy: 'Maninder Singh'
                },
                update: {
                  ...data.spouse,
                  dateOfBirth: new Date(data.spouse.dateOfBirth),
                  updatedBy: 'Maninder Singh'
                }
              }
            }
          : undefined,
        address: {
          update: {
            ...data.address,
            updatedBy: 'Maninder Singh'
          }
        },
        kids: {
          deleteMany: [
            {
              employeeId: employee.id
            }
          ],
          createMany: {
            data: data.kids.map((kid) => ({
              ...kid,
              dateOfBirth: new Date(kid.dateOfBirth),
              updatedBy: 'Maninder Singh',
              createdBy: 'Maninder Singh'
            }))
          }
        }
      }
    });

    if (!updatedEmployee) {
      return res.status(500).json({
        success: false,
        message: 'Employee not updated',
        data: {}
      });
    }

    const paymentEvents = await db.paymentEvent.findMany({
      where: {
        AND: [
          { employeeId: employee.id },
          {
            paymentType: {
              in: ['ANNIVERSARY', 'BIRTHDAY']
            }
          }
        ]
      },
      select: {
        id: true,
        paymentType: true,
        eventDate: true,
        reminderDate: true
      }
    });

    if (paymentEvents.length > 0) {
      const paymentEventsData = paymentEvents.map((event) => {
        const date = event.paymentType === 'BIRTHDAY' ? new Date(data.dateOfBirth) : new Date(data.anniversaryDate);
        const eventDate = new Date(date.setFullYear(new Date().getFullYear()));
        const reminderDate = new Date(eventDate - 3);

        return {
          ...event,
          eventDate,
          reminderDate,
          updatedBy: 'Maninder Singh'
        };
      });

      await Promise.all(
        paymentEventsData.map((event) =>
          db.paymentEvent.update({
            where: { id: event.id },
            data: {
              eventDate: event.eventDate,
              reminderDate: event.reminderDate,
              updatedBy: event.updatedBy
            }
          })
        )
      );
    }

    return res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data: updatedEmployee
    });
  } catch (error) {
    console.error('UPDATE EMPLOYEE BY ID API ERROR: ', error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error. ${error?.message}`,
      data: {}
    });
  }
};
