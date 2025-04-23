# API Documentation

## Base URL

```
http://localhost:3000/api/v1
```

## Employee Endpoints

### 1. Add Employee

This API endpoint adds a new employee to the system with their personal details, compensation information, important dates, and payment events. It's required for employee onboarding and management.

**Endpoint:** `POST /employee`

**Request Body:**

```typescript
{
  employeeId: string;  // min: 3, max: 10
  name: string;  // min: 1, max: 50
  email: string;  // email format
  dob: Date;
  joiningDate: Date;
  baseSalary: number;  // min: 0
  variablePay: number;  // min: 0
  anniversaryDate?: Date;  // optional
  address: {
    streetAddress: string;  // min: 1, max: 50
    city: string;  // min: 1, max: 50
    state: string;  // min: 1, max: 50
    country: string;  // min: 1, max: 50
    pincode: string;  // min: 1, max: 50
  };
  paymentEvents: Array<{
    occasion: string;  // min: 1, max: 50
    paymentType: "INSURANCE" | "ANNIVERSARY" | "BIRTHDAY" | "DIWALI";
    amount: number;  // min: 0
    reminderDate: Date;
    eventDate: Date;
  }>;
  spouse?: {  // optional
    name: string;  // min: 1, max: 50
    dob: Date;
  };
  kids: Array<{
    name: string;  // min: 1, max: 50
    dob: Date;
  }>,
}
```

**Response:**

```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "id": "67ea328853719db6767ae5fe",
    "employeeId": "EMP1002",
    "name": "Sarah Miller",
    "email": "sarah.miller@example.com",
    "baseSalary": 70000,
    "variablePay": 12000,
    "dob": "1985-09-14T00:00:00.000Z",
    "joiningDate": "2015-03-10T00:00:00.000Z",
    "anniversaryDate": "2015-03-10T00:00:00.000Z",
    "isActive": true,
    "createdBy": "Maninder Singh",
    "updatedBy": "Maninder Singh",
    "createdAt": "2025-03-31T06:13:25.138Z",
    "updatedAt": "2025-03-31T06:13:25.138Z"
  }
}
```

### 2. Get Employee

This API endpoint retrieves detailed information about a specific employee by their ID, including personal details, compensation, payment events, family information, and address. It can filter events by financial year. It's required for viewing and managing employee records.

**Endpoint:** `GET /employee/:id`

**Example:**

```
/employee/6603df123e49c78b9a42e124?year=2024
```

**Query Parameters:**

- `year`: Financial Year (optional)

**Response**

