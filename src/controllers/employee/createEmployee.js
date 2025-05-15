import { db } from '../../db.js';
import { EmployeeSchema } from '../../schemas/employee.schema.js';

export const createEmployee = async (req, res) => {
  try {
    const body = req.body;
    const validatedData = await EmployeeSchema.safeParseAsync(body);
    if (!validatedData.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee data',
        data: {}
      });
    }

    const data = validatedData.data;

    const employeeVariablePay = data.variablePay;
    const variablePaySum = data.paymentEvents.reduce((curr, index) => {
      return curr + index.amount;
    }, 0);

    if (employeeVariablePay < variablePaySum) {
      return res.status(400).json({
        success: false,
        message: 'Variable pay is less than total payment events amount',
        data: {}
      });
    }

    const existingEmployeesCount = await db.employee.count();
    const employeeId = 1001 + existingEmployeesCount;

    const employee = await db.employee.create({
      data: {
        ...data,
        employeeId,
        dateOfBirth: new Date(data.dateOfBirth),
        joiningDate: new Date(data.joiningDate),
        anniversaryDate: data.anniversaryDate ? new Date(data.anniversaryDate) : null,
        address: {
          create: {
            ...data.address,
            createdBy: 'Maninder Singh',
            updatedBy: 'Maninder Singh'
          }
        },
        spouse: data.spouse
          ? {
              create: {
                ...data.spouse,
                dateOfBirth: new Date(data.spouse.dateOfBirth),
                createdBy: 'Maninder Singh',
                updatedBy: 'Maninder Singh'
              }
            }
          : undefined,
        kids: {
          create: data.kids.map((kid) => ({
            ...kid,
            dateOfBirth: new Date(kid.dateOfBirth),
            createdBy: 'Maninder Singh',
            updatedBy: 'Maninder Singh'
          }))
        },
        paymentEvents: {
          create: data.paymentEvents.map((event) => ({
            ...event,
            reminderDate: new Date(event.reminderDate),
            eventDate: new Date(event.eventDate),
            createdBy: 'Maninder Singh',
            updatedBy: 'Maninder Singh'
          }))
        },
        createdBy: 'Maninder Singh',
        updatedBy: 'Maninder Singh'
      }
    });

    const salaryEvents = [];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    for (let i = currentMonth + 1; i < 12; i++) {
      salaryEvents.push({
        occasion: 'Salary',
        paymentType: 'SALARY',
        amount: data.baseSalary,
        reminderDate: new Date(currentYear, i, -3),
        eventDate: new Date(currentYear, i, 1),
        employeeId: employee.id,
        createdBy: 'Maninder Singh',
        updatedBy: 'Maninder Singh'
      });
    }

    await db.paymentEvent.createMany({
      data: salaryEvents
    });

    return res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: employee
    });
  } catch (error) {
    console.error('POST EMPLOYEE API ERROR', error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error. ${error?.message}`,
      data: {}
    });
  }
};
