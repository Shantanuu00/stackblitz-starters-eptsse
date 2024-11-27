const request=require("supertest");
const http=require("http");
const {app,getAllEmployees,getEmployeeById}=require("../index.js");
const { before, after, describe, beforeEach } = require("node:test");
jest.mock("../index.js",()=>{
  ...jest.requireActual("./controllers/index.js"),
  getAllEmployees:jest.fn(),
  getEmployeeById:jest:fn(),
});
let server;
beforeAll((done)=>{
  server=http.createServer(app);
  server.listen(3001,done);
});
afterAll((done)=>{
  server.close(done);
});

describe("/controller test function",()=>{
beforeEach(()=>{
  jest.clearAllMocks();
});
it("should return all the employees",()=>{
  let mockEmployees=[
    {
    employeeId: 1,
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    departmentId: 1,
    roleId: 1,
},
{
    employeeId: 2,
    name: 'Priya Singh',
    email: 'priya.singh@example.com',
    departmentId: 2,
    roleId: 2,
},
{
    employeeId: 3,
    name: 'Ankit Verma',
    email: 'ankit.verma@example.com',
    departmentId: 1,
    roleId: 3,
},
];
   getAllEmployees.mockReturnValue(mockEmployees);
   let result=getAllEmployees();
   expect(result).toEqual(mockEmployees);
   
});
it("should return employee by an id",()=>{
  let mockEmployee={ employeeId: 1,
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    departmentId: 1,
    roleId: 1};
  getEmployeeById.mockReturnValue(mockEmployee);
  let result=getEmployeeById(1);
  expect(result).toEqual(mockEmployee);
});

});

describe("api test cases",()=>{
  it("get /employees should get all employees",async()=>{
    let mockEmployees=[{
      employeeId: 1,
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      departmentId: 1,
      roleId: 1,
  },
  {
      employeeId: 2,
      name: 'Priya Singh',
      email: 'priya.singh@example.com',
      departmentId: 2,
      roleId: 2,
  },
  {
      employeeId: 3,
      name: 'Ankit Verma',
      email: 'ankit.verma@example.com',
      departmentId: 1,
      roleId: 3,
  }];
    getAllEmployees.mockResolvedValue(mockEmployees);
    let response=await request(server).get("/employees");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(mockEmployees);
  });
  it("get /employees should get all employee by an id",async()=>{
    let mockEmployee=[ employeeId: 1,
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      departmentId: 1,
      roleId: 1,];
    getEmployeeById.mockResolvedValue(mockEmployee);
    let response=await request(server).get("/employees/details/1");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(mockEmployee);

  });
});