```json
{
  "success": true,
  "message": "Employee found successfully",
  "data": {
    "employee": {
      "id": "67ea328853719db6767ae5fe",
      "employeeId": "EMP1002",
      "name": "Sarah Miller",
      "email": "sarah.miller@example.com",
      "baseSalary": 70000,
      "variablePay": 12000,
      "dob": "1985-09-14T00:00:00.000Z",
      "joiningDate": "2015-03-10T00:00:00.000Z",
      "anniversaryDate": "2015-03-10T00:00:00.000Z",
      "isActive": true,
      "createdBy": "Maninder Singh",
      "updatedBy": "Maninder Singh",
      "createdAt": "2025-03-31T06:13:25.138Z",
      "updatedAt": "2025-03-31T06:13:25.138Z",
      "paymentEvents": [
        {
          "id": "67ea328853719db6767ae60d",
          "occasion": "Salary",
          "paymentType": "SALARY",
          "reminderDate": "2025-11-26T18:30:00.000Z",
          "eventDate": "2025-11-30T18:30:00.000Z",
          "paymentDate": null,
          "paymentConfirmed": null,
          "amount": 70000,
          "employeeId": "67ea328853719db6767ae5fe",
          "isActive": true,
          "createdBy": "Maninder Singh",
          "updatedBy": "Maninder Singh",
          "createdAt": "2025-03-31T06:13:28.698Z",
          "updatedAt": "2025-03-31T06:13:28.698Z"
        },
        {
          "id": "67ea328853719db6767ae60c",
          "occasion": "Salary",
          "paymentType": "SALARY",
          "reminderDate": "2025-10-27T18:30:00.000Z",
          "eventDate": "2025-10-31T18:30:00.000Z",
          "paymentDate": null,
          "paymentConfirmed": null,
          "amount": 70000,
          "employeeId": "67ea328853719db6767ae5fe",
          "isActive": true,
          "createdBy": "Maninder Singh",
          "updatedBy": "Maninder Singh",
          "createdAt": "2025-03-31T06:13:28.698Z",
          "updatedAt": "2025-03-31T06:13:28.698Z"
        },
        {
          "id": "67ea328853719db6767ae60b",
          "occasion": "Salary",
          "paymentType": "SALARY",
          "reminderDate": "2025-09-26T18:30:00.000Z",
          "eventDate": "2025-09-30T18:30:00.000Z",
          "paymentDate": null,
          "paymentConfirmed": null,
          "amount": 70000,
          "employeeId": "67ea328853719db6767ae5fe",
          "isActive": true,
          "createdBy": "Maninder Singh",
          "updatedBy": "Maninder Singh",
          "createdAt": "2025-03-31T06:13:28.698Z",
          "updatedAt": "2025-03-31T06:13:28.698Z"
        },
        {
          "id": "67ea328853719db6767ae600",
          "occasion": "40th Birthday Bonus",
          "paymentType": "BIRTHDAY",
          "reminderDate": "2025-09-10T00:00:00.000Z",
          "eventDate": "2025-09-14T00:00:00.000Z",
          "paymentDate": null,
          "paymentConfirmed": null,
          "amount": 400,
          "employeeId": "67ea328853719db6767ae5fe",
          "isActive": true,
          "createdBy": "Maninder Singh",
          "updatedBy": "Maninder Singh",
          "createdAt": "2025-03-31T06:13:25.138Z",
          "updatedAt": "2025-03-31T06:13:25.138Z"
        },
        {
          "id": "67ea328853719db6767ae60a",
          "occasion": "Salary",
          "paymentType": "SALARY",
          "reminderDate": "2025-08-27T18:30:00.000Z",
          "eventDate": "2025-08-31T18:30:00.000Z",
          "paymentDate": null,
          "paymentConfirmed": null,
          "amount": 70000,
          "employeeId": "67ea328853719db6767ae5fe",
          "isActive": true,
          "createdBy": "Maninder Singh",
          "updatedBy": "Maninder Singh",
          "createdAt": "2025-03-31T06:13:28.698Z",
          "updatedAt": "2025-03-31T06:13:28.698Z"
        },
        {
          "id": "67ea328853719db6767ae609",
          "occasion": "Salary",
          "paymentType": "SALARY",
          "reminderDate": "2025-07-27T18:30:00.000Z",
          "eventDate": "2025-07-31T18:30:00.000Z",
          "paymentDate": null,
          "paymentConfirmed": null,
          "amount": 70000,
          "employeeId": "67ea328853719db6767ae5fe",
          "isActive": true,
          "createdBy": "Maninder Singh",
          "updatedBy": "Maninder Singh",
          "createdAt": "2025-03-31T06:13:28.698Z",
          "updatedAt": "2025-03-31T06:13:28.698Z"
        },
        {
          "id": "67ea328853719db6767ae608",
          "occasion": "Salary",
          "paymentType": "SALARY",
          "reminderDate": "2025-06-26T18:30:00.000Z",
          "eventDate": "2025-06-30T18:30:00.000Z",
          "paymentDate": null,
          "paymentConfirmed": null,
          "amount": 70000,
          "employeeId": "67ea328853719db6767ae5fe",
          "isActive": true,
          "createdBy": "Maninder Singh",
          "updatedBy": "Maninder Singh",
          "createdAt": "2025-03-31T06:13:28.698Z",
          "updatedAt": "2025-03-31T06:13:28.698Z"
        },
        {
          "id": "67ea328853719db6767ae607",
          "occasion": "Salary",
          "paymentType": "SALARY",
          "reminderDate": "2025-05-27T18:30:00.000Z",
          "eventDate": "2025-05-31T18:30:00.000Z",
          "paymentDate": null,
          "paymentConfirmed": null,
          "amount": 70000,
          "employeeId": "67ea328853719db6767ae5fe",
          "isActive": true,
          "createdBy": "Maninder Singh",
          "updatedBy": "Maninder Singh",
          "createdAt": "2025-03-31T06:13:28.698Z",
          "updatedAt": "2025-03-31T06:13:28.698Z"
        },
        {
          "id": "67ea328853719db6767ae606",
          "occasion": "Salary",
          "paymentType": "SALARY",
          "reminderDate": "2025-04-26T18:30:00.000Z",
          "eventDate": "2025-04-30T18:30:00.000Z",
          "paymentDate": null,
          "paymentConfirmed": null,
          "amount": 70000,
          "employeeId": "67ea328853719db6767ae5fe",
          "isActive": true,
          "createdBy": "Maninder Singh",
          "updatedBy": "Maninder Singh",
          "createdAt": "2025-03-31T06:13:28.698Z",
          "updatedAt": "2025-03-31T06:13:28.698Z"
        },
        {
          "id": "67ea328853719db6767ae605",
          "occasion": "Salary",
          "paymentType": "SALARY",
          "reminderDate": "2025-03-27T18:30:00.000Z",
          "eventDate": "2025-03-31T18:30:00.000Z",
          "paymentDate": null,
          "paymentConfirmed": null,
          "amount": 70000,
          "employeeId": "67ea328853719db6767ae5fe",
          "isActive": true,
          "createdBy": "Maninder Singh",
          "updatedBy": "Maninder Singh",
          "createdAt": "2025-03-31T06:13:28.698Z",
          "updatedAt": "2025-03-31T06:13:28.698Z"
        }
      ],
      "kids": [
        {
          "id": "67ea328853719db6767ae603",
          "name": "Ethan Miller",
          "dob": "2016-07-22T00:00:00.000Z",
          "employeeId": "67ea328853719db6767ae5fe",
          "createdBy": "Maninder Singh",
          "updatedBy": "Maninder Singh",
          "createdAt": "2025-03-31T06:13:25.138Z",
          "updatedAt": "2025-03-31T06:13:25.138Z"
        },
        {
          "id": "67ea328853719db6767ae604",
          "name": "Olivia Miller",
          "dob": "2019-02-14T00:00:00.000Z",
          "employeeId": "67ea328853719db6767ae5fe",
          "createdBy": "Maninder Singh",
          "updatedBy": "Maninder Singh",
          "createdAt": "2025-03-31T06:13:25.138Z",
          "updatedAt": "2025-03-31T06:13:25.138Z"
        }
      ],
      "spouse": {
        "id": "67ea328853719db6767ae602",
        "name": "David Miller",
        "dob": "1987-11-05T00:00:00.000Z",
        "employeeId": "67ea328853719db6767ae5fe",
        "createdBy": "Maninder Singh",
        "updatedBy": "Maninder Singh",
        "createdAt": "2025-03-31T06:13:25.138Z",
        "updatedAt": "2025-03-31T06:13:25.138Z"
      },
      "address": {
        "id": "67ea328853719db6767ae5ff",
        "streetAddress": "789 Cedar Lane",
        "city": "Toronto",
        "state": "Ontario",
        "country": "Canada",
        "pincode": "M5V 2T6",
        "isActive": true,
        "employeeId": "67ea328853719db6767ae5fe",
        "createdBy": "Maninder Singh",
        "updatedBy": "Maninder Singh",
        "createdAt": "2025-03-31T06:13:25.138Z",
        "updatedAt": "2025-03-31T06:13:25.138Z"
      }
    },
    "financialYears": [2023, 2024, 2025]
  }
}
```

