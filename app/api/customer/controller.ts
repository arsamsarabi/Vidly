import Customer, { ICustomer } from '#root/db/models/Customer'

const getAllCustomers = async () => await Customer.find().sort('createdAt')

const getCustomerById = async (id: string) => Customer.findById(id)

const createCustomer = async (customer: Partial<ICustomer>) => {
  const newCustomer = new Customer(customer)
  const result: ICustomer = await newCustomer.save()
  return result
}

const updateCustomer = async (id: string, customer: Partial<ICustomer>) => {
  const result = await Customer.findByIdAndUpdate(id, customer, { new: true })
  return result
}

const deleteCustomer = async (id: string) => {
  const result = await Customer.findByIdAndRemove(id)
  return result
}

export default {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
}
