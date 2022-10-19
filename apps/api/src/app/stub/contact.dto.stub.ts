import { CreateContactDto } from "../dto/create-contact.dto"

export const ContactDTOStub = (): CreateContactDto => {
  return {
    name: "jose",
    address: "Capotico",
    phone: "2125645",
    email: "test@example"
  };
};