### 3. Delete Employee

This API endpoint deactivates an employee record by their ID rather than permanently deleting it. It sets the "isActive" flag to false while preserving the employee data. It's required for employee offboarding while maintaining historical records.

**Endpoint:** `DELETE /employee/:id`

**Example:**

```
/employee/6603df123e49c78b9a42e124
```

**Response**

```json
{
  "success": true,
  "message": "Employee disabled successfully",
  "data": {
    "id": "67ea328853719db6767ae5fe",
    "employeeId": "EMP1002",
    "name": "Sarah Miller",
    "email": "sarah.miller@example.com",
    "baseSalary": 70000,
    "variablePay": 12000,
    "dob": "1985-09-14T00:00:00.000Z",
    "joiningDate": "2015-03-10T00:00:00.000Z",
    "anniversaryDate": "2015-03-10T00:00:00.000Z",
    "isActive": false,
    "createdBy": "Maninder Singh",
    "updatedBy": "Maninder Singh",
    "createdAt": "2025-03-31T06:13:25.138Z",
    "updatedAt": "2025-03-31T06:25:53.354Z"
  }
}
```

### 4. Update Employee

This API endpoint updates an employee's record with modified information. It accepts various employee details including personal information, compensation, and family data. It also updates the birthday event and anniversary event if they exists.

**Endpoint:** `PATCH /employee/:id`

**Example:**

```
/employee/67e14b93d7a73e802b1fc058
```

**Request Body:**

```typescript
{
  employeeId: string;  // min: 3, max: 10
  name: string;  // min: 1, max: 50
  email: string;  // email format
  dob: Date;
  joiningDate: Date;
  baseSalary: number;  // min: 0
  variablePay: number;  // min: 0
  anniversaryDate?: Date;  // optional
  address: {
    streetAddress: string;  // min: 1, max: 50
    city: string;  // min: 1, max: 50
    state: string;  // min: 1, max: 50
    country: string;  // min: 1, max: 50
    pincode: string;  // min: 1, max: 50
  };
  spouse?: {  // optional
    name: string;  // min: 1, max: 50
    dob: Date;
  };
  kids: Array<{
    id?: string;  // min: 24, max: 24, optional
    name: string;  // min: 1, max: 50
    dob: Date;
  }>;
}
```

**Response**

```json
{
  "success": true,
  "message": "Employee updated successfully",
  "data": {
    "id": "67e14b93d7a73e802b1fc058",
    "employeeId": "EMP1001",
    "name": "Alex Turner",
    "email": "alex.turner@example.com",
    "baseSalary": 60000,
    "variablePay": 8000,
    "dob": "1992-08-25T00:00:00.000Z",
    "joiningDate": "2020-06-15T00:00:00.000Z",
    "anniversaryDate": null,
    "isActive": true,
    "createdBy": "Maninder Singh",
    "updatedBy": "Maninder Singh",
    "createdAt": "2025-03-24T12:09:55.102Z",
    "updatedAt": "2025-03-31T06:30:26.840Z"
  }
}
```

### 5. Get All Employees

This API endpoint retrieves a paginated list of all employees with basic information. It supports pagination, limit controls, and sorting options. It's required for displaying employee directories, generating reports, and managing the workforce at scale.

**Endpoint:** `GET /employee/getAllEmployees`

**Query Parameters:**

- `page`: Number (optional)
- `limit`: Number (optional)
- `order`: `asc|desc` (optional)

**Example:**

```
/employee/getAllEmployees?page=1&limit=10&order=desc
```

**Response**

```json
{
  "success": true,
  "message": "Employees found successfully",
  "data": {
    "employees": [
      {
        "id": "67def438619d8d756be6d996",
        "employeeId": "EMP55667",
        "name": "Aarav Sharma",
        "email": "aarav.sharma@example.com",
        "baseSalary": 80000,
        "variablePay": 18000,
        "dob": "1991-09-10T00:00:00.000Z",
        "joiningDate": "2017-04-12T00:00:00.000Z",
        "anniversaryDate": null,
        "isActive": true,
        "createdBy": "Maninder Singh",
        "updatedBy": "Maninder Singh",
        "createdAt": "2025-03-22T17:32:40.828Z",
        "updatedAt": "2025-03-22T17:32:40.828Z"
      },
      {
        "id": "67def4ba619d8d756be6d9e6",
        "employeeId": "EMP20004",
        "name": "Akira Tanaka",
        "email": "akira.t@example.com",
        "baseSalary": 68000,
        "variablePay": 9000,
        "dob": "1993-04-03T00:00:00.000Z",
        "joiningDate": "2019-11-01T00:00:00.000Z",
        "anniversaryDate": null,
        "isActive": true,
        "createdBy": "Maninder Singh",
        "updatedBy": "Maninder Singh",
        "createdAt": "2025-03-22T17:34:50.502Z",
        "updatedAt": "2025-03-22T17:34:50.502Z"
      },
      {
        "id": "67e14b93d7a73e802b1fc058",
        "employeeId": "EMP1001",
        "name": "Alex Turner",
        "email": "alex.turner@example.com",
        "baseSalary": 60000,
        "variablePay": 8000,
        "dob": "1992-08-25T00:00:00.000Z",
        "joiningDate": "2020-06-15T00:00:00.000Z",
        "anniversaryDate": null,
        "isActive": true,
        "createdBy": "Maninder Singh",
        "updatedBy": "Maninder Singh",
        "createdAt": "2025-03-24T12:09:55.102Z",
        "updatedAt": "2025-03-31T06:30:26.840Z"
      },
      {
        "id": "67da700c14363257b71b99b8",
        "employeeId": "EMP04567",
        "name": "Alice Johnson",
        "email": "alice.johnson@example.com",
        "baseSalary": 75000,
        "variablePay": 15000,
        "dob": "1985-07-22T00:00:00.000Z",
        "joiningDate": "2018-03-15T00:00:00.000Z",
        "anniversaryDate": null,
        "isActive": true,
        "createdBy": "Maninder Singh",
        "updatedBy": "Maninder Singh",
        "createdAt": "2025-03-19T07:19:40.178Z",
        "updatedAt": "2025-03-19T07:19:40.178Z"
      },
      {
        "id": "67def4b0619d8d756be6d9d7",
        "employeeId": "EMP20003",
        "name": "Carlos Rodriguez",
        "email": "carlos.r@example.com",
        "baseSalary": 85000,
        "variablePay": 15000,
        "dob": "1987-06-15T00:00:00.000Z",
        "joiningDate": "2016-07-15T00:00:00.000Z",
        "anniversaryDate": null,
        "isActive": true,
        "createdBy": "Maninder Singh",
        "updatedBy": "Maninder Singh",
        "createdAt": "2025-03-22T17:34:40.626Z",
        "updatedAt": "2025-03-22T17:34:40.626Z"
      }
    ],
    "totalEmployees": 24,
    "page": 1,
    "limit": 5
  }
}
```